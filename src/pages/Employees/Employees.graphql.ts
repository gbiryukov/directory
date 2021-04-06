import { gql } from '@apollo/client';

export const EMPLOYEES_DOCUMENT = gql`
  query Employees {
    people {
      ...EmployeesFields
    }
  }

  fragment EmployeesFields on Person {
    id
    name {
      title
      first
      last
    }
    email
    picture {
      thumbnail
      large
    }
  }
`;
