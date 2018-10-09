import { Finance } from "financejs";
import { IFormValues } from "types/form-values";

export class ProjectionData {
  public propertyValue: number;
  public monthlyPayment: number;
  public monthlyInterestPayment: number;
  public monthlyPrincipalPayment: number;
  public annualDepreciationTaxSavings: number;
  public compoundDepreciationTaxSavings: number;
  public equityBanked: number;
  public initInvestment: number;
  public vrRatio: number;
  public annualOperatingIncome: number;
  public compoundOperatingIncome: number;
  public annualCashOnCashRoi: number;
  public annualCashFlow: number;
  public compoundCashFlow: number;
  public totalEarned: number;
  public totalRoi: number;
  public annualCapRate: number;
  private financeLib: Finance;
  private year: number;
  private formValues: IFormValues;

  constructor(formVals: IFormValues) {
    this.financeLib = new Finance();
    this.year = 1;
    this.formValues = formVals;
  }

  public setYear(year: number): void {
    this.year = year;
  }

  public getAnalysisResults(): void {
    this.calculateAnnualData();
    this.calculateCompoundData();
  }

  private calculateAnnualData(): void {
    this.setLoanInfo();
    this.setAnnualDepreciationTaxSavings();
    this.setInitInvestment();
    this.setVrRatio();
    this.setAnnualOperatingIncome();
    this.setAnnualCashOnCashRoi();
    this.setAnnualCashFlow();
    this.setAnnualCapRate();
  }

  private calculateCompoundData(): void {
    this.setPropertyValue();
    this.setCompoundDepreciationTaxSavings();
    this.setCompoundOperatingIncome();
    this.setCompoundCashFlow();
    this.setTotalEarned();
    this.setTotalRoi();
  }

  private setLoanInfo(): void {
    this.setMonthlyPayment();
    const MONTHS_PER_YEAR: number = 12;
    const downPayment: number = this.getDownPayment();
    const monthlyPayment = this.getMonthlyPayment();
    const monthlyInterestRate: number =
      this.formValues.interestRate / MONTHS_PER_YEAR;
    const monthlyInterestDecimal: number = monthlyInterestRate / 100;
    const totalMonths: number = this.year * MONTHS_PER_YEAR;
    let loanPrincipal: number = this.getInitLoanPrincipal();
    let monthlyInterestPayment: number = monthlyInterestDecimal * loanPrincipal;
    let monthlyPrincipalPayment: number =
      monthlyPayment - monthlyInterestPayment;
    let equityBanked: number = downPayment;

    for (let i: number = 0; i < totalMonths; i++) {
      loanPrincipal -= monthlyPrincipalPayment;
      equityBanked += monthlyPrincipalPayment;
      monthlyInterestPayment = monthlyInterestDecimal * loanPrincipal;
      monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;
    }

    this.monthlyInterestPayment = this.roundDecimal(monthlyInterestPayment, 2);
    this.monthlyPrincipalPayment = this.roundDecimal(
      monthlyPrincipalPayment,
      2
    );
    this.equityBanked = this.roundDecimal(equityBanked, 2);
  }

  private setMonthlyPayment(): void {
    this.monthlyPayment = this.roundDecimal(this.getMonthlyPayment(), 2);
  }

  private setAnnualDepreciationTaxSavings(): void {
    this.annualDepreciationTaxSavings = this.roundDecimal(
      this.getAnnualDepreciationTaxSavings(),
      2
    );
  }

  private setCompoundDepreciationTaxSavings(): void {
    const annualTaxSavings: number = this.getAnnualDepreciationTaxSavings();
    this.compoundDepreciationTaxSavings = this.roundDecimal(
      annualTaxSavings * this.year,
      2
    );
  }

  private setPropertyValue(): void {
    this.propertyValue = this.roundDecimal(
      this.getPropertyValueForYear(this.year),
      2
    );
  }

  private setInitInvestment(): void {
    this.initInvestment = this.roundDecimal(this.getInitInvestment(), 2);
  }

