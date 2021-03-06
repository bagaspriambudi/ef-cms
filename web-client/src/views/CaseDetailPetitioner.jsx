import { connect } from '@cerebral/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sequences, state } from 'cerebral';
import React from 'react';

import { DocketRecord } from './DocketRecord';
import { ErrorNotification } from './ErrorNotification';
import { PartyInformation } from './PartyInformation';
import { SuccessNotification } from './SuccessNotification';

export const CaseDetailPetitioner = connect(
  {
    caseDetail: state.formattedCaseDetail,
    currentTab: state.currentTab,
    showDetails: state.paymentInfo.showDetails,
    togglePaymentDetailsSequence: sequences.togglePaymentDetailsSequence,
    updateCurrentTabSequence: sequences.updateCurrentTabSequence,
  },
  function CaseDetail({
    caseDetail,
    currentTab,
    showDetails,
    togglePaymentDetailsSequence,
    updateCurrentTabSequence,
  }) {
    return (
      <React.Fragment>
        <div className="usa-grid breadcrumb">
          <FontAwesomeIcon icon="caret-left" />
          <a href="/" id="queue-nav">
            Back to dashboard
          </a>
        </div>
        <section className="usa-section usa-grid">
          <h1 className="captioned" tabIndex="-1">
            Docket Number: {caseDetail.docketNumberWithSuffix}
          </h1>
          <p>{caseDetail.caseTitle}</p>
          <hr aria-hidden="true" />
          <SuccessNotification />
          <ErrorNotification />
          {!caseDetail.payGovId && (
            <div className="subsection">
              <h2>Action Required</h2>
              <ul className="usa-accordion">
                <li>
                  <button
                    className="usa-accordion-button"
                    aria-expanded={showDetails}
                    aria-controls="paymentInfo"
                    id="actions-button"
                    onClick={() => togglePaymentDetailsSequence()}
                  >
                    <span>
                      <FontAwesomeIcon
                        icon="flag"
                        className="action-flag"
                        size="sm"
                      />{' '}
                      Pay $60.00 filing fee.
                    </span>
                  </button>
                  {showDetails && (
                    <div
                      id="paymentInfo"
                      className="usa-accordion-content usa-grid-full"
                      aria-hidden="false"
                    >
                      <div className="usa-width-one-half">
                        <h3>Pay by debit card/credit card.</h3>
                        <p>Copy your docket number(s) and pay online.</p>
                        <div id="paygov-link-container">
                          <a
                            className="usa-button"
                            href="https://pay.gov/public/form/start/60485840"
                            aria-label="pay.gov u.s. tax court filing fees"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Pay now
                          </a>
                        </div>
                        <p>
                          <i>
                            Note: it may take up to X days for your payment to
                            appear online.
                          </i>
                        </p>
                      </div>
                      <div className="usa-width-one-half">
                        <h4>Canʼt afford to pay the fee?</h4>
                        <p>
                          You may be eligible for a filing fee waiver. File an
                          application to request a waiver.
                        </p>
                        <p>
                          <a
                            href="https://www.ustaxcourt.gov/forms/Application_for_Waiver_of_Filing_Fee.pdf"
                            aria-label="View download application pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download application
                          </a>
                        </p>
                        <h4>Mail in payment</h4>
                        <p>Make checks/money order payable to:</p>
                        <address>
                          Clerk, United States Tax Court
                          <br />
                          400 2nd St NW
                          <br />
                          Washington, DC 20217
                          <br />
                        </address>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          )}
          <nav className="horizontal-tabs subsection">
            <ul role="tabslist">
              <li
                role="presentation"
                className={currentTab == 'Docket Record' ? 'active' : ''}
              >
                <button
                  role="tab"
                  className="tab-link"
                  id="tab-docket-record"
                  aria-selected={currentTab === 'Docket Record'}
                  onClick={() =>
                    updateCurrentTabSequence({ value: 'Docket Record' })
                  }
                >
                  Docket Record
                </button>
              </li>
              <li className={currentTab == 'Case Information' ? 'active' : ''}>
                <button
                  role="tab"
                  className="tab-link"
                  id="tab-case-info"
                  aria-selected={currentTab === 'Case Information'}
                  onClick={() =>
                    updateCurrentTabSequence({ value: 'Case Information' })
                  }
                >
                  Case Information
                </button>
              </li>
            </ul>
          </nav>
          {currentTab == 'Case Information' && (
            <div className="tab-content" role="tabpanel">
              <PartyInformation />
            </div>
          )}
          {currentTab == 'Docket Record' && (
            <div className="tab-content" role="tabpanel">
              <DocketRecord />
            </div>
          )}
        </section>
      </React.Fragment>
    );
  },
);
