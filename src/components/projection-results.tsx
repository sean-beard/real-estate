import * as React from "react";
import styled from "styled-components";

import { IFormValues } from "types/form-values";
import * as utils from "utils/projection";
import { Input, InputLabel } from "./input";

const YearInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7rem;
  margin-bottom: 1rem;
`;

const YearInput = styled(Input)`
  text-align: center;
  width: 4rem;
`;

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

  public handleYearChange = (e: React.FormEvent<HTMLInputElement>) => {
    const year = parseInt(e.currentTarget.value, 10);
    if (year > 0) {
      this.setState({ year });
    }
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
        <YearInputWrapper>
          <InputLabel>Year</InputLabel>
          <YearInput
            type="number"
            value={this.state.year}
            onChange={this.handleYearChange}
          />
        </YearInputWrapper>
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
