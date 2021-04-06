import { ApolloClient, InMemoryCache, ApolloCache, NormalizedCacheObject } from '@apollo/client';

type CacheShape = NormalizedCacheObject;

export function createCache(): ApolloCache<CacheShape> {
  return new InMemoryCache({
    typePolicies: {
      // following types have nothing in `id` field so tell apollo how to identify it
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
