import { gql } from '@apollo/client';

export const EMPLOYEE_DOCUMENT = gql`
  query Employee($email: String!) {
    person(email: $email) {
      id
      name {
        title
        first
        last
      }
    }
  }
`;

export type EmployeeQuery = {
  person: {
    id?: number;
    name?: {
      title?: string;
      first?: string;
      last?: string;
    };
  };
};

export type EmployeeQueryVariables = {
  email: string;
};
