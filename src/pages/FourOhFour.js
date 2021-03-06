import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Page from '../components/layout/Page';

export default class FourOhFourPage extends Component {
  render() {
    return (
      <Page>
        <h2>Page not found</h2>
        <p>Whoops, something went wrong, which is totally my bad.</p>
        <p>
          Not sure exactly how this happened, but you’re best bet would be to head back to the <Link to='/'>home page</Link>. That’s where most of the cool stuff is.
        </p>
      </Page>
    );
  }
}
