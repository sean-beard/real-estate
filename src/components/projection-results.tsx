import * as React from "react";
import styled from "styled-components";

import { IFormValues } from "types/form-values";
import * as utils from "utils/projection";
import { Input, InputLabel } from "./input";
import Result, { ResultType } from "./result";

const YearInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
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
          <InputLabel>Years Held</InputLabel>
          <YearInput
            type="number"
            value={this.state.year}
            onChange={this.handleYearChange}
          />
        </YearInputWrapper>

        <Result
          label="Annual Cap Rate"
          value={annualCapRate}
          type={ResultType.numeric}
        />
        <Result
          label="Annual Cash Flow"
          value={annualCashFlow}
          type={ResultType.monetary}
        />
        <Result
          label="Annual Cash on Cash ROI"
          value={annualCashOnCashRoi}
          type={ResultType.percentage}
        />
        <Result
          label="Annual Depreciation Tax Savings"
          value={annualDepreciationTaxSavings}
          type={ResultType.monetary}
        />
        <Result
          label="Annual Operating Income"
          value={annualOperatingIncome}
          type={ResultType.monetary}
        />
        <Result
          label="Compound Cash Flow"
          value={compoundCashFlow}
          type={ResultType.monetary}
        />
        <Result
          label="Compound Depreciation Tax Savings"
          value={compoundDepreciationTaxSavings}
          type={ResultType.monetary}
        />
        <Result
          label="Compound Operating Income"
          value={compoundOperatingIncome}
          type={ResultType.monetary}
        />
        <Result
          label="Equity Banked"
          value={equityBanked}
          type={ResultType.monetary}
        />
        <Result
          label="Initial Investment"
          value={initInvestment}
          type={ResultType.monetary}
        />
        <Result
          label="Monthly Payment"
          value={monthlyPayment}
          type={ResultType.monetary}
        />
        <Result
          label="Monthly Interest Payment"
          value={monthlyInterestPayment}
          type={ResultType.monetary}
        />
        <Result
          label="Monthly Principal Payment"
          value={monthlyPrincipalPayment}
          type={ResultType.monetary}
        />
        <Result
          label="Property Value"
          value={propertyValue}
          type={ResultType.monetary}
        />
        <Result label="VR Ratio" value={vrRatio} type={ResultType.numeric} />
        <Result
          label="Total Earned"
          value={totalEarned}
          type={ResultType.monetary}
        />
        <Result
          label="Total ROI"
          value={totalRoi}
          type={ResultType.percentage}
        />
      </div>
    );
  }
}

export default ResultsForm;
