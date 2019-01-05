import { mockFormValues } from "mock/form-values";
import { getProjectionMetrics } from "utils/projection";

const metrics = getProjectionMetrics(mockFormValues, 5);
const calcPrefix = "accurately calculates the";

describe("getProjectionMetrics", () => {
  it(`${calcPrefix} annual cap rate`, () => {
    expect(metrics.annualCapRate).toEqual(5.69);
  });

  it(`${calcPrefix} annual cash flow`, () => {
    expect(metrics.annualCashFlow).toEqual(1612.75);
  });

  it(`${calcPrefix} annual cash on cash ROI`, () => {
    expect(metrics.annualCashOnCashRoi).toEqual(5.38);
  });

  it(`${calcPrefix} annual depreciation tax savings`, () => {
    expect(metrics.annualDepreciationTaxSavings).toEqual(720);
  });

  it(`${calcPrefix} annual operating income`, () => {
    expect(metrics.annualOperatingIncome).toEqual(7693.03);
  });

  it(`${calcPrefix} compound cash flow`, () => {
    expect(metrics.compoundCashFlow).toEqual(6136.02);
  });

  it(`${calcPrefix} compound depreciation tax savings`, () => {
    expect(metrics.compoundDepreciationTaxSavings).toEqual(3600);
  });

  it(`${calcPrefix} compound operating income`, () => {
    expect(metrics.compoundOperatingIncome).toEqual(36537.42);
  });

  it(`${calcPrefix} equity banked`, () => {
    expect(metrics.equityBanked).toEqual(33842.4);
  });

  it(`${calcPrefix} initial investment`, () => {
    expect(metrics.initInvestment).toEqual(30000);
  });

  it(`${calcPrefix} monthly interest payment`, () => {
    expect(metrics.monthlyInterestPayment).toEqual(341.84);
  });

  it(`${calcPrefix} monthly mortgage payment`, () => {
    expect(metrics.monthlyPayment).toEqual(506.69);
  });

  it(`${calcPrefix} monthly principal payment`, () => {
    expect(metrics.monthlyPrincipalPayment).toEqual(164.85);
  });

  it(`${calcPrefix} property value`, () => {
    expect(metrics.propertyValue).toEqual(135304.02);
  });

  it(`${calcPrefix} total earned`, () => {
    expect(metrics.totalEarned).toEqual(16440.04);
  });

  it(`${calcPrefix} total ROI`, () => {
    expect(metrics.totalRoi).toEqual(54.8);
  });

  it(`${calcPrefix} V:R ratio`, () => {
    expect(metrics.vrRatio).toEqual(10.42);
  });
});
