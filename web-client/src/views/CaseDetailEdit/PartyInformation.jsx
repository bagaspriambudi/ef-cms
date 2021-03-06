import { sequences, state } from 'cerebral';

import { Contacts } from '../StartCase/Contacts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from '@cerebral/react';

export const PartyInformation = connect(
  {
    autoSaveCaseSequence: sequences.autoSaveCaseSequence,
    baseUrl: state.baseUrl,
    caseDetail: state.caseDetail,
    caseDetailEditHelper: state.caseDetailEditHelper,
    token: state.token,
    updateCasePartyTypeSequence: sequences.updateCasePartyTypeSequence,
    updateCaseValueSequence: sequences.updateCaseValueSequence,
  },
  ({
    autoSaveCaseSequence,
    baseUrl,
    caseDetail,
    caseDetailEditHelper,
    token,
    updateCasePartyTypeSequence,
    updateCaseValueSequence,
  }) => {
    return (
      <div className="blue-container document-detail-one-third">
        <div className="usa-form-group">
          <label htmlFor="party-type">Party Type</label>
          <select
            className="usa-input-inline"
            id="party-type"
            name="partyType"
            value={caseDetail.partyType}
            onChange={e => {
              updateCasePartyTypeSequence({
                key: e.target.name,
                value: e.target.value,
              });
              autoSaveCaseSequence();
            }}
          >
            {Object.keys(caseDetailEditHelper.partyTypes).map(partyType => (
              <option
                key={partyType}
                value={caseDetailEditHelper.partyTypes[partyType]}
              >
                {caseDetailEditHelper.partyTypes[partyType]}
              </option>
            ))}
          </select>
        </div>
        {caseDetailEditHelper.showOwnershipDisclosureStatement &&
          caseDetailEditHelper.ownershipDisclosureStatementDocumentId && (
            <React.Fragment>
              <div className="usa-form-group">
                <label htmlFor="ods-link">Ownership Disclosure Statement</label>
                <a
                  href={`${baseUrl}/documents/${
                    caseDetailEditHelper.ownershipDisclosureStatementDocumentId
                  }/documentDownloadUrl?token=${token}`}
                  aria-label="View PDF: Ownership Disclosure Statement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon="file-pdf" />
                  Ownership Disclosure Statement
                </a>
                <div className="order-checkbox">
                  <input
                    id="order-for-ods"
                    type="checkbox"
                    name="orderForOds"
                    checked={caseDetail.orderForOds}
                    onChange={e => {
                      updateCaseValueSequence({
                        key: e.target.name,
                        value: e.target.checked,
                      });
                      autoSaveCaseSequence();
                    }}
                  />
                  <label htmlFor="order-for-ods">
                    Order for Ownership Disclosure Statement
                  </label>
                </div>
              </div>
            </React.Fragment>
          )}
        <Contacts
          parentView="CaseDetail"
          bind="caseDetail"
          emailBind="caseDetail.contactPrimary"
          onChange="updateCaseValueSequence"
          onBlur="autoSaveCaseSequence"
          contactsHelper="caseDetailEditContactsHelper"
          showPrimaryContact={caseDetailEditHelper.showPrimaryContact}
          showSecondaryContact={caseDetailEditHelper.showSecondaryContact}
        />
      </div>
    );
  },
);
