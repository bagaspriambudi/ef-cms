import React from 'react';
import { connect } from '@cerebral/react';

/**
 * Footer
 */
export default connect(
  {},
  function Footer() {
    return (
      <footer className="usa-footer usa-footer-medium site" role="contentinfo">
        <div className="footer-section-bottom">
          <div className="usa-grid">&copy; 2018</div>
        </div>
      </footer>
    );
  },
);
