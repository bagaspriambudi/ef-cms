import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

export class ModalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.modal = {};
    this.preventCancelOnBlur = !!this.props.preventCancelOnBlur;
    this.blurDialog = this.blurDialog.bind(this);
    this.keydownTriggered = this.keydownTriggered.bind(this);
    this.runCancelSequence = this.runCancelSequence.bind(this);
    this.runConfirmSequence = this.runConfirmSequence.bind(this);
  }
  toggleNoScroll(scrollingOn) {
    if (scrollingOn) {
      document.body.classList.add('no-scroll');
      document.addEventListener('touchmove', this.touchmoveTriggered, {
        passive: false,
      });
    } else {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('touchmove', this.touchmoveTriggered, {
        passive: false,
      });
    }
  }

  runCancelSequence(event) {
    event.stopPropagation();
    this.props.cancelSequence.call();
  }
  runConfirmSequence(event) {
    event.stopPropagation();
    this.props.confirmSequence.call();
  }
  keydownTriggered(event) {
    if (event.keyCode === 27) {
      return this.blurDialog(event);
    }
  }
  touchmoveTriggered(event) {
    return event.preventDefault();
  }
  blurDialog(event) {
    if (this.preventCancelOnBlur) {
      return false;
    }
    return this.runCancelSequence(event);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keydownTriggered, false);
    this.toggleNoScroll(true);
    this.focusModal();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownTriggered, false);

    this.toggleNoScroll(false);
  }

  focusModal() {
    const modalHeader = document.querySelector('.modal-header .title');
    modalHeader.focus();
  }

  render() {
    const { modal } = this;
    return (
      <div className="modal-screen" onClick={this.blurDialog}>
        <div
          className={`modal-dialog ${modal.classNames}`}
          data-aria-live="assertive"
          aria-modal="true"
          role="dialog"
          onClick={event => event.stopPropagation()}
        >
          <div className="modal-header">
            <button
              type="button"
              className="modal-close-button text-style"
              onClick={this.runCancelSequence}
            >
              Close <FontAwesomeIcon icon="times-circle" />
            </button>
            <h3 tabIndex="-1" className="title">
              {modal.title}
            </h3>
          </div>
          {modal.message && <p>{modal.message}</p>}
          {this.renderBody && this.renderBody()}
          <div className="button-container">
            <button
              type="button"
              onClick={this.runConfirmSequence}
              className="usa-button"
            >
              {modal.confirmLabel}
            </button>
            <button
              type="button"
              onClick={this.runCancelSequence}
              className="usa-button-secondary"
            >
              {modal.cancelLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  cancelSequence: PropTypes.func,
  confirmSequence: PropTypes.func,
  modal: PropTypes.object,
  preventCancelOnBlur: PropTypes.bool,
};
