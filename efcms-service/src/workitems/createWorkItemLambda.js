const {
  handle,
  getUserFromAuthHeader,
} = require('../middleware/apiGatewayHelper');
const createApplicationContext = require('../applicationContext');

/**
 * updates a work item
 *
 * @param {Object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.handler = event =>
  handle(event, () => {
    const user = getUserFromAuthHeader(event);
    const applicationContext = createApplicationContext(user);
    return applicationContext.getUseCases().createWorkItem({
      applicationContext,
      caseId: event.pathParameters.caseId,
      documentId: event.pathParameters.documentId,
      ...JSON.parse(event.body),
    });
  });
