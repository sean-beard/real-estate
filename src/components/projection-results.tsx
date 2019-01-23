import * as React from "react";
import styled from "styled-components";

import { Label } from "components/typography";
import { IFormValues } from "types/form-values";
import * as utils from "utils/projection";
import { Input } from "./input";
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

    const metrics = utils.getProjectionMetrics(formValues, this.state.year);

    return (
      <div>
        <YearInputWrapper>
          <Label>Years Held</Label>
          <YearInput
            type="number"
            value={this.state.year}
            onChange={this.handleYearChange}
          />
        </YearInputWrapper>

        <Result
          label="Total ROI"
          value={metrics.totalRoi}
          type={ResultType.percentage}
          highlighted={true}
        />
        <Result
          label="Annual Cash Flow"
          value={metrics.annualCashFlow}
          type={ResultType.monetary}
          highlighted={true}
        />
        <Result
          label="Annual Cash on Cash ROI"
          value={metrics.annualCashOnCashRoi}
          type={ResultType.percentage}
          highlighted={true}
        />
        <Result
          label="Equity Banked"
          value={metrics.equityBanked}
          type={ResultType.monetary}
          highlighted={true}
        />
        <Result
          label="Annual Cap Rate"
          value={metrics.annualCapRate}
          type={ResultType.numeric}
        />
        <Result
          label="Annual Depreciation Tax Savings"
          value={metrics.annualDepreciationTaxSavings}
          type={ResultType.monetary}
        />
        <Result
          label="Annual Operating Income"
          value={metrics.annualOperatingIncome}
          type={ResultType.monetary}
        />
        <Result
          label="Compound Cash Flow"
          value={metrics.compoundCashFlow}
          type={ResultType.monetary}
        />
        <Result
          label="Compound Depreciation Tax Savings"
          value={metrics.compoundDepreciationTaxSavings}
          type={ResultType.monetary}
        />
        <Result
          label="Compound Operating Income"
          value={metrics.compoundOperatingIncome}
          type={ResultType.monetary}
        />
        <Result
          label="Initial Investment"
          value={metrics.initInvestment}
          type={ResultType.monetary}
        />
        <Result
          label="Monthly Payment"
          value={metrics.monthlyPayment}
          type={ResultType.monetary}
        />
        <Result
          label="Monthly Interest Payment"
          value={metrics.monthlyInterestPayment}
          type={ResultType.monetary}
        />
        <Result
          label="Monthly Principal Payment"
          value={metrics.monthlyPrincipalPayment}
          type={ResultType.monetary}
        />
        <Result
          label="Property Value"
          value={metrics.propertyValue}
          type={ResultType.monetary}
        />
        <Result
          label="VR Ratio"
          value={metrics.vrRatio}
          type={ResultType.numeric}
        />
        <Result
          label="Total Earned"
          value={metrics.totalEarned}
          type={ResultType.monetary}
        />
      </div>
    );
  }
}

export default ResultsForm;
