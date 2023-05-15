import React from 'react';
import { useRecommendations } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';
import { Grid } from '@mui/material';
import { useHits } from 'react-instantsearch-hooks-web';

import { SearchHit } from '../../search/components';

const APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
const API_KEY = import.meta.env.VITE_ALGOLIA_API_KEY;
const INDEX_NAME = import.meta.env.VITE_ALGOLIA_INDEX;
const recommendClient = recommend(APP_ID, API_KEY);

const RelatedProducts = ({ currentObjectID }) => {
  const { sendEvent } = useHits();
  const { recommendations } = useRecommendations({
    model: 'related-products',
    recommendClient,
    indexName: INDEX_NAME,
    objectIDs: [currentObjectID]
  });

  console.log(recommendations);

  return (
    <Grid container spacing={2} >
      {recommendations?.map((product) => (
        <Grid item key={product.objectID} xs={12} sm={6} md={4} lg={3}>
          <SearchHit hit={product} sendEvent={sendEvent} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RelatedProducts;
