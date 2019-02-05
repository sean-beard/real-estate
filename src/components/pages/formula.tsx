import * as React from "react";
import styled from "styled-components";

import Page from "components/page";
import * as T from "components/typography";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(8, auto);
  grid-gap: 1em;

  > * {
    border: 1px solid #9999;
    border-radius: 4px;
  }
`;

const ColumnHeader = styled(T.H3)`
  font-weight: ${T.FontWeight.medium};
`;

const FormulaPage: React.SFC = () => (
  <Page title="Formulas">
    <Wrapper>
      <ColumnHeader>Metric</ColumnHeader>
      <ColumnHeader>Formula</ColumnHeader>

      <T.H3>Inital Investment</T.H3>
      <T.H3>Purchasing Price + Closing Costs</T.H3>

      <T.H3>Value:Rent Ratio</T.H3>
      <T.H3>Initial Property Value / Annual Rental Income</T.H3>

      <T.H3>Operating Income</T.H3>
      <div>
        <T.H3>Rental Income - Operating Expenses</T.H3>
        <T.H4>
          Operating Expenses = Repairs/Maintenance + Insurance + Property
          Management + Property Tax
        </T.H4>
      </div>

      <T.H3>Cash Flow</T.H3>
      <T.H3>Operating Income - Mortgage Payment</T.H3>

      <T.H3>Cash on Cash ROI</T.H3>
      <T.H3>(Cash Flow / Initial Investment) * 100</T.H3>

      <T.H3>Depreciation Tax Savings</T.H3>
      <div>
        <T.H3>
          (Property Structure Value / Depreciation Lifespan) * Tax Bracket
          Decimal
        </T.H3>
        <T.H4>Residential Depreciation Lifespan = 27.5</T.H4>
        <T.H4>Tax Bracket Decimal = 0.22</T.H4>
      </div>

      <T.H3>Total ROI</T.H3>
      <T.H3>(Total Earned / Initial Investment) * 100</T.H3>
    </Wrapper>
  </Page>
);

export default FormulaPage;
