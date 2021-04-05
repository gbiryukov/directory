import React, { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { DefaultOptions } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { createCache } from 'utils/client';

const MOCKED_CLIENT_OPTIONS: DefaultOptions = {
  watchQuery: {
    // Fixes apollo issue with incorrect mocks handling
    // https://github.com/apollographql/apollo-client/issues/7081
    fetchPolicy: 'no-cache',
  },
};

export function renderInAppContext(
  mocks: ReadonlyArray<MockedResponse>,
  element: ReactElement
): RenderResult {
  // create fresh empty cache for each test
  const cache = createCache();

  return render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} cache={cache} defaultOptions={MOCKED_CLIENT_OPTIONS}>
        {element}
      </MockedProvider>
    </MemoryRouter>
  );
}
