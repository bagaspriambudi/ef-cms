import { state } from 'cerebral';

/**
 * Used for uploading a respondent related document (Answer, StipulatedDecision).
 * Gets the selected documentType, file, and user from state and invokes the fileRespondentDocument use case
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.applicationContext the application context used for getting the fileRespondentDocument use case
 * @param {Function} providers.get the cerebral get function used for getting caseDetail, document, user
 */
export const fileRespondentDocumentAction = async ({
  applicationContext,
  get,
}) => {
  const caseToUpdate = get(state.caseDetail);

  const documentType = get(state.document.documentType);

  const user = get(state.user);

  await applicationContext.getUseCases().fileRespondentDocument({
    applicationContext,
    caseToUpdate,
    document: get(state.document.file),
    documentType,
    userId: user.token,
  });

  return {
    alertSuccess: {
      message: 'Your document has been filed.',
      title: `Your ${documentType} was uploaded successfully.`,
    },
    docketNumber: caseToUpdate.docketNumber,
  };
};
