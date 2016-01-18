'use strict';

import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {chunk, has, flatten, compact} from 'lodash';
import {Row, Col, Alert} from 'react-bootstrap';

class Team extends Component {
  static propTypes = {
    onUpdate: PropTypes.func,
    eliminated: PropTypes.bool,
    correct: PropTypes.bool,
    shouldBe: PropTypes.object,
    fromRegion: PropTypes.string,
    seed: PropTypes.number,
    name: PropTypes.string
  };

  handleClick = () => {
    const {onUpdate, fromRegion, seed, name} = this.props;

    if (!onUpdate) return;

    if (fromRegion && seed && name) {
      onUpdate({
        fromRegion,
        winner: {seed, name}
      });
    }
  };

  render() {
    const aClasses = classNames({
      pickable: this.props.onUpdate,
      eliminated: this.props.eliminated,
      correct: this.props.correct === true,
      incorrect: this.props.correct === false
    });
    const shouldBe = this.props.shouldBe;
    const shouldBeClasses = classNames({hide: !shouldBe});
    const {fromRegion, seed, name} = this.props;
    return (
      <li>
        <a
          onClick={this.handleClick}
          className={`team ${aClasses}`}
          data-region={fromRegion}
          data-seed={seed}
          data-name={name}
          data-id={fromRegion + seed}
        >
          <span className='seed'>{seed}</span>
          <span className='team-name'>{name}</span>
          <span className={`should-be ${shouldBeClasses}`}>
            <span className='seed'>{shouldBe ? shouldBe.seed : ''}</span>
            <span className='team-name'>{shouldBe ? shouldBe.name : ''}</span>
          </span>
        </a>
      </li>
    );
  }
}

class Matchup extends Component {
  static propTypes = {
    matchup: PropTypes.array,
    fromRegion: PropTypes.string,
    onUpdate: PropTypes.func
  };

  render() {
    let {fromRegion} = this.props;
    const {matchup, onUpdate} = this.props;
    const hasMatchup = has(matchup, '1');

    // The last team in each region is actually the final
    // so we update the fromRegion so it works with the updateGame action
    if (!hasMatchup) {
      fromRegion = 'FF';
    }

    return (
      <ul className='matchup'>
        <Team
          {...matchup[0]}
          fromRegion={fromRegion}
          onUpdate={onUpdate}
        />
        {hasMatchup &&
          <Team
            {...matchup[1]}
            fromRegion={fromRegion}
            onUpdate={onUpdate}
          />
        }
      </ul>
    );
  }
}

class Region extends Component {
  static defaultProps = {
    name: '',
    rounds: []
  };

  static propTypes = {
    'final': PropTypes.bool,
    name: PropTypes.string.isRequired,
    rounds: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    onUpdate: PropTypes.func
  };

  render() {
    const {final, name, id, onUpdate, rounds} = this.props;

    const classes = classNames({
      'final-region': final,
      'initial-region': !final
    });

    let unpicked = '';

    if (onUpdate) {
      const games = flatten(rounds.slice(1));
      const totalGames = games.length;
      const picked = compact(games).length;
      unpicked = ` (${picked}/${totalGames})`;
    }

    return (
      <section className={`region ${classes}`} data-id={id}>
        <h2 className='region-name'>{name + unpicked}</h2>
        <div className='rounds'>
          <div className='rounds-scroll'>
            {rounds.map((round, roundIndex) =>
              <div key={roundIndex} className='round'>
                {chunk(round, 2).map((matchup, matchupIndex) =>
                  <Matchup
                    key={matchupIndex}
                    fromRegion={id}
                    matchup={matchup}
                    onUpdate={onUpdate}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default class Bracket extends Component {
  static defaultProps = {
    bracket: {}
  };

  static propTypes = {
    bracket: PropTypes.object.isRequired,
    onUpdate: PropTypes.func
  };

  render() {
    const {bracket, onUpdate} = this.props;
    const common = {onUpdate};
    const borders = (<div className='final-round-borders' />);

    if (bracket instanceof Error) {
      return (
        <Alert bsStyle='danger'>
          <h4>Whoa, something about that bracket doesn't look right!</h4>
          <p>Could be that <strong>{bracket.message.toLowerCase().replace('.', '')}</strong>?</p>
        </Alert>
      );
    }

    return (
      <Row className='bracket'>
        <Col md={6} className='region-side left-side'>
          <Region {...bracket.region1} {...common} />
          {borders}
          <Region {...bracket.region2} {...common} />
          {borders}
        </Col>

        <Col md={6} className='region-side right-side'>
          <Region {...bracket.region3} {...common} />
          {borders}
          <Region {...bracket.region4} {...common} />
          {borders}
        </Col>

        <Col md={12} className='final-region-container'>
          <Region {...bracket.regionFinal} {...common} final />
        </Col>
      </Row>
    );
  }
}