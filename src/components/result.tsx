import * as React from "react";
import styled from "styled-components";

import { InlineText, InputLabel } from "components/input";
import { numberWithCommas } from "utils/data";

const Wrapper = styled.div`
  display: flex;
`;

const Label = styled(InputLabel)`
  margin-right: 0.5rem;
`;

export enum ResultType {
  monetary = "Monetary",
  numeric = "Numeric",
  percentage = "Percentage"
}

interface IProps {
  label: string;
  value: number;
  type: ResultType;
}

const Result: React.SFC<IProps> = ({ label, value, type }) => {
  const getDisplayVal = () => {
    const formattedVal = numberWithCommas(value);
    if (type === ResultType.monetary) {
      return `$${formattedVal}`;
    }
    if (type === ResultType.percentage) {
      return `${formattedVal}%`;
    }
    return formattedVal;
  };

  return (
    <Wrapper>
      <Label>{`${label}:`}</Label>
      <InlineText>{getDisplayVal()}</InlineText>
    </Wrapper>
  );
};

export default Result;
