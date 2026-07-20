export interface PayrollCalculationInput {
  basicSalary: number
  hra: number
  specialAllowance: number
  otherAllowances: number
  isPfApplicable?: boolean
  isEsiApplicable?: boolean
  customPfRate?: number
  state?: string
}

export interface StatutoryPayrollBreakdown {
  grossSalary: number
  epfWage: number
  employeePf: number
  employerEps: number
  employerEpf: number
  totalEmployerPf: number
  esiWage: number
  employeeEsi: number
  employerEsi: number
  professionalTax: number
  tdsEstimate: number
  totalDeductions: number
  netSalary: number
}

const STATUTORY_EPF_BASIC_CAP = 15000 // Statutory EPF basic ceiling per month (INR 15,000)
const STATUTORY_ESI_GROSS_CAP = 21000 // Statutory ESI gross wage limit per month (INR 21,000)

/**
 * Calculates Indian Statutory Payroll breakdown complying with EPF Act 1952 & ESI Act 1948
 */
export function calculateIndianPayroll(input: PayrollCalculationInput): StatutoryPayrollBreakdown {
  const {
    basicSalary,
    hra,
    specialAllowance,
    otherAllowances,
    isPfApplicable = true,
    isEsiApplicable = true,
    customPfRate = 12,
  } = input

  const grossSalary = basicSalary + hra + specialAllowance + otherAllowances

  // 1. Employee Provident Fund (EPF)
  let epfWage = 0
  let employeePf = 0
  let employerEps = 0
  let employerEpf = 0
  let totalEmployerPf = 0

  if (isPfApplicable && basicSalary > 0) {
    // Statutorily capped at ₹15,000/month basic wage unless voluntary higher contribution selected
    epfWage = Math.min(basicSalary, STATUTORY_EPF_BASIC_CAP)
    const pfRateDecimal = customPfRate / 100

    employeePf = Math.round(epfWage * pfRateDecimal)
    // EPS contribution is 8.33% capped at ₹1,250/mo (8.33% of 15,000)
    employerEps = Math.round(Math.min(epfWage * 0.0833, 1250))
    employerEpf = employeePf - employerEps
    totalEmployerPf = employerEps + employerEpf
  }

  // 2. Employee State Insurance (ESI)
  let esiWage = 0
  let employeeEsi = 0
  let employerEsi = 0

  if (isEsiApplicable && grossSalary <= STATUTORY_ESI_GROSS_CAP) {
    esiWage = grossSalary
    employeeEsi = Math.ceil(esiWage * 0.0075) // 0.75% employee contribution
    employerEsi = Math.ceil(esiWage * 0.0325) // 3.25% employer contribution
  }

  // 3. Professional Tax (PT)
  let professionalTax = 0
  if (grossSalary >= 20000) {
    professionalTax = 200
  } else if (grossSalary >= 15000) {
    professionalTax = 150
  }

  // 4. Income Tax (TDS) Estimate (New Tax Regime basic calculation)
  const annualGross = grossSalary * 12
  const standardDeduction = 75000
  const taxableIncome = Math.max(0, annualGross - standardDeduction)

  let annualTds = 0
  if (taxableIncome > 1200000) {
    annualTds = (taxableIncome - 1200000) * 0.20 + 90000
  } else if (taxableIncome > 700000) {
    annualTds = (taxableIncome - 700000) * 0.10 + 20000
  } else if (taxableIncome > 400000) {
    annualTds = (taxableIncome - 400000) * 0.05
  }

  const tdsEstimate = Math.round(annualTds / 12)
  const totalDeductions = employeePf + employeeEsi + professionalTax + tdsEstimate
  const netSalary = Math.max(0, grossSalary - totalDeductions)

  return {
    grossSalary,
    epfWage,
    employeePf,
    employerEps,
    employerEpf,
    totalEmployerPf,
    esiWage,
    employeeEsi,
    employerEsi,
    professionalTax,
    tdsEstimate,
    totalDeductions,
    netSalary,
  }
}
