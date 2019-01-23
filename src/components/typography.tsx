import styled, { css } from "styled-components";

export const colors = {
  blue: "#EEE",
  button: "#607D8B",
  buttonFont: "white",
  buttonHover: "rgb(132, 158, 172)",
  font: "#888",
  header: "#369",
  toggle: "#EEE",
  toggleHover: "DDD"
};

export enum FontWeight {
  light = 300,
  regular = 400,
  medium = 500,
  semiBold = 600,
  bold = 700
}

export enum Breakpoints {
  desktop = "max-width: 70em",
  tablet = "max-width: 48em",
  mobile = "max-width: 37.5em"
}

export enum Spacing {
  micro = "0.5rem",
  small = "1rem",
  medium = "2rem",
  large = "4rem",
  xlarge = "8rem"
}

export const labelStyles = css`
  color: ${colors.font};
  font-size: ${Spacing.small};
  font-weight: ${FontWeight.medium};

  @media (${Breakpoints.mobile}) {
    font-size: 0.875rem;
  }
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: ${FontWeight.light};
  line-height: 1.25;
  margin: 0;

  @media (${Breakpoints.mobile}) {
    font-size: 1.125rem;
  }
`;

export const H4 = styled.h4`
  font-size: 1.125rem;
  font-weight: ${FontWeight.light};
  line-height: 1.28;
  margin: 0;

  @media (${Breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const Label = styled.label`
  ${labelStyles}
`;
