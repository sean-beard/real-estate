import * as React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";

import MobilePropertyInfoForm from "components/mobile-property-info";
import Page from "components/page";
import ProjectionResults from "components/projection-results";
import PropertyInfoForm from "components/property-info";
import { Breakpoints } from "components/typography";
import { IFormValues } from "types/form-values";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto auto;
  grid-gap: 2em;
  grid-template-areas: "form results";

  @media (${Breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "form"
      "results";
    input {
      width: 90%;
    }
  }
`;

const InfoForm = styled.div`
  grid-area: form;
`;

const Results = styled.div`
  grid-area: results;
`;

interface IState {
  isMobileFormOpen: boolean;
  formValues?: IFormValues;
}

class ProjectionPage extends React.Component<{}, IState> {
  public state: IState = {
    formValues: undefined,
    isMobileFormOpen: true
  };

  public handlePropertyInfoSubmit = (formValues: IFormValues) =>
    this.setState({
      formValues,
      isMobileFormOpen: false
    });

  public handleMobileFormOpen = () =>
    this.setState({
      isMobileFormOpen: true
    });

  public handleMobileFormClose = () =>
    this.setState({
      isMobileFormOpen: false
    });

  public render() {
    return (
      <Page title="Projection Analysis">
        <Container>
          <InfoForm>
            <MediaQuery query={`(${Breakpoints.mobile})`}>
              {isMobileScreen =>
                isMobileScreen ? (
                  <MobilePropertyInfoForm
                    isOpen={this.state.isMobileFormOpen}
                    values={this.state.formValues}
                    onSubmit={this.handlePropertyInfoSubmit}
                    onClose={this.handleMobileFormClose}
                    onOpen={this.handleMobileFormOpen}
                  />
                ) : (
                  <PropertyInfoForm onSubmit={this.handlePropertyInfoSubmit} />
                )
              }
            </MediaQuery>
          </InfoForm>
          <Results>
            <ProjectionResults formValues={this.state.formValues} />
          </Results>
        </Container>
      </Page>
    );
  }
}

export default ProjectionPage;
