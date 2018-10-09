import { IInputProps, Input, InputLabel, MetricUnit } from "components/input";
import * as React from "react";

const PercentageInput: React.SFC<IInputProps> = ({
  label,
  placeholder,
  ...rest
}: IInputProps) => (
  <React.Fragment>
    <InputLabel>{label}</InputLabel>
    <div>
      <Input type="number" placeholder={placeholder} {...rest} />
      <MetricUnit> %</MetricUnit>
    </div>
  </React.Fragment>
);

export default PercentageInput;
