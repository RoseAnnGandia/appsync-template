import gql from "graphql-tag";

const SAMPLE = `
  id
  name
  description
  dateCreated
  dateUpdated
`;

const SAMPLES = `
  items {
    ${SAMPLE}
  }
`;

export const sample = gql`
  query sample($id: ID!) {
    sample(id: $id) {
      ${SAMPLE}
    }
  }
`;

export const samples = gql`
  query samples($nextToken: String) {
    samples(nextToken: $nextToken) {
      ${SAMPLES}
    }
  }
`;

export const createSample = gql`
  mutation createSample($input: CreateSampleInput!) {
    createSample(input: $input) {
      ${SAMPLE}
    }
  }
`;

export const updateSample = gql`
  mutation updateSample($id: ID!, $input: UpdateSampleInput!) {
    updateSample(id: $id, input: $input){
      ${SAMPLE}
    }
  }
`;

export const removeSample = gql`
  mutation removeSample($id: ID!) {
    removeSample(id: $id)
  }
`;
