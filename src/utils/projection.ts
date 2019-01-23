import { Finance } from "financejs";

import { IFormValues } from "types/form-values";

const MONTHS_PER_YEAR: number = 12;

export interface IProjectionMetrics {
  propertyValue: number;
  monthlyPayment: number;
  monthlyInterestPayment: number;
  monthlyPrincipalPayment: number;
  annualDepreciationTaxSavings: number;
  compoundDepreciationTaxSavings: number;
  equityBanked: number;
  initInvestment: number;
  vrRatio: number;
  annualOperatingIncome: number;
  compoundOperatingIncome: number;
  annualCashOnCashRoi: number;
  annualCashFlow: number;
  compoundCashFlow: number;
  totalEarned: number;
  totalRoi: number;
  annualCapRate: number;
}

export interface ILoanMetrics {
  equityBanked: number;
  monthlyInterestPayment: number;
  monthlyPrincipalPayment: number;
}

export const getProjectionMetrics = (
  formValues: IFormValues,
  year: number
): IProjectionMetrics => {
  const {
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    interestRate,
    landValue,
    maintenanceRate,
    monthlyRentalIncome,
    percentDown,
    propertyManagementRate,
    propertyTaxRate,
    totalYears
  } = formValues;

  const {
    equityBanked,
    monthlyInterestPayment,
    monthlyPrincipalPayment
  } = getLoanMetricsByYearsHeld(
    initPropertyValue,
    percentDown,
    totalYears,
    interestRate,
    year
  );

  return {
    annualCapRate: getAnnualCapRate(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      maintenanceRate,
      monthlyRentalIncome,
      propertyManagementRate,
      propertyTaxRate,
      year
    ),
    annualCashFlow: getAnnualCashFlow(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    annualCashOnCashRoi: getAnnualCashOnCashRoi(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    annualDepreciationTaxSavings: getDepreciationTaxSavingsAnnual(
      initPropertyValue,
      landValue
    ),
    annualOperatingIncome: getAnnualOperatingIncomeForYear(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      maintenanceRate,
      monthlyRentalIncome,
      propertyManagementRate,
      propertyTaxRate,
      year
    ),
    compoundCashFlow: getCompoundCashFlow(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    compoundDepreciationTaxSavings: getDepreciationTaxSavingsCompound(
      initPropertyValue,
      landValue,
      year
    ),
    compoundOperatingIncome: getCompoundOperatingIncome(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      maintenanceRate,
      monthlyRentalIncome,
      propertyManagementRate,
      propertyTaxRate,
      year
    ),
    equityBanked,
    initInvestment: getInitInvestment(initPropertyValue, percentDown),
    monthlyInterestPayment,
    monthlyPayment: getMonthlyPayment(
      initPropertyValue,
      percentDown,
      totalYears,
      interestRate
    ),
    monthlyPrincipalPayment,
    propertyValue: getPropertyValueForYear(
      initPropertyValue,
      annualAppreciationRate,
      year
    ),
    totalEarned: getTotalEarned(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    totalRoi: getTotalRoi(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    vrRatio: getVrRatio(initPropertyValue, monthlyRentalIncome)
  };
};

export const getInitLoanPrincipal = (
  initPropertyValue: number,
  downPayment: number
) => initPropertyValue - downPayment;

export const getMonthlyPayment = (
  initPropertyValue: number,
  percentDown: number,
  totalYears: number,
  interestRate: number
) =>
  roundDecimal(
    calcMonthlyPayment(
      initPropertyValue,
      percentDown,
      totalYears,
      interestRate
    ),
    2
  );

const calcMonthlyPayment = (
  initPropertyValue: number,
  percentDown: number,
  totalYears: number,
  interestRate: number
) => {
  const initLoanPrincipal: number = getInitLoanPrincipal(
    initPropertyValue,
    calcDownPayment(initPropertyValue, percentDown)
  );
  const totalPayments: number = totalYears * MONTHS_PER_YEAR;
  return new Finance().AM(initLoanPrincipal, interestRate, totalPayments, 1);
};

const calcDownPayment = (initPropertyValue: number, percentDown: number) =>
  initPropertyValue * (percentDown / 100);

export const getLoanMetricsByYearsHeld = (
  initPropertyValue: number,
  percentDown: number,
  totalYears: number,
  interestRate: number,
  year: number
): ILoanMetrics => {
  const downPayment: number = calcDownPayment(initPropertyValue, percentDown);
  const monthlyPayment = calcMonthlyPayment(
    initPropertyValue,
    percentDown,
    totalYears,
    interestRate
  );
  const monthlyInterestRate: number = interestRate / MONTHS_PER_YEAR;
  const monthlyInterestDecimal: number = monthlyInterestRate / 100;
  const totalMonths: number = year * MONTHS_PER_YEAR;
  let loanPrincipal: number = getInitLoanPrincipal(
    initPropertyValue,
    calcDownPayment(initPropertyValue, percentDown)
  );
  let monthlyInterestPayment: number = monthlyInterestDecimal * loanPrincipal;
  let monthlyPrincipalPayment: number = monthlyPayment - monthlyInterestPayment;
  let equityBanked: number = downPayment;

  for (let i: number = 0; i < totalMonths; i++) {
    loanPrincipal -= monthlyPrincipalPayment;
    equityBanked += monthlyPrincipalPayment;
    monthlyInterestPayment = monthlyInterestDecimal * loanPrincipal;
    monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;
  }

  return {
    equityBanked: roundDecimal(equityBanked, 2),
    monthlyInterestPayment: roundDecimal(monthlyInterestPayment, 2),
    monthlyPrincipalPayment: roundDecimal(monthlyPrincipalPayment, 2)
  };
};

const roundDecimal = (num: number, digits: number): number => {
  const multiplier: number = Math.pow(10, digits);
  num = parseFloat((num * multiplier).toFixed(11));
  const tempNum: number = Math.round(num) / multiplier;
  return +tempNum.toFixed(digits);
};

export const getDepreciationTaxSavingsAnnual = (
  initPropertyValue: number,
  landValue: number
) =>
  roundDecimal(
    calcAnnualDepreciationTaxSavings(initPropertyValue, landValue),
    2
  );

export const getDepreciationTaxSavingsCompound = (
  initPropertyValue: number,
  landValue: number,
  year: number
) => {
  const annualTaxSavings: number = calcAnnualDepreciationTaxSavings(
    initPropertyValue,
    landValue
  );
  return roundDecimal(annualTaxSavings * year, 2);
};

const calcAnnualDepreciationTaxSavings = (
  initPropertyValue: number,
  landValue: number
) => {
  const RESIDENTIAL_DEPRECIATION_LIFESPAN: number = 27.5;
  const TAX_BRACKET_DECIMAL: number = 0.22;
  const structureValue: number = initPropertyValue - landValue;
  const annualDepreciation: number =
    structureValue / RESIDENTIAL_DEPRECIATION_LIFESPAN;
  return annualDepreciation * TAX_BRACKET_DECIMAL;
};

export const getPropertyValueForYear = (
  initPropertyValue: number,
  annualAppreciationRate: number,
  year: number
) =>
  roundDecimal(
    calcPropertyValueForYear(initPropertyValue, annualAppreciationRate, year),
    2
  );

const calcPropertyValueForYear = (
  initPropertyValue: number,
  annualAppreciationRate: number,
  year: number
) => {
  let value: number = initPropertyValue;
  const APPRECIATION_DECIMAL: number = annualAppreciationRate / 100;
  for (let i: number = 1; i < year; i++) {
    value += value * APPRECIATION_DECIMAL;
  }
  return value;
};

export const getInitInvestment = (
  initPropertyValue: number,
  percentDown: number
) => roundDecimal(calcInitInvestment(initPropertyValue, percentDown), 2);

const calcInitInvestment = (initPropertyValue: number, percentDown: number) => {
  const downPayment: number = calcDownPayment(initPropertyValue, percentDown);
  const CLOSING_COSTS: number = 5000;
  return downPayment + CLOSING_COSTS;
};

export const getVrRatio = (
  initPropertyValue: number,
  monthlyRentalIncome: number
) => {
  const annualRentalIncome: number = monthlyRentalIncome * MONTHS_PER_YEAR;
  // Don't need to factor in current property value, assuming rental income inflates with appreciation
  return roundDecimal(initPropertyValue / annualRentalIncome, 2);
};

export const getAnnualOperatingIncomeForYear = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  year: number
) =>
  roundDecimal(
    calcAnnualOperatingIncomeForYear(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      maintenanceRate,
      monthlyRentalIncome,
      propertyManagementRate,
      propertyTaxRate,
      year
    ),
    2
  );

const calcAnnualOperatingIncomeForYear = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  year: number
) => {
  const annualRentalIncome: number = calcAnnualRentalIncomeForYear(
    annualAppreciationRate,
    monthlyRentalIncome,
    year
  );
  const annualOperatingExpenses: number = calcAnnualOperatingExpensesForYear(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    maintenanceRate,
    monthlyRentalIncome,
    propertyManagementRate,
    propertyTaxRate,
    year
  );
  return annualRentalIncome - annualOperatingExpenses;
};

const calcAnnualRentalIncomeForYear = (
  annualAppreciationRate: number,
  monthlyRentalIncome: number,
  year: number
) => {
  const APPRECIATION_DECIMAL: number = annualAppreciationRate / 100;
  let annualRentalIncome = monthlyRentalIncome * MONTHS_PER_YEAR;

  for (let i: number = 1; i < year; i++) {
    annualRentalIncome = annualRentalIncome * (1 + APPRECIATION_DECIMAL);
  }

  return annualRentalIncome;
};

const calcAnnualOperatingExpensesForYear = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  year: number
) => {
  const PROPERTY_TAX_DECIMAL: number = propertyTaxRate / 100;
  const annualPropertyTax =
    calcPropertyValueForYear(initPropertyValue, annualAppreciationRate, year) *
    PROPERTY_TAX_DECIMAL;

  const MAINTENANCE_DECIMAL: number = maintenanceRate / 100;
  const ANNUAL_MAINTENANCE_COST: number =
    initPropertyValue * MAINTENANCE_DECIMAL;

  const annualPropertyManagementPayment = calcPropertyManagementPaymentForYear(
    annualAppreciationRate,
    monthlyRentalIncome,
    propertyManagementRate,
    year
  );

  return (
    annualPropertyTax +
    ANNUAL_MAINTENANCE_COST +
    annualInsurance +
    annualPropertyManagementPayment
  );
};

const calcPropertyManagementPaymentForYear = (
  annualAppreciationRate: number,
  monthlyRentalIncome: number,
  propertyManagementRate: number,
  year: number
) => {
  const PROPERTY_MANAGEMENT_DECIMAL: number = propertyManagementRate / 100;
  const annualRentalIncome: number = calcAnnualRentalIncomeForYear(
    annualAppreciationRate,
    monthlyRentalIncome,
    year
  );
  return annualRentalIncome * PROPERTY_MANAGEMENT_DECIMAL;
};

export const getCompoundOperatingIncome = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  year: number
) =>
  roundDecimal(
    calcCompoundOperatingIncome(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      maintenanceRate,
      monthlyRentalIncome,
      propertyManagementRate,
      propertyTaxRate,
      year
    ),
    2
  );

const calcCompoundOperatingIncome = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  year: number
): number => {
  let compoundOperatingIncome: number = 0;
  for (let i: number = 1; i <= year; i++) {
    compoundOperatingIncome =
      compoundOperatingIncome +
      calcAnnualOperatingIncomeForYear(
        annualAppreciationRate,
        annualInsurance,
        initPropertyValue,
        maintenanceRate,
        monthlyRentalIncome,
        propertyManagementRate,
        propertyTaxRate,
        i
      );
  }
  return compoundOperatingIncome;
};

