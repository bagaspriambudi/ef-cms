import _ from 'lodash';
import { formatWorkItem } from './formattedWorkQueue';
import { state } from 'cerebral';

export const extractedPendingMessagesFromCaseDetail = get => {
  const documents = get(state.caseDetail).documents || [];
  let workQueue = documents
    .reduce((acc, document) => [...acc, ...(document.workItems || [])], [])
    .filter(items => !items.completedAt)
    .map(workItem => formatWorkItem(workItem, []));
  workQueue = _.orderBy(workQueue, 'currentMessage.createdAt', 'desc');
  return workQueue;
};
