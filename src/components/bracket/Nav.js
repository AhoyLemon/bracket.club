import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Glyphicon, Button, ButtonToolbar, ButtonGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';

export default class BracketNav extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onGenerate: PropTypes.func,
    onReset: PropTypes.func,
    onNavigate: PropTypes.func.isRequired
  };

  getForwardButton() {
    const {navigation, onGenerate, onReset, onNavigate} = this.props;
    const {canGoForward} = navigation;
    const canManipulate = onGenerate && onReset;

    const button = (
      <Button
        bsStyle={!canManipulate && canGoForward ? 'primary' : 'default'}
        disabled={!canGoForward}
        onClick={() => onNavigate('goToLast')}
      >
        <Glyphicon glyph='fast-forward' />
      </Button>
    );

    if (canManipulate || !canGoForward) {
      return button;
    }

    return (
      <OverlayTrigger
        placement='bottom'
        overlay={
          <Tooltip id='has-more-games'>
            Jump to the last game from this event.
          </Tooltip>
        }
      >
        {button}
      </OverlayTrigger>
    );
  }

  render() {
    const {navigation, onGenerate, onNavigate, onReset} = this.props;
    const {canGoBack, canGoForward, canReset} = navigation;
    const canManipulate = onGenerate && onReset;

    return (
      <ButtonToolbar className='bracket-nav'>
        <ButtonGroup>
          <Button bsStyle='default' disabled={!canGoBack} onClick={() => onNavigate('goToFirst')}>
            <Glyphicon glyph='fast-backward' />
          </Button>
          <Button bsStyle='default' disabled={!canGoBack} onClick={() => onNavigate('goToPrevious')}>
            <Glyphicon glyph='step-backward' />
          </Button>
          <Button bsStyle='default' disabled={!canGoForward} onClick={() => onNavigate('goToNext')}>
            <Glyphicon glyph='step-forward' />
          </Button>
          {this.getForwardButton()}
        </ButtonGroup>
        {canManipulate &&
          <ButtonGroup>
            <Button bsStyle='default' disabled={!canReset} onClick={() => onReset('reset')}>
              <Glyphicon glyph='ban-circle' />
            </Button>
            <Button bsStyle='default' onClick={() => onGenerate('lower')}>1</Button>
            <Button bsStyle='default' onClick={() => onGenerate('higher')}>16</Button>
            <Button bsStyle='default' onClick={() => onGenerate('random')}>
              <Glyphicon glyph='random' />
            </Button>
          </ButtonGroup>
        }
      </ButtonToolbar>
    );
  }
}
