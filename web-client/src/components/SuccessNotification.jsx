import React from 'react';
import { state } from 'cerebral';

import { connect } from '@cerebral/react';

export default connect(
  {
    alertSuccess: state.alertSuccess,
  },
  function SuccessNotification({ alertSuccess }) {
    return (
      <React.Fragment>
        {alertSuccess && (
          <div
            className="usa-alert usa-alert-success"
            aria-label="success"
            aria-live="polite"
            role="alert"
          >
            <div className="usa-alert-body">
              <h3 className="usa-alert-heading">Success Status</h3>
              <p className="usa-alert-text">{alertSuccess}</p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  },
);
