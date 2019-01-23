import { IInputProps, InlineText, Input } from "components/input";
import { Label } from "components/typography";
import * as React from "react";

const MonetaryInput: React.SFC<IInputProps> = ({
  label,
  placeholder,
  ...rest
}: IInputProps) => (
  <React.Fragment>
    <Label>{label}</Label>
    <div>
      <InlineText>$ </InlineText>
      <Input type="number" min="0" placeholder={placeholder} {...rest} />
    </div>
  </React.Fragment>
);

export default MonetaryInput;
