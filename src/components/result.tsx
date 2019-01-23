import * as React from "react";
import styled from "styled-components";

import { InlineText } from "components/input";
import { Label } from "components/typography";
import { numberWithCommas } from "utils/data";

const Wrapper = styled.div`
  display: flex;
`;

const ResultLabel = styled(Label)`
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
      <ResultLabel>{`${label}:`}</ResultLabel>
      <InlineText>{getDisplayVal()}</InlineText>
    </Wrapper>
  );
};

export default Result;
