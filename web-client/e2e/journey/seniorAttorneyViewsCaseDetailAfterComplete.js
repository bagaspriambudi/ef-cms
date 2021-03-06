import { runCompute } from 'cerebral/test';
import { extractedPendingMessagesFromCaseDetail } from '../../src/presenter/computeds/extractPendingMessagesFromCaseDetail';

export default test => {
  return it('Senior Attorney views case detail', async () => {
    test.setState('caseDetail', {});
    await test.runSequence('gotoCaseDetailSequence', {
      docketNumber: test.docketNumber,
    });
    expect(test.getState('currentPage')).toEqual('CaseDetailInternal');
    const pendingMessages = runCompute(extractedPendingMessagesFromCaseDetail, {
      state: test.getState(),
    });
    const workItem = pendingMessages.find(
      item => item.workItemId === test.stipulatedDecisionWorkItemId,
    );
    expect(workItem).toBeUndefined();
  });
};
