import { gql } from '@apollo/client';

export const EMPLOYEES_DOCUMENT = gql`
  query People {
    people {
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
  }
`;

export type Employee = {
  id?: number;
  name?: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture?: {
    thumbnail?: string;
    large?: string;
  };
};

export type PeopleQuery = {
  people: Employee[];
};
