import Page from "components/page";
import ProjectionResults from "components/projection-results";
import PropertyInfoForm from "components/property-info";
import * as React from "react";
import styled from "styled-components";
import { IFormValues } from "types/form-values";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto auto;
  grid-gap: 2em;
  grid-template-areas: "form results";

  @media (max-width: 800px) {
    grid-template-areas:
      "form"
      "results";
  }
`;

const InfoForm = styled.div`
  grid-area: form;
`;

const Results = styled.div`
  grid-area: results;
`;

interface IState {
  formValues?: IFormValues;
}

class ProjectionPage extends React.Component<{}, IState> {
  public state: IState = {
    formValues: undefined
  };

  public handlePropertyInfoSubmit = (formValues: IFormValues) =>
    this.setState({
      formValues
    });

  public render() {
    return (
      <Page title="Projection Analysis">
        <Container>
          <InfoForm>
            <PropertyInfoForm onSubmit={this.handlePropertyInfoSubmit} />
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
