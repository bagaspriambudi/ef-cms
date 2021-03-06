const {
  isAuthorized,
  WORKITEM,
} = require('../../../authorization/authorizationClientService');
const { UnauthorizedError } = require('../../../errors/errors');

/**
 *
 * @param section
 * @param applicationContext
 * @returns {Promise<*|*>}
 */
exports.getSentWorkItemsForSection = async ({
  section,
  applicationContext,
}) => {
  const user = applicationContext.getCurrentUser();

  if (!isAuthorized(user, WORKITEM)) {
    throw new UnauthorizedError(
      'Unauthorized for getting completed work items',
    );
  }

  const workItems = await applicationContext
    .getPersistenceGateway()
    .getSentWorkItemsForSection({
      applicationContext,
      section,
    });

  return workItems;
};
