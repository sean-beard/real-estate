import * as React from "react";
import { IFormValues } from "types/form-values";
import * as utils from "utils/projection";
import { InputLabel } from "./input";

interface IProps {
  formValues?: IFormValues;
}

interface IState {
  year: number;
}

// const ResultsForm: React.SFC<IProps, IState> = ({ formValues }: IProps) => {
class ResultsForm extends React.Component<IProps, IState> {
  public state: IState = {
    year: 1
  };

  public render() {
    const { formValues } = this.props;
    if (!formValues) {
      return null;
    }

    const {
      annualCapRate,
      annualCashFlow,
      annualCashOnCashRoi,
      annualDepreciationTaxSavings,
      annualOperatingIncome,
      compoundCashFlow,
      compoundDepreciationTaxSavings,
      compoundOperatingIncome,
      equityBanked,
      initInvestment,
      monthlyInterestPayment,
      monthlyPayment,
      monthlyPrincipalPayment,
      propertyValue,
      totalEarned,
      totalRoi,
      vrRatio
    } = utils.getProjectionMetrics(formValues, this.state.year);

    return (
      <div>
        <h3>Results Form</h3>
        <InputLabel>Annual Cap Rate</InputLabel>
        <p>{annualCapRate}</p>
        <InputLabel>Annual Cash Flow</InputLabel>
        <p>{annualCashFlow}</p>
        <InputLabel>Annual Cash on Cash ROI</InputLabel>
        <p>{annualCashOnCashRoi}</p>
        <InputLabel>Annual Depreciation Tax Savings</InputLabel>
        <p>{annualDepreciationTaxSavings}</p>
        <InputLabel>Annual Operating Income</InputLabel>
        <p>{annualOperatingIncome}</p>
        <InputLabel>Compound Cash Flow</InputLabel>
        <p>{compoundCashFlow}</p>
        <InputLabel>Compound Depreciation Tax Savings</InputLabel>
        <p>{compoundDepreciationTaxSavings}</p>
        <InputLabel>Compound Operating Income</InputLabel>
        <p>{compoundOperatingIncome}</p>
        <InputLabel>Equity Banked</InputLabel>
        <p>{equityBanked}</p>
        <InputLabel>Initial Investment</InputLabel>
        <p>{initInvestment}</p>
        <InputLabel>Monthly Payment</InputLabel>
        <p>{monthlyPayment}</p>
        <InputLabel>Monthly Interest Payment</InputLabel>
        <p>{monthlyInterestPayment}</p>
        <InputLabel>Monthly Principal Payment</InputLabel>
        <p>{monthlyPrincipalPayment}</p>
        <InputLabel>Property Value</InputLabel>
        <p>{propertyValue}</p>
        <InputLabel>VR Ratio</InputLabel>
        <p>{vrRatio}</p>
        <InputLabel>Total Earned</InputLabel>
        <p>{totalEarned}</p>
        <InputLabel>Total ROI</InputLabel>
        <p>{totalRoi}</p>
      </div>
    );
  }
}

export default ResultsForm;
