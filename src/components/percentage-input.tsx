import * as React from "react";

import { IInputProps, InlineText, Input } from "components/input";
import { Label } from "components/typography";

const PercentageInput: React.SFC<IInputProps> = ({
  label,
  placeholder,
  ...rest
}: IInputProps) => (
  <React.Fragment>
    <Label>{label}</Label>
    <div>
      <Input type="number" placeholder={placeholder} {...rest} />
      <InlineText> %</InlineText>
    </div>
  </React.Fragment>
);

export default PercentageInput;