export const getAnnualCashOnCashRoi = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) => {
  const annualCashFlow: number = calcAnnualCashFlow(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    interestRate,
    maintenanceRate,
    monthlyRentalIncome,
    percentDown,
    propertyManagementRate,
    propertyTaxRate,
    totalYears,
    year
  );
  const initInvestment: number = calcInitInvestment(
    initPropertyValue,
    percentDown
  );
  const annualCashOnCashRoiDecimal: number = annualCashFlow / initInvestment;
  return roundDecimal(annualCashOnCashRoiDecimal * 100, 2);
};

export const getAnnualCashFlow = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) =>
  roundDecimal(
    calcAnnualCashFlow(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    2
  );

const calcAnnualCashFlow = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) => {
  const annualOperatingIncome: number = calcAnnualOperatingIncomeForYear(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    maintenanceRate,
    monthlyRentalIncome,
    propertyManagementRate,
    propertyTaxRate,
    year
  );
  const monthlyPayment: number = calcMonthlyPayment(
    initPropertyValue,
    percentDown,
    totalYears,
    interestRate
  );
  const annualMortgagePayment: number = monthlyPayment * MONTHS_PER_YEAR;
  return annualOperatingIncome - annualMortgagePayment;
};

export const getCompoundCashFlow = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) =>
  roundDecimal(
    calcCompoundCashFlow(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    2
  );

const calcCompoundCashFlow = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) => {
  const monthlyPayment: number = calcMonthlyPayment(
    initPropertyValue,
    percentDown,
    totalYears,
    interestRate
  );
  const compoundOperatingIncome: number = calcCompoundOperatingIncome(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    maintenanceRate,
    monthlyRentalIncome,
    propertyManagementRate,
    propertyTaxRate,
    year
  );
  const compoundMortgagePayment: number =
    monthlyPayment * MONTHS_PER_YEAR * year;
  return compoundOperatingIncome - compoundMortgagePayment;
};

