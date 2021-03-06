import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Bracket from './Bracket';

export default class LiveBracket extends Component {
  static propTypes = {
    onUpdate: PropTypes.func,
    bracket: PropTypes.string,
    finalId: PropTypes.string,
    validate: PropTypes.func,
    bestOf: PropTypes.object
  };

  render() {
    const {
      bracket,
      validate,
      onUpdate,
      finalId,
      bestOf
    } = this.props;

    if (!bracket || !validate || !onUpdate) {
      return null;
    }

    return (
      <Bracket bracket={validate(bracket)} finalId={finalId} onUpdate={onUpdate} bestOf={bestOf} />
    );
  }
}
