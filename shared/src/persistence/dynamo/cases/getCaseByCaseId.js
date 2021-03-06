const { stripWorkItems } = require('../../dynamo/helpers/stripWorkItems');
const { stripInternalKeys } = require('../../dynamo/helpers/stripInternalKeys');

const client = require('../../dynamodbClientService');
/**
 * getCaseByCaseId
 * @param caseId
 * @param applicationContext
 * @returns {*}
 */
exports.getCaseByCaseId = async ({ caseId, applicationContext }) => {
  const results = await client.get({
    applicationContext,
    Key: {
      pk: caseId,
      sk: '0',
    },
  });

  return stripWorkItems(
    stripInternalKeys(results),
    applicationContext.isAuthorizedForWorkItems(),
  );
};
