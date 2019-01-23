import * as React from "react";
import styled from "styled-components";

import { colors } from "./typography";

const PageContainer = styled.div`
  padding: 15px;
`;

const Header = styled.h2`
  color: ${colors.header};
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 0 20px 0;
`;

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Page: React.SFC<IProps> = ({ children, title }: IProps) => (
  <PageContainer>
    <Header>{title}</Header>
    {children}
  </PageContainer>
);

export default Page;
