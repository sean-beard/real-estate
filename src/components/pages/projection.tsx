import Page from "components/page";
import ProjectionResults from "components/projection-results";
import PropertyInfoForm from "components/property-info";
import * as React from "react";
import styled from "styled-components";
import { IFormValues } from "types/form-values";
import { ProjectionData } from "utils/projection";

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

const InfoForm = styled(PropertyInfoForm)`
  grid-area: form;
`;

const ResultsForm = styled(ProjectionResults)`
  grid-area: results;
`;

const ProjectionPage: React.SFC = () => {
  const handlePropertyInfoSubmit = (formValues: IFormValues) => {
    const metrics = new ProjectionData(formValues);
    metrics.getAnalysisResults();
  };
  return (
    <Page title="Projection Analysis">
      <Container>
        <InfoForm onSubmit={handlePropertyInfoSubmit} />
        <ResultsForm />
      </Container>
    </Page>
  );
};

export default ProjectionPage;
