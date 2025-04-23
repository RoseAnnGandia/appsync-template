import { expect, it, describe } from "@jest/globals";
import { UserClient } from "../../client";
import {
  createSample,
  updateSample,
  removeSample,
  sample,
  samples,
} from "./operations";
import mockData from "./mock-data.json";

let id = "";
const client = UserClient(),
  { createSampleInput, updateSampleInput } = mockData;

describe("When creating sample item", () => {
  it(`should be created`, async () => {
    const mutation = createSample;
    const variables = {
      input: createSampleInput,
    };
    const createdSample: any = await client.mutate({
      mutation,
      variables,
    });

    id = createdSample.data.createSample.id;

    expect(createdSample.data).toBeDefined();
    expect(createdSample.data.createSample.name).toEqual(
      createSampleInput.name
    );
  });
});

describe("When updating sample item", () => {
  it(`should be updated`, async () => {
    const mutation = updateSample;
    const input = updateSampleInput;
    const variables = {
      id,
      input,
    };
    const updatedSample: any = await client.mutate({
      mutation,
      variables,
    });
    expect(updatedSample.data).toBeDefined();
    expect(updatedSample.data.updateSample.description).toEqual(
      updateSampleInput.description
    );
  });

  it(`should not update non-existent item `, async () => {
    const updateNotExistSample = async () => {
      const mutation = updateSample;
      const variables = { id: "NOTEXISTINGID", input: updateSampleInput };

      return await client.mutate({ mutation, variables });
    };

    expect(updateNotExistSample()).rejects.toThrow();
  });
});

describe("When getting sample item", () => {
  it(`should return item`, async () => {
    const query = sample;
    let variables = { id };

    const response: any = await client.query({
      query,
      variables,
    });

    expect(response.data).toBeDefined();
  });
});

describe("When getting samples", () => {
  it(`should return items`, async () => {
    const query = samples;
    let variables = {};

    const response: any = await client.query({
      query,
      variables,
    });

    expect(response.data).toBeDefined();
  });
});

describe("When removing sample item", () => {
  it(`should be removed`, async () => {
    const mutation = removeSample;
    const variables = {
      id,
    };
    const removedItem: any = await client.mutate({
      mutation,
      variables,
    });
    expect(removedItem.data).toBeDefined();
  });
});
