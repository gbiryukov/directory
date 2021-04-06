import { gql } from '@apollo/client';

export const EMPLOYEE_DOCUMENT = gql`
  query Employee($email: String!) {
    person(email: $email) {
      name {
        title
        first
        last
      }
      email
      picture {
        large
      }
    }
  }
`;

export const EDIT_EMPLOYEE_DOCUMENT = gql`
  mutation EditEmployee($email: String!, $payload: EditPerson) {
    editPerson(email: $email, payload: $payload) {
      name {
        title
        first
        last
      }
      email
    }
  }
`;
