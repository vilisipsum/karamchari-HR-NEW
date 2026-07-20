import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const lowerMessage = message.toLowerCase();
    let fullResponse = '';
    
    if (lowerMessage.includes('leave') || lowerMessage.includes('vacation')) {
      fullResponse = "Hello! I am Gemini, your Google-powered HR assistant. Under company guidelines, employees are allocated 12 Casual Leaves (CL), 10 Sick Leaves (SL), and 18 Earned Leaves (EL) annually. Working days are auto-calculated excluding Saturdays, Sundays, and regional Indian holidays. Let me know if you would like me to draft a leave request format for you!";
    } else if (lowerMessage.includes('payroll') || lowerMessage.includes('salary') || lowerMessage.includes('pf') || lowerMessage.includes('esi')) {
      fullResponse = "I can assist you with that! Payroll processing on KaramcharHR adheres strictly to Indian statutory standards. Employee Provident Fund (EPF) is deducted at 12% of the Basic Salary. ESIC is set at 0.75% of Gross Salary for eligible bands. You can calculate or run payroll instantly via the Payroll Desk panel. Is there a specific deduction query I can help resolve?";
    } else if (lowerMessage.includes('gmb') || lowerMessage.includes('google') || lowerMessage.includes('business')) {
      fullResponse = "The Google Business Profile integration is active. It enables you to pull ratings and customer reviews, reply to Google Business inquiries, and post announcements directly from Settings -> Third Party APIs. Would you like me to draft an announcement post?";
    } else {
      fullResponse = `Greetings from Gemini! I'm your Google-powered workspace assistant here to coordinate your KaramcharHR tasks. I can explain EPF/ESI tax formulas, check pending leaves, track GMB customer reviews, or summarize recruitment metrics. What would you like to explore next?`;
    }

    // Streaming text encoder
    const encoder = new TextEncoder();
    const words = fullResponse.split(' ');

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const chunk = encoder.encode(words[i] + ' ');
          controller.enqueue(chunk);
          // 40ms per word typing delay simulation
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Gemini processing failed' }, { status: 500 });
  }
}
