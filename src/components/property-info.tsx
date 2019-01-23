import * as React from "react";

import MonetaryInput from "components/monetary-input";
import PercentageInput from "components/percentage-input";
import { colors, labelStyles } from "components/typography";
import { defaultValues } from "config/form";
import styled from "styled-components";
import { IFormValues } from "types/form-values";
import { Input } from "./input";

const FormLabel = styled.div`
  color: ${colors.font};
`;

const Button = styled.button`
  ${labelStyles}
  font-family: Arial;
  background-color: ${colors.button};
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  color: ${colors.buttonFont};
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  display: block;
  width: 250px;

  :hover {
    background-color: ${colors.buttonHover};
  }
`;

const Toggle = styled.div`
  color: ${colors.font};
  cursor: pointer;
  background-color: ${colors.toggle};
  padding: 0.3em 0 0.3em 0.3em;
  height: 1.6em;
  border-radius: 4px 0 0 4px;

  :hover {
    color: ${colors.button};
    background-color: ${colors.toggleHover};
    left: 0.1em;
  }
`;

const ToggleSymbol = styled.span`
  font-size: small;
  color: ${colors.buttonFont};
  padding: 0.8em 0.7em 0 0.7em;
  background-color: ${colors.button};
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  min-width: 16px;
  text-align: center;
  cursor: pointer;
  float: right;
  border-radius: 0 4px 4px 0;
`;

const ToggleContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 0.5em;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 0.5em;
`;

interface IProps {
  onSubmit: (formValues: IFormValues) => void;
}

interface IState {
  formValues: IFormValues;
  showAdvanced: boolean;
}

export default class PropertyInfoForm extends React.Component<IProps, IState> {
  public state: IState = {
    formValues: defaultValues,
    showAdvanced: false
  };

  public handleToggleClick = () =>
    this.setState({ showAdvanced: !this.state.showAdvanced });

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.formValues);
  };

  public handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { formValues: currentFormValues } = this.state;
    const eventTarget = event.currentTarget;

    this.setState({
      formValues: {
        ...currentFormValues,
        [eventTarget.name]: Number(eventTarget.value)
      }
    });
  };

  public render() {
    const { showAdvanced } = this.state;
    const toggleSymbol = showAdvanced ? "-" : "+";
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
    } = defaultValues;

    return (
      <Form onSubmit={this.handleSubmit}>
        <MonetaryInput
          label="Property Value:"
          name="initPropertyValue"
          onChange={this.handleInputChange}
          placeholder={initPropertyValue.toString()}
        />
        <MonetaryInput
          label="Monthly Rental Income:"
          name="monthlyRentalIncome"
          onChange={this.handleInputChange}
          placeholder={monthlyRentalIncome.toString()}
        />
        <MonetaryInput
          label="Land Value:"
          name="landValue"
          onChange={this.handleInputChange}
          placeholder={landValue.toString()}
        />
        <PercentageInput
          label="Percent Down Payment:"
          name="percentDown"
          onChange={this.handleInputChange}
          placeholder={percentDown.toString()}
        />
        <FormLabel>Total Years to Hold:</FormLabel>
        <Input
          name="totalYears"
          onChange={this.handleInputChange}
          placeholder={totalYears.toString()}
          type="number"
        />
        <PercentageInput
          label="Mortgage Interest Rate:"
          name="interestRate"
          onChange={this.handleInputChange}
          placeholder={interestRate.toString()}
        />
        {/* ADVANCED */}
        <Toggle onClick={this.handleToggleClick}>
          Advanced
          <ToggleSymbol>{toggleSymbol}</ToggleSymbol>
        </Toggle>
        {showAdvanced && (
          <ToggleContainer>
            <PercentageInput
              label="Annual Appreciation:"
              name="annualAppreciationRate"
              onChange={this.handleInputChange}
              placeholder={annualAppreciationRate.toString()}
            />
            <PercentageInput
              label="Management Percentage:"
              name="propertyManagementRate"
              onChange={this.handleInputChange}
              placeholder={propertyManagementRate.toString()}
            />
            <PercentageInput
              label="Property Tax Rate:"
              name="propertyTaxRate"
              onChange={this.handleInputChange}
              placeholder={propertyTaxRate.toString()}
            />
            <PercentageInput
              label="Maintenance/Repair Rate:"
              name="maintenanceRate"
              onChange={this.handleInputChange}
              placeholder={maintenanceRate.toString()}
            />
            <MonetaryInput
              label="Annual Insurance:"
              name="annualInsurance"
              onChange={this.handleInputChange}
              placeholder={annualInsurance.toString()}
            />
          </ToggleContainer>
        )}
        <Button>Calculate</Button>
      </Form>
    );
  }
}
