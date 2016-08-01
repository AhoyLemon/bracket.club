/* global __GA__ */

import {eventId} from '../selectors/event';

const {hostname} = window.location;
const noop = () => void 0;
let analytics = {pageview: noop, event: noop};

if (process.env.NODE_ENV === 'production' && hostname === 'tweetyourbracket.com') {
  const ga = require('react-ga');

  ga.initialize(__GA__);
  analytics = ga;
}

export const pageview = ({pathname, search}) => analytics.pageview(pathname + search);
export const event = ({state, event: e, category, action, labels = [], label = ''}) => {
  const id = (e && e.id) || eventId(Array.isArray(state) ? state[0] : state);
  const displayLabel = label || (Array.isArray(labels) ? labels.join('|') : labels);
  analytics.event({
    category,
    action,
    label: `${id}${displayLabel ? `|${displayLabel}` : ''}`
  });
};
