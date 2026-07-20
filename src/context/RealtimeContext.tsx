'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface AlertMessage {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
}

interface RealtimeContextType {
  alerts: AlertMessage[];
  addAlert: (alert: Omit<AlertMessage, 'id' | 'timestamp'>) => void;
  clearAlerts: () => void;
  presenceList: Record<string, 'present' | 'absent' | 'late' | 'on_leave'>;
  perspective: 'admin' | 'payroll' | 'employee';
  setPerspective: (perspective: 'admin' | 'payroll' | 'employee') => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [presenceList, setPresenceList] = useState<Record<string, 'present' | 'absent' | 'late' | 'on_leave'>>({});
  const [perspective, setPerspective] = useState<'admin' | 'payroll' | 'employee'>('admin');

  const addAlert = (newAlert: Omit<AlertMessage, 'id' | 'timestamp'>) => {
    const alertWithMeta: AlertMessage = {
      ...newAlert,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };
    setAlerts((prev) => [alertWithMeta, ...prev].slice(0, 20)); // Keep latest 20 alerts
  };

  const clearAlerts = () => setAlerts([]);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase URL or Key missing. Running RealtimeProvider in local demo/mock mode.');
      
      // Seed initial mock presence
      setPresenceList({
        'EMP-001': 'present',
        'EMP-002': 'on_leave',
        'EMP-003': 'present',
        'EMP-004': 'absent',
      });

      // Periodically trigger mock real-time events to showcase UI responsiveness
      const interval = setInterval(() => {
        const mockEvents = [
          {
            type: 'info' as const,
            title: 'Attendance Sync',
            message: 'Rohan Sharma clocked in via mobile app (Geo-verified: Delhi Head Office).',
            empCode: 'EMP-001',
            status: 'present' as const
          },
          {
            type: 'success' as const,
            title: 'Leave Approved',
            message: 'Anjali Gupta\'s Maternity Leave has been approved by HR.',
            empCode: 'EMP-002',
            status: 'on_leave' as const
          },
          {
            type: 'warning' as const,
            title: 'Late Clock-in',
            message: 'Amit Patel clocked in 15 minutes late.',
            empCode: 'EMP-003',
            status: 'late' as const
          },
          {
            type: 'info' as const,
            title: 'Expense Claim Filed',
            message: 'Vikram Singh submitted an travel claim of ₹2,450 for client visit.',
            empCode: 'EMP-004',
            status: 'present' as const
          }
        ];

        const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
        
        // Add live alert
        addAlert({
          type: randomEvent.type,
          title: randomEvent.title,
          message: randomEvent.message,
        });

        // Update presence map
        setPresenceList(prev => ({
          ...prev,
          [randomEvent.empCode]: randomEvent.status
        }));
      }, 15000); // Trigger mock event every 15 seconds

      return () => clearInterval(interval);
    }

    // Initialize real Supabase client subscription
    const supabase = createClient();

    // Subscribe to attendance real-time updates
    const attendanceChannel = supabase
      .channel('attendance-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'attendance' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newRecord = payload.new;
            addAlert({
              type: 'info',
              title: 'Clock In Alert',
              message: `Employee ${newRecord.employee_id} clocked in at ${new Date(newRecord.clock_in).toLocaleTimeString()}`,
            });
            setPresenceList(prev => ({
              ...prev,
              [newRecord.employee_id]: newRecord.status
            }));
          } else if (payload.eventType === 'UPDATE') {
            const updatedRecord = payload.new;
            if (updatedRecord.clock_out) {
              addAlert({
                type: 'info',
                title: 'Clock Out Alert',
                message: `Employee ${updatedRecord.employee_id} clocked out.`,
              });
              setPresenceList(prev => ({
                ...prev,
                [updatedRecord.employee_id]: 'absent'
              }));
            }
          }
        }
      )
      .subscribe();

    // Subscribe to leave request modifications
    const leaveChannel = supabase
      .channel('leave-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leave_requests' },
        (payload) => {
          addAlert({
            type: 'info',
            title: 'New Leave Request',
            message: `A new leave request has been submitted for approval.`,
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'leave_requests' },
        (payload) => {
          const updated = payload.new;
          addAlert({
            type: updated.status === 'approved' ? 'success' : 'warning',
            title: `Leave ${updated.status.toUpperCase()}`,
            message: `Leave request has been ${updated.status}.`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(attendanceChannel);
      supabase.removeChannel(leaveChannel);
    };
  }, []);

  return (
    <RealtimeContext.Provider value={{ alerts, addAlert, clearAlerts, presenceList, perspective, setPerspective }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};
