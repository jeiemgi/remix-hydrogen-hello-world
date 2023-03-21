import algoliasearch from 'algoliasearch/dist/algoliasearch-lite.esm.browser';
import {ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY} from '~/lib/constants';

export const searchClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY,
);
