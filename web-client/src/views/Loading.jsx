import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

import spinner from '../images/spinner.svg';

export const Loading = connect(
  { submitting: state.submitting },
  ({ submitting }) => {
    return (
      submitting && (
        <div className="modal-screen progress-indicator" aria-live="assertive">
          <img src={spinner} className="spinner" alt="progress indicator" />
          <p>Loading</p>
        </div>
      )
    );
  },
);
