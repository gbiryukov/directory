import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EditPerson = {
  title?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Mutation = {
  editPerson: Person;
};

export type MutationEditPersonArgs = {
  email: Scalars['String'];
  payload?: Maybe<EditPerson>;
};

export type Name = {
  title?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
};

export type Person = {
  name?: Maybe<Name>;
  email?: Maybe<Scalars['String']>;
  picture?: Maybe<Picture>;
  id?: Maybe<Scalars['String']>;
};

export type Picture = {
  large?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type Query = {
  people?: Maybe<Array<Maybe<Person>>>;
  person?: Maybe<Person>;
};

export type QueryPersonArgs = {
  email: Scalars['String'];
};

export type EmployeeQueryVariables = Exact<{
  email: Scalars['String'];
}>;

export type EmployeeQuery = {
  person?: Maybe<
    Pick<Person, 'email'> & {
      name?: Maybe<Pick<Name, 'title' | 'first' | 'last'>>;
      picture?: Maybe<Pick<Picture, 'large'>>;
    }
  >;
};

export type EditEmployeeMutationVariables = Exact<{
  email: Scalars['String'];
  payload?: Maybe<EditPerson>;
}>;

export type EditEmployeeMutation = {
  editPerson: Pick<Person, 'email'> & { name?: Maybe<Pick<Name, 'title' | 'first' | 'last'>> };
};

export type EmployeesQueryVariables = Exact<{ [key: string]: never }>;

export type EmployeesQuery = { people?: Maybe<Array<Maybe<EmployeesFieldsFragment>>> };

export type EmployeesFieldsFragment = Pick<Person, 'id' | 'email'> & {
  name?: Maybe<Pick<Name, 'title' | 'first' | 'last'>>;
  picture?: Maybe<Pick<Picture, 'thumbnail' | 'large'>>;
};

export const EmployeesFieldsFragmentDoc: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EmployeesFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'name' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'picture' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'large' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const EmployeeDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Employee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'person' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'picture' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'large' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

/**
 * __useEmployeeQuery__
 *
 * To run a query within a React component, call `useEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEmployeeQuery(
  baseOptions: Apollo.QueryHookOptions<EmployeeQuery, EmployeeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, options);
}
export function useEmployeeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EmployeeQuery, EmployeeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, options);
}
export type EmployeeQueryHookResult = ReturnType<typeof useEmployeeQuery>;
export type EmployeeLazyQueryHookResult = ReturnType<typeof useEmployeeLazyQuery>;
export const EditEmployeeDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditEmployee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'payload' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditPerson' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editPerson' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'payload' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'payload' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
};

/**
 * __useEditEmployeeMutation__
 *
 * To run a mutation, you first call `useEditEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEmployeeMutation, { data, loading, error }] = useEditEmployeeMutation({
 *   variables: {
 *      email: // value for 'email'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useEditEmployeeMutation(
  baseOptions?: Apollo.MutationHookOptions<EditEmployeeMutation, EditEmployeeMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditEmployeeMutation, EditEmployeeMutationVariables>(
    EditEmployeeDocument,
    options
  );
}
export type EditEmployeeMutationHookResult = ReturnType<typeof useEditEmployeeMutation>;
export type EditEmployeeMutationOptions = Apollo.BaseMutationOptions<
  EditEmployeeMutation,
  EditEmployeeMutationVariables
>;
export const EmployeesDocument: DocumentNode = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Employees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'people' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'EmployeesFields' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EmployeesFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'name' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'picture' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                { kind: 'Field', name: { kind: 'Name', value: 'large' } },
              ],
            },
          },
        ],
      },
    },
  ],
};

/**
 * __useEmployeesQuery__
 *
 * To run a query within a React component, call `useEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmployeesQuery(
  baseOptions?: Apollo.QueryHookOptions<EmployeesQuery, EmployeesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EmployeesQuery, EmployeesQueryVariables>(EmployeesDocument, options);
}
export function useEmployeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EmployeesQuery, EmployeesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EmployeesQuery, EmployeesQueryVariables>(EmployeesDocument, options);
}
export type EmployeesQueryHookResult = ReturnType<typeof useEmployeesQuery>;
export type EmployeesLazyQueryHookResult = ReturnType<typeof useEmployeesLazyQuery>;
