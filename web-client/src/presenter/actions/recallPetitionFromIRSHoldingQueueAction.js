import { state } from 'cerebral';

/**
 * recalls the case from the IRS holding queue via the id set in state.caseDetail.caseId
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.applicationContext the application context used for getting the recallPetitionFromIRSHoldingQueue use case
 * @param {Function} providers.get the cerebral function used for getting the state.caseDetail.caseId
 * @param {Object} providers.props the cerebral props object which is needed for setting the props.docketNumber after recalling a case
 * @returns {Object} the success alert
 */
export const recallPetitionFromIRSHoldingQueueAction = async ({
  applicationContext,
  get,
  props,
}) => {
  await applicationContext.getUseCases().recallPetitionFromIRSHoldingQueue({
    applicationContext,
    caseId: get(state.caseDetail).caseId,
  });
  props.docketNumber = get(state.caseDetail).docketNumber;
  return {
    alertSuccess: {
      message: 'It will need to be re-served to the IRS.',
      title: 'The petition is now recalled.',
    },
  };
};
