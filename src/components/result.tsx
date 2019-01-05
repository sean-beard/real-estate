import * as React from "react";
import styled from "styled-components";

import { InputLabel, MetricUnit } from "components/input";

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
    if (type === ResultType.monetary) {
      return `$${value}`;
    }
    if (type === ResultType.percentage) {
      return `${value}%`;
    }
    return value;
  };

  return (
    <Wrapper>
      <Label>{`${label}:`}</Label>
      <MetricUnit>{getDisplayVal()}</MetricUnit>
    </Wrapper>
  );
};

export default Result;
