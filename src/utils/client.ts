import { ApolloClient, InMemoryCache, ApolloCache, NormalizedCacheObject } from '@apollo/client';

type CacheShape = NormalizedCacheObject;

export function createCache(): ApolloCache<CacheShape> {
  return new InMemoryCache({
    typePolicies: {
      Person: {
        keyFields: ['email'],
      },
      Picture: {
        keyFields: ['large'],
      },
    },
  });
}

export function createClient(): ApolloClient<CacheShape> {
  return new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: createCache(),
  });
}
