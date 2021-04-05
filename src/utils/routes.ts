import { compile } from 'path-to-regexp';

export const ROUTE = {
  root: '/',
  employees: '/',
  employee: '/employee/:id',
};

/**
 * Generates functions that allows to create route instances.
 * Uses the same library that react router internally use.
 */
function getFactoryForRoute<TParams extends { [key: string]: string | number }>(
  routeName: keyof typeof ROUTE
): (params: TParams) => string {
  return compile(ROUTE[routeName]);
}

export const ROUTE_HREF = {
  employee: getFactoryForRoute<{ id: string }>('employee'),
};
