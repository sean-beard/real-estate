import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "components/typography";

const Header = styled.div`
  background-color: ${colors.blue};
  border-radius: 4px;
`;

const Title = styled.h1`
  color: ${colors.header};
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
  margin: 0 0 20px 0;
  text-align: center;
  display: grid;
  grid-gap: 0.5em;
  grid-column: 1 / -1;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  :before,
  :after {
    content: "";
    display: block;
    height: 0.25em;
    background: linear-gradient(
      to var(--direction, left),
      ${colors.buttonHover},
      transparent
    );
  }

  :after {
    --direction: right;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5em, 10em));
  grid-template-rows: auto;
  grid-gap: 0.25em;
  text-align: center;
  padding: 0.25em;
  margin-bottom: 1em;
`;

const NavTab = styled(Link)`
  background-color: ${colors.button};
  color: white;
  cursor: pointer;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  text-decoration: none;

  :hover {
    background-color: ${colors.buttonHover};
  }
`;

const Navigation: React.SFC = () => (
  <Header>
    <Title>Investment Dashboard</Title>
    <Container>
      <NavTab to="/">Projection Analysis</NavTab>
      <NavTab to="/formulas">Formulas</NavTab>
    </Container>
  </Header>
);

export default Navigation;
