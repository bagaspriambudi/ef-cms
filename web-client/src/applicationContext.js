import {
  BUSINESS_TYPES,
  COUNTRY_TYPES,
  ESTATE_TYPES,
  OTHER_TYPES,
  PARTY_TYPES,
} from '../../shared/src/business/entities/contacts/PetitionContact';

import { CASE_CAPTION_POSTFIX } from '../../shared/src/business/entities/Case';
import { SECTIONS } from '../../shared/src/business/entities/WorkQueue';

import ErrorFactory from './presenter/errors/ErrorFactory';
import ForwardMessage from '../../shared/src/business/entities/ForwardMessage';
import { InitialWorkItemMessage } from '../../shared/src/business/entities/InitialWorkItemMessage';
import Petition from '../../shared/src/business/entities/Petition';
import { TRIAL_CITIES } from '../../shared/src/business/entities/TrialCities';
import { assignWorkItems } from '../../shared/src/proxies/workitems/assignWorkItemsProxy';
import axios from 'axios';
import { createCase } from '../../shared/src/proxies/createCaseProxy';
import { createDocument } from '../../shared/src/proxies/documents/createDocumentProxy';
import decorateWithTryCatch from './tryCatchDecorator';
import { downloadDocumentFile } from '../../shared/src/business/useCases/downloadDocumentFileInteractor';
import { filePetition } from '../../shared/src/business/useCases/filePetitionInteractor';
import { fileRespondentDocument } from '../../shared/src/business/useCases/respondent/fileRespondentDocumentInteractor';
import { forwardWorkItem } from '../../shared/src/proxies/workitems/forwardWorkItemProxy';
import { getCase } from '../../shared/src/proxies/getCaseProxy';
import { getCaseTypes } from '../../shared/src/business/useCases/getCaseTypesInteractor';
import { getCasesByStatus } from '../../shared/src/proxies/getCasesByStatusProxy';
import { getCasesByUser } from '../../shared/src/proxies/getCasesByUserProxy';
import { getCasesForRespondent } from '../../shared/src/proxies/respondent/getCasesForRespondentProxy';
import { getFilingTypes } from '../../shared/src/business/useCases/getFilingTypesInteractor';
import { getInternalUsers } from '../../shared/src/proxies/users/getInternalUsesProxy';
import { getProcedureTypes } from '../../shared/src/business/useCases/getProcedureTypesInteractor';
import { getSentWorkItemsForSection } from '../../shared/src/proxies/workitems/getSentWorkItemsForSectionProxy';
import { getSentWorkItemsForUser } from '../../shared/src/proxies/workitems/getSentWorkItemsForUserProxy';
import { getUser } from '../../shared/src/business/useCases/getUserInteractor';
import { getUsersInSection } from '../../shared/src/proxies/users/getUsersInSectionProxy';
import { createWorkItem } from '../../shared/src/proxies/workitems/createWorkItemProxy';
import { getWorkItem } from '../../shared/src/proxies/workitems/getWorkItemProxy';
import { getWorkItemsBySection } from '../../shared/src/proxies/workitems/getWorkItemsBySectionProxy';
import { getWorkItemsForUser } from '../../shared/src/proxies/workitems/getWorkItemsForUserProxy';
import { recallPetitionFromIRSHoldingQueue } from '../../shared/src/proxies/recallPetitionFromIRSHoldingQueueProxy';
import { sendPetitionToIRSHoldingQueue } from '../../shared/src/proxies/sendPetitionToIRSHoldingQueueProxy';
import { updateCase } from '../../shared/src/proxies/updateCaseProxy';
import { runBatchProcess } from '../../shared/src/proxies/runBatchProcessProxy';
import { completeWorkItem } from '../../shared/src/proxies/workitems/completeWorkItemProxy';
import { updateWorkItem } from '../../shared/src/proxies/workitems/updateWorkItemProxy';
import uuidv4 from 'uuid/v4';
import { validateCaseDetail } from '../../shared/src/business/useCases/validateCaseDetailInteractor';
import { validateForwardMessage } from '../../shared/src/business/useCases/workitems/validateForwardMessageInteractor';
import { validateInitialWorkItemMessage } from '../../shared/src/business/useCases/workitems/validateInitialWorkItemMessageInteractor';
import { validatePetition } from '../../shared/src/business/useCases/validatePetitionInteractor';

const { uploadPdf } = require('../../shared/src/persistence/s3/uploadPdf');
const { getDocument } = require('../../shared/src/persistence/s3/getDocument');

const {
  uploadDocument,
} = require('../../shared/src/persistence/s3/uploadDocument');

let user;

const getCurrentUser = () => {
  return user;
};
const setCurrentUser = newUser => {
  user = newUser;
};

let token;
const getCurrentUserToken = () => {
  return token;
};
const setCurrentUserToken = newToken => {
  token = newToken;
};

const allUseCases = {
  assignWorkItems,
  completeWorkItem,
  createCase,
  createDocument,
  createWorkItem,
  downloadDocumentFile,
  filePetition,
  fileRespondentDocument,
  forwardWorkItem,
  getCase,
  getCasesByStatus,
  getCasesByUser,
  getCasesForRespondent,
  getCaseTypes,
  getFilingTypes,
  getInternalUsers,
  getProcedureTypes,
  getSentWorkItemsForSection,
  getSentWorkItemsForUser,
  getUser,
  getUsersInSection,
  getWorkItem,
  getWorkItemsBySection,
  getWorkItemsForUser,
  recallPetitionFromIRSHoldingQueue,
  runBatchProcess,
  sendPetitionToIRSHoldingQueue,
  updateCase,
  updateWorkItem,
  validateCaseDetail,
  validateForwardMessage,
  validateInitialWorkItemMessage,
  validatePetition,
};
decorateWithTryCatch(allUseCases);

const applicationContext = {
  getBaseUrl: () => {
    return process.env.API_URL || 'http://localhost:3000/v1';
  },
  getCognitoLoginUrl: () => {
    if (process.env.COGNITO) {
      return 'https://auth-dev-flexion-efcms.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=6tu6j1stv5ugcut7dqsqdurn8q&redirect_uri=http%3A//localhost:1234/log-in';
    } else {
      return (
        process.env.COGNITO_LOGIN_URL ||
        'http://localhost:1234/mock-login?redirect_uri=http%3A//localhost%3A1234/log-in'
      );
    }
  },
  getConstants: () => ({
    BUSINESS_TYPES,
    CASE_CAPTION_POSTFIX,
    COUNTRY_TYPES,
    ESTATE_TYPES,
    OTHER_TYPES,
    PARTY_TYPES,
    SECTIONS,
    TRIAL_CITIES,
  }),
  getCurrentUser,
  getCurrentUserToken,
  getEntityConstructors: () => ({
    ForwardMessage,
    InitialWorkItemMessage,
    Petition,
  }),
  getError: e => {
    return ErrorFactory.getError(e);
  },
  getHttpClient: () => axios,
  getPersistenceGateway: () => {
    return {
      getDocument,
      saveCase: updateCase,
      uploadDocument,
      uploadPdf,
    };
  },
  getUniqueId: () => {
    return uuidv4();
  },
  getUseCases: () => allUseCases,
  setCurrentUser,
  setCurrentUserToken,
};

export default applicationContext;