  private setVrRatio(): void {
    const MONTHS_PER_YEAR: number = 12;
    const annualRentalIncome: number =
      this.formValues.monthlyRentalIncome * MONTHS_PER_YEAR;
    // Don't need to factor in current property value, assuming rental income inflates with appreciation
    this.vrRatio = this.roundDecimal(
      this.formValues.initPropertyValue / annualRentalIncome,
      2
    );
  }

  private setAnnualOperatingIncome(): void {
    this.annualOperatingIncome = this.roundDecimal(
      this.getAnnualOperatingIncomeForYear(this.year),
      2
    );
  }

  private setCompoundOperatingIncome(): void {
    this.compoundOperatingIncome = this.roundDecimal(
      this.getCompoundOperatingIncome(),
      2
    );
  }

  private setAnnualCashOnCashRoi(): void {
    const annualCashFlow: number = this.getAnnualCashFlow();
    const initInvestment: number = this.getInitInvestment();
    const annualCashOnCashRoiDecimal: number = annualCashFlow / initInvestment;
    this.annualCashOnCashRoi = this.roundDecimal(
      annualCashOnCashRoiDecimal * 100,
      2
    );
  }

  private setAnnualCashFlow(): void {
    this.annualCashFlow = this.roundDecimal(this.getAnnualCashFlow(), 2);
  }

  private setCompoundCashFlow(): void {
    this.compoundCashFlow = this.roundDecimal(this.getCompoundCashFlow(), 2);
  }

  private setTotalEarned(): void {
    this.totalEarned = this.roundDecimal(this.getTotalEarned(), 2);
  }

  private setTotalRoi(): void {
    const totalEarned = this.getTotalEarned();
    const initInvestment = this.getInitInvestment();
    const totalRoi = (totalEarned / initInvestment) * 100;
    this.totalRoi = this.roundDecimal(totalRoi, 2);
  }

  private setAnnualCapRate(): void {
    const operatingIncome: number = this.getAnnualOperatingIncomeForYear(
      this.year
    );
    const propertyValue: number = this.getPropertyValueForYear(this.year);
    const annualCapRateDecimal: number = operatingIncome / propertyValue;
    this.annualCapRate = this.roundDecimal(annualCapRateDecimal * 100, 2);
  }

  private getInitInvestment(): number {
    const downPayment: number = this.getDownPayment();
    const CLOSING_COSTS: number = 5000;
    return downPayment + CLOSING_COSTS;
  }

  private getDownPayment(): number {
    const percentDownDecimal: number = this.formValues.percentDown / 100;
    return this.formValues.initPropertyValue * percentDownDecimal;
  }

  private getMonthlyPayment(): number {
    const MONTHS_PER_YEAR: number = 12;
    const initLoanPrincipal: number = this.getInitLoanPrincipal();
    const totalPayments: number = this.formValues.totalYears * MONTHS_PER_YEAR;
    return this.financeLib.AM(
      initLoanPrincipal,
      this.formValues.interestRate,
      totalPayments,
      1
    );
  }

  private getAnnualDepreciationTaxSavings(): number {
    const RESIDENTIAL_DEPRECIATION_LIFESPAN: number = 27.5;
    const TAX_BRACKET_DECIMAL: number = 0.22;
    const structureValue: number =
      this.formValues.initPropertyValue - this.formValues.landValue;
    const annualDepreciation: number =
      structureValue / RESIDENTIAL_DEPRECIATION_LIFESPAN;
    return annualDepreciation * TAX_BRACKET_DECIMAL;
  }

  private getInitLoanPrincipal(): number {
    const downPayment: number = this.getDownPayment();
    return this.formValues.initPropertyValue - downPayment;
  }

  private getAnnualCashFlow(): number {
    const MONTHS_PER_YEAR: number = 12;
    const annualOperatingIncome: number = this.getAnnualOperatingIncomeForYear(
      this.year
    );
    const monthlyPayment: number = this.getMonthlyPayment();
    const annualMortgagePayment: number = monthlyPayment * MONTHS_PER_YEAR;
    return annualOperatingIncome - annualMortgagePayment;
  }

