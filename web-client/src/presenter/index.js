import { ActionError } from './errors/ActionError';
import { InvalidRequestError } from './errors/InvalidRequestError';
import { NotFoundError } from './errors/NotFoundError';
import { ServerInvalidResponseError } from './errors/ServerInvalidResponseError';
import { UnauthorizedRequestError } from './errors/UnauthorizedRequestError';
import { UnidentifiedUserError } from './errors/UnidentifiedUserError';
import { appendNewYearAmountSequence } from './sequences/appendNewYearAmountSequence';
import { assignSelectedWorkItemsSequence } from './sequences/assignSelectedWorkItemsSequence';
import { autoSaveCaseSequence } from './sequences/autoSaveCaseSequence';
import { cerebralBindSimpleSetStateSequence } from './sequences/cerebralBindSimpleSetStateSequence';
import { chooseWorkQueueSequence } from './sequences/chooseWorkQueueSequence';
import { clearDocumentSequence } from './sequences/clearDocumentSequence';
import { clearPreferredTrialCitySequence } from './sequences/clearPreferredTrialCitySequence';
import { clickServeToIrsSequence } from './sequences/clickServeToIrsSequence';
import { createWorkItemSequence } from './sequences/createWorkItemSequence';
import { dismissAlertSequence } from './sequences/dismissAlertSequence';
import { dismissCaseCaptionModalSequence } from './sequences/dismissCaseCaptionModalSequence';
import { dismissCreateMessageModalSequence } from './sequences/dismissCreateMessageModalSequence';
import { dismissModalSequence } from './sequences/dismissModalSequence';
import { getUsersInSectionSequence } from './sequences/getUsersInSectionSequence';
import { gotoBeforeStartCaseSequence } from './sequences/gotoBeforeStartCaseSequence';
import { gotoCaseDetailSequence } from './sequences/gotoCaseDetailSequence';
import { gotoDashboardSequence } from './sequences/gotoDashboardSequence';
import { gotoDocumentDetailSequence } from './sequences/gotoDocumentDetailSequence';
import { gotoLoginSequence } from './sequences/gotoLoginSequence';
import { gotoStartCaseSequence } from './sequences/gotoStartCaseSequence';
import { gotoStyleGuideSequence } from './sequences/gotoStyleGuideSequence';
import { loginWithTokenSequence } from './sequences/loginWithTokenSequence';
import { notFoundErrorSequence } from './sequences/notFoundErrorSequence';
import { openCaseCaptionModalSequence } from './sequences/openCaseCaptionModalSequence';
import { openCreateMessageModalSequence } from './sequences/openCreateMessageModalSequence';
import { removeYearAmountSequence } from './sequences/removeYearAmountSequence';
import { selectAssigneeSequence } from './sequences/selectAssigneeSequence';
import { selectWorkItemSequence } from './sequences/selectWorkItemSequence';
import { setCaseCaptionSequence } from './sequences/setCaseCaptionSequence';
import { setCurrentPageErrorSequence } from './sequences/setCurrentPageErrorSequence';
import { setFocusedWorkItemSequence } from './sequences/setFocusedWorkItemSequence';
import { setIrsNoticeFalseSequence } from './sequences/setIrsNoticeFalseSequence';
import { setModalDialogNameSequence } from './sequences/setModalDialogNameSequence';
import { setWorkItemActionSequence } from './sequences/setWorkItemActionSequence';
import { signOutSequence } from './sequences/signOutSequence';
import { startACaseConfirmCancelSequence } from './sequences/startACaseConfirmCancelSequence';
import { startACaseToggleCancelSequence } from './sequences/startACaseToggleCancelSequence';
import { runBatchProcessSequence } from './sequences/runBatchProcessSequence';
import state from './state';
import { submitCaseDetailEditSaveSequence } from './sequences/submitCaseDetailEditSaveSequence';
import { submitCompleteSequence } from './sequences/submitCompleteSequence';
import { submitDocumentSequence } from './sequences/submitDocumentSequence';
import { submitFilePetitionSequence } from './sequences/submitFilePetitionSequence';
import { submitForwardSequence } from './sequences/submitForwardSequence';
import { submitLoginSequence } from './sequences/submitLoginSequence';
import { submitPetitionToIRSHoldingQueueSequence } from './sequences/submitPetitionToIRSHoldingQueueSequence';
import { submitRecallPetitionFromIRSHoldingQueueSequence } from './sequences/submitRecallPetitionFromIRSHoldingQueueSequence';
import { submitSearchSequence } from './sequences/submitSearchSequence';
import { submitUpdateCaseSequence } from './sequences/submitUpdateCaseSequence';
import { toggleCaseDifferenceSequence } from './sequences/toggleCaseDifferenceSequence';
import { toggleMobileMenuSequence } from './sequences/toggleMobileMenuSequence';
import { togglePaymentDetailsSequence } from './sequences/togglePaymentDetailsSequence';
import { toggleUsaBannerDetailsSequence } from './sequences/toggleUsaBannerDetailsSequence';
import { unauthorizedErrorSequence } from './sequences/unauthorizedErrorSequence';
import { unidentifiedUserErrorSequence } from './sequences/unidentifiedUserErrorSequence';
import { unsetFormSaveSuccessSequence } from './sequences/unsetFormSaveSuccessSequence';
import { updateCaseDetailSequence } from './sequences/updateCaseDetailSequence';
import { updateCasePartyTypeSequence } from './sequences/updateCasePartyTypeSequence';
import { updateCaseValueByIndexSequence } from './sequences/updateCaseValueByIndexSequence';
import { updateCaseValueSequence } from './sequences/updateCaseValueSequence';
import { updateCompleteFormValueSequence } from './sequences/updateCompleteFormValueSequence';
import { updateCurrentTabSequence } from './sequences/updateCurrentTabSequence';
import { updateDocumentValueSequence } from './sequences/updateDocumentValueSequence';
import { updateFormValueSequence } from './sequences/updateFormValueSequence';
import { updateForwardFormValueSequence } from './sequences/updateForwardFormValueSequence';
import { updateHasIrsNoticeFormValueSequence } from './sequences/updateHasIrsNoticeFormValueSequence';
import { updatePetitionValueSequence } from './sequences/updatePetitionValueSequence';
import { updateSearchTermSequence } from './sequences/updateSearchTermSequence';
import { updateStartCaseFormValueSequence } from './sequences/updateStartCaseFormValueSequence';
import { validateCaseDetailSequence } from './sequences/validateCaseDetailSequence';
import { validateInitialWorkItemMessageSequence } from './sequences/validateInitialWorkItemMessageSequence';
import { validateStartCaseSequence } from './sequences/validateStartCaseSequence';
import { viewDocumentSequence } from './sequences/viewDocumentSequence';

