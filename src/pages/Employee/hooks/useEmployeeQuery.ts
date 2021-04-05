import { useQuery, QueryHookOptions } from '@apollo/client';
import { EMPLOYEE_DOCUMENT, EmployeeQuery, EmployeeQueryVariables } from '../Employee.graphql';

export function useEmployeeQuery(options: QueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
  return useQuery<EmployeeQuery, EmployeeQueryVariables>(EMPLOYEE_DOCUMENT, options);
}