  private getAnnualOperatingIncomeForYear(year: number): number {
    const annualRentalIncome: number = this.getAnnualRentalIncomeForYear(year);
    const annualOperatingExpenses: number = this.getAnnualOperatingExpensesForYear(
      year
    );
    return annualRentalIncome - annualOperatingExpenses;
  }

  private getAnnualOperatingExpensesForYear(year: number): number {
    const PROPERTY_TAX_DECIMAL: number = this.formValues.propertyTaxRate / 100;
    const annualPropertyTax =
      this.getPropertyValueForYear(year) * PROPERTY_TAX_DECIMAL;

    const MAINTENANCE_DECIMAL: number = this.formValues.maintenanceRate / 100;
    const ANNUAL_MAINTENANCE_COST: number =
      this.formValues.initPropertyValue * MAINTENANCE_DECIMAL;

    const annualPropertyManagementPayment = this.getPropertyManagementPaymentForYear(
      year
    );

    const annualOperatingExpenses: number =
      annualPropertyTax +
      ANNUAL_MAINTENANCE_COST +
      this.formValues.annualInsurance +
      annualPropertyManagementPayment;

    return annualOperatingExpenses;
  }

  private getPropertyManagementPaymentForYear(year: number): number {
    const PROPERTY_MANAGEMENT_DECIMAL: number =
      this.formValues.propertyManagementRate / 100;
    const annualRentalIncome: number = this.getAnnualRentalIncomeForYear(year);
    return annualRentalIncome * PROPERTY_MANAGEMENT_DECIMAL;
  }

  private getAnnualRentalIncomeForYear(year: number): number {
    const MONTHS_PER_YEAR: number = 12;
    const APPRECIATION_DECIMAL: number =
      this.formValues.annualAppreciationRate / 100;
    let annualRentalIncome =
      this.formValues.monthlyRentalIncome * MONTHS_PER_YEAR;

    for (let i: number = 1; i < year; i++) {
      annualRentalIncome = annualRentalIncome * (1 + APPRECIATION_DECIMAL);
    }

    return annualRentalIncome;
  }

  private getCompoundOperatingIncome(): number {
    let compoundOperatingIncome: number = 0;
    for (let i: number = 1; i <= this.year; i++) {
      compoundOperatingIncome =
        compoundOperatingIncome + this.getAnnualOperatingIncomeForYear(i);
    }
    return compoundOperatingIncome;
  }

  private getCompoundCashFlow(): number {
    const MONTHS_PER_YEAR: number = 12;
    const monthlyPayment: number = this.getMonthlyPayment();
    const compoundOperatingIncome: number = this.getCompoundOperatingIncome();
    const compoundMortgagePayment: number =
      monthlyPayment * MONTHS_PER_YEAR * this.year;
    return compoundOperatingIncome - compoundMortgagePayment;
  }

  private getPropertyValueForYear(year: number): number {
    let value: number = this.formValues.initPropertyValue;
    const APPRECIATION_DECIMAL: number =
      this.formValues.annualAppreciationRate / 100;
    for (let i: number = 1; i < year; i++) {
      value += value * APPRECIATION_DECIMAL;
    }
    return this.roundDecimal(value, 2);
  }

  private getTotalEarned(): number {
    const compoundCashFlow: number = this.getCompoundCashFlow();
    const sellingPropertyValue: number = this.getPropertyValueForYear(
      this.year
    );
    const propertyValueProfit: number =
      sellingPropertyValue - this.formValues.initPropertyValue;
    return compoundCashFlow + propertyValueProfit;
  }

  private roundDecimal(num: number, digits: number): number {
    const multiplier: number = Math.pow(10, digits);
    num = parseFloat((num * multiplier).toFixed(11));
    const tempNum: number = Math.round(num) / multiplier;
    return +tempNum.toFixed(digits);
  }
}
