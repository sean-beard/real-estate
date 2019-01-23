import * as React from "react";
import styled from "styled-components";

import * as T from "components/typography";
import { numberWithCommas } from "utils/data";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${T.Spacing.micro};
`;

const ResultLabel = styled(T.Label)`
  margin-bottom: ${T.Spacing.micro};
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
      <ResultLabel>{label}</ResultLabel>
      <T.H4>{getDisplayVal()}</T.H4>
    </Wrapper>
  );
};

export default Result;
