import { Finance } from "financejs";

import { IFormValues } from "types/form-values";

const MONTHS_PER_YEAR: number = 12;

interface IProjectionMetrics {
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

interface ILoanMetrics {
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

  const downPayment: number = calcDownPayment(initPropertyValue, percentDown);
  const initLoanPrincipal = getInitLoanPrincipal(
    initPropertyValue,
    downPayment
  );
  const monthlyPayment = calcMonthlyPayment(
    initLoanPrincipal,
    totalYears,
    interestRate
  );
  const {
    equityBanked,
    monthlyInterestPayment,
    monthlyPrincipalPayment
  } = getLoanMetricsByYearsHeld(
    downPayment,
    monthlyPayment,
    initLoanPrincipal,
    interestRate,
    year
  );
  const initInvestment = calcInitInvestment(downPayment);
  const annualOperatingIncome = calcAnnualOperatingIncomeForYear(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    maintenanceRate,
    monthlyRentalIncome,
    propertyManagementRate,
    propertyTaxRate,
    year
  );
  const annualCashFlow = calcAnnualCashFlow(
    annualOperatingIncome,
    monthlyPayment
  );
  const compoundOperatingIncome = calcCompoundOperatingIncome(
    annualAppreciationRate,
    annualInsurance,
    initPropertyValue,
    maintenanceRate,
    monthlyRentalIncome,
    propertyManagementRate,
    propertyTaxRate,
    year
  );
  const compoundCashFlow = calcCompoundCashFlow(
    compoundOperatingIncome,
    monthlyPayment,
    year
  );
  const totalEarned = calcTotalEarned(
    annualAppreciationRate,
    compoundCashFlow,
    initPropertyValue,
    year
  );
  const propertyValue = calcPropertyValueForYear(
    initPropertyValue,
    annualAppreciationRate,
    year
  );
  const annualDepreciationTaxSavings = calcAnnualDepreciationTaxSavings(
    initPropertyValue,
    landValue
  );

  return {
    annualCapRate: getAnnualCapRate(annualOperatingIncome, propertyValue),
    annualCashFlow: roundDecimal(annualCashFlow, 2),
    annualCashOnCashRoi: getAnnualCashOnCashRoi(annualCashFlow, initInvestment),
    annualDepreciationTaxSavings: roundDecimal(
      calcAnnualDepreciationTaxSavings(initPropertyValue, landValue),
      2
    ),
    annualOperatingIncome: roundDecimal(
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
    ),
    compoundCashFlow: roundDecimal(compoundCashFlow, 2),
    compoundDepreciationTaxSavings: getDepreciationTaxSavingsCompound(
      annualDepreciationTaxSavings,
      year
    ),
    compoundOperatingIncome: roundDecimal(compoundOperatingIncome, 2),
    equityBanked,
    initInvestment: roundDecimal(initInvestment, 2),
    monthlyInterestPayment,
    monthlyPayment: roundDecimal(
      calcMonthlyPayment(initLoanPrincipal, totalYears, interestRate),
      2
    ),
    monthlyPrincipalPayment,
    propertyValue: roundDecimal(
      calcPropertyValueForYear(initPropertyValue, annualAppreciationRate, year),
      2
    ),
    totalEarned: roundDecimal(totalEarned, 2),
    totalRoi: getTotalRoi(initInvestment, totalEarned),
    vrRatio: getVrRatio(initPropertyValue, monthlyRentalIncome)
  };
};

const getInitLoanPrincipal = (initPropertyValue: number, downPayment: number) =>
  initPropertyValue - downPayment;

const calcMonthlyPayment = (
  initLoanPrincipal: number,
  totalYears: number,
  interestRate: number
) => {
  const totalPayments: number = totalYears * MONTHS_PER_YEAR;
  return new Finance().AM(initLoanPrincipal, interestRate, totalPayments, 1);
};

const calcDownPayment = (initPropertyValue: number, percentDown: number) =>
  initPropertyValue * (percentDown / 100);

const getLoanMetricsByYearsHeld = (
  downPayment: number,
  monthlyPayment: number,
  initLoanPrincipal: number,
  interestRate: number,
  year: number
): ILoanMetrics => {
  const monthlyInterestRate: number = interestRate / MONTHS_PER_YEAR;
  const monthlyInterestDecimal: number = monthlyInterestRate / 100;
  const totalMonths: number = year * MONTHS_PER_YEAR;
  let loanPrincipal = initLoanPrincipal;
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

const getDepreciationTaxSavingsCompound = (
  annualDepreciationTaxSavings: number,
  year: number
) => {
  return roundDecimal(annualDepreciationTaxSavings * year, 2);
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

const calcInitInvestment = (downPayment: number) => {
  const CLOSING_COSTS: number = 5000;
  return downPayment + CLOSING_COSTS;
};

const getVrRatio = (initPropertyValue: number, monthlyRentalIncome: number) => {
  const annualRentalIncome: number = monthlyRentalIncome * MONTHS_PER_YEAR;
  // Don't need to factor in current property value, assuming rental income inflates with appreciation
  return roundDecimal(initPropertyValue / annualRentalIncome, 2);
};

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

const getAnnualCashOnCashRoi = (
  annualCashFlow: number,
  initInvestment: number
) => {
  const annualCashOnCashRoiDecimal: number = annualCashFlow / initInvestment;
  return roundDecimal(annualCashOnCashRoiDecimal * 100, 2);
};

const calcAnnualCashFlow = (
  annualOperatingIncome: number,
  monthlyPayment: number
) => {
  const annualMortgagePayment: number = monthlyPayment * MONTHS_PER_YEAR;
  return annualOperatingIncome - annualMortgagePayment;
};

const calcCompoundCashFlow = (
  compoundOperatingIncome: number,
  monthlyPayment: number,
  year: number
) => {
  const compoundMortgagePayment: number =
    monthlyPayment * MONTHS_PER_YEAR * year;
  return compoundOperatingIncome - compoundMortgagePayment;
};

const calcTotalEarned = (
  annualAppreciationRate: number,
  compoundCashFlow: number,
  initPropertyValue: number,
  year: number
) => {
  const sellingPropertyValue: number = calcPropertyValueForYear(
    initPropertyValue,
    annualAppreciationRate,
    year
  );
  const propertyValueProfit: number = sellingPropertyValue - initPropertyValue;
  return compoundCashFlow + propertyValueProfit;
};

const getTotalRoi = (initInvestment: number, totalEarned: number) =>
  roundDecimal((totalEarned / initInvestment) * 100, 2);

const getAnnualCapRate = (
  annualOperatingIncome: number,
  propertyValue: number
) => {
  const annualCapRateDecimal: number = annualOperatingIncome / propertyValue;
  return roundDecimal(annualCapRateDecimal * 100, 2);
};