/**
 * Main Cerebral module
 */
export default {
  catch: [
    // ORDER MATTERS! Based on inheritance, the first match will be used
    [InvalidRequestError, setCurrentPageErrorSequence], // 418, other unknown 4xx series
    [ServerInvalidResponseError, setCurrentPageErrorSequence], // 501, 503, etc
    [UnauthorizedRequestError, unauthorizedErrorSequence], // 403
    [NotFoundError, notFoundErrorSequence], //404
    [UnidentifiedUserError, unidentifiedUserErrorSequence], //401
    [ActionError, setCurrentPageErrorSequence], // generic error handler
  ],
  providers: {},
  sequences: {
    appendNewYearAmountSequence,
    assignSelectedWorkItemsSequence,
    autoSaveCaseSequence,
    cerebralBindSimpleSetStateSequence,
    chooseWorkQueueSequence,
    clearDocumentSequence,
    clearPreferredTrialCitySequence,
    clickServeToIrsSequence,
    createWorkItemSequence,
    dismissAlertSequence,
    dismissCaseCaptionModalSequence,
    dismissCreateMessageModalSequence,
    dismissModalSequence,
    getUsersInSectionSequence,
    gotoBeforeStartCaseSequence,
    gotoCaseDetailSequence,
    gotoDashboardSequence,
    gotoDocumentDetailSequence,
    gotoLoginSequence,
    gotoStartCaseSequence,
    gotoStyleGuideSequence,
    loginWithTokenSequence,
    openCaseCaptionModalSequence,
    openCreateMessageModalSequence,
    removeYearAmountSequence,
    runBatchProcessSequence,
    selectAssigneeSequence,
    selectWorkItemSequence,
    setCaseCaptionSequence,
    setFocusedWorkItemSequence,
    setIrsNoticeFalseSequence,
    setModalDialogNameSequence,
    setWorkItemActionSequence,
    signOutSequence,
    startACaseConfirmCancelSequence,
    startACaseToggleCancelSequence,
    submitCaseDetailEditSaveSequence,
    submitCompleteSequence,
    submitDocumentSequence,
    submitFilePetitionSequence,
    submitForwardSequence,
    submitLoginSequence,
    submitPetitionToIRSHoldingQueueSequence,
    submitRecallPetitionFromIRSHoldingQueueSequence,
    submitSearchSequence,
    submitUpdateCaseSequence,
    toggleCaseDifferenceSequence,
    toggleMobileMenuSequence,
    togglePaymentDetailsSequence,
    toggleUsaBannerDetailsSequence,
    unauthorizedErrorSequence,
    unidentifiedUserErrorSequence,
    unsetFormSaveSuccessSequence,
    updateCaseDetailSequence,
    updateCasePartyTypeSequence,
    updateCaseValueByIndexSequence,
    updateCaseValueSequence,
    updateCompleteFormValueSequence,
    updateCurrentTabSequence,
    updateDocumentValueSequence,
    updateFormValueSequence,
    updateForwardFormValueSequence,
    updateHasIrsNoticeFormValueSequence,
    updatePetitionValueSequence,
    updateSearchTermSequence,
    updateStartCaseFormValueSequence,
    validateCaseDetailSequence,
    validateInitialWorkItemMessageSequence,
    validateStartCaseSequence,
    viewDocumentSequence,
  },
  state,
};
