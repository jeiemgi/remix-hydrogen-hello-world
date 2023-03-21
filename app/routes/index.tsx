import {getServerState} from 'react-instantsearch-hooks-server';
import {
  Configure,
  InstantSearch,
  InstantSearchSSRProvider,
} from 'react-instantsearch-hooks';
import {Hits, SearchBox} from 'react-instantsearch-hooks-web';
import {searchClient} from '~/lib/search-client';
import {ALGOLIA_INDEX_NAME} from '~/lib/constants';
import type {LoaderFunction} from '@remix-run/router';
import {json} from '@remix-run/router';
import {useLoaderData} from '@remix-run/react';
import {renderToReadableStream} from 'react-dom/server';

export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url);
  const serverState = await getServerState(<Search url={url} />, {
    renderToString: (element) => renderToReadableStream(element),
  });

  return json({serverState, url});
};

function Index() {
  const {serverState, url} = useLoaderData();

  return (
    <div className={'max-w-screen-xl mx-auto h-screen'}>
      <h1>Algolia example</h1>
      <InstantSearchSSRProvider {...serverState}>
        <Search url={url} />
      </InstantSearchSSRProvider>
    </div>
  );
}

type SearchProps = {
  url: URL;
};

function Search({url}: SearchProps) {
  return (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      <Configure hitsPerPage={12} />
      <div className={'max-container mb-10 w-full py-20'}>
        <SearchBox />
      </div>
      <div className={'grid-container'}>
        <div className="col-span-3">FILTERS</div>
        <div className="col-span-9">
          <Hits />
        </div>
      </div>
    </InstantSearch>
  );
}

export default Index;