export const getTotalEarned = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) =>
  roundDecimal(
    calcTotalEarned(
      annualAppreciationRate,
      annualInsurance,
      initPropertyValue,
      interestRate,
      maintenanceRate,
      monthlyRentalIncome,
      percentDown,
      propertyManagementRate,
      propertyTaxRate,
      totalYears,
      year
    ),
    2
  );

const calcTotalEarned = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) => {
  const compoundCashFlow: number = calcCompoundCashFlow(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    interestRate,
    maintenanceRate,
    monthlyRentalIncome,
    percentDown,
    propertyManagementRate,
    propertyTaxRate,
    totalYears,
    year
  );
  const sellingPropertyValue: number = calcPropertyValueForYear(
    initPropertyValue,
    annualAppreciationRate,
    year
  );
  const propertyValueProfit: number = sellingPropertyValue - initPropertyValue;
  return compoundCashFlow + propertyValueProfit;
};

export const getTotalRoi = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  interestRate: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  percentDown: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  totalYears: number,
  year: number
) => {
  const totalEarned = calcTotalEarned(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    interestRate,
    maintenanceRate,
    monthlyRentalIncome,
    percentDown,
    propertyManagementRate,
    propertyTaxRate,
    totalYears,
    year
  );
  const initInvestment = calcInitInvestment(initPropertyValue, percentDown);
  return roundDecimal((totalEarned / initInvestment) * 100, 2);
};

export const getAnnualCapRate = (
  annualAppreciationRate: number,
  annualInsurance: number,
  initPropertyValue: number,
  maintenanceRate: number,
  monthlyRentalIncome: number,
  propertyManagementRate: number,
  propertyTaxRate: number,
  year: number
) => {
  const operatingIncome: number = calcAnnualOperatingIncomeForYear(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    maintenanceRate,
    monthlyRentalIncome,
    propertyManagementRate,
    propertyTaxRate,
    year
  );
  const propertyValue: number = calcPropertyValueForYear(
    initPropertyValue,
    annualAppreciationRate,
    year
  );
  const annualCapRateDecimal: number = operatingIncome / propertyValue;
  return roundDecimal(annualCapRateDecimal * 100, 2);
};
