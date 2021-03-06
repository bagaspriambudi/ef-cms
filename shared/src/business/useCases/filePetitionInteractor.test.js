const { filePetition } = require('./filePetitionInteractor');
const sinon = require('sinon');

let uploadDocumentStub;
let createCaseStub;

describe('filePetition', () => {
  function createApplicationContext(options) {
    uploadDocumentStub = sinon
      .stub()
      .resolves('c54ba5a9-b37b-479d-9201-067ec6e335bb');

    createCaseStub = sinon.stub().resolves(null);

    return {
      getCurrentUser: () => ({
        role: 'petitioner',
        userId: 'taxpayer',
      }),
      getPersistenceGateway: () => ({
        uploadDocument: uploadDocumentStub,
      }),
      getUseCases: () => ({
        createCase: createCaseStub,
      }),
      environment: { stage: 'local' },
      ...options,
    };
  }

  it('throws an error when a null user tries to access the case', async () => {
    let error;
    try {
      await filePetition({
        applicationContext: createApplicationContext({
          getCurrentUser: () => ({
            userId: '',
          }),
        }),
        petitionFile: null,
        petitionMetadata: null,
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('throws an error when an unauthorized user tries to access the case', async () => {
    let error;
    try {
      await filePetition({
        applicationContext: createApplicationContext({
          getCurrentUser: () => ({
            role: 'respondent',
            userId: 'respondent',
          }),
        }),
        petitionFile: null,
        petitionMetadata: null,
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  it('calls upload on a Petition file', async () => {
    await filePetition({
      applicationContext: createApplicationContext(),
      petitionFile: 'this petition file',
      petitionMetadata: null,
    });
    expect(uploadDocumentStub.getCall(0).args[0].document).toEqual(
      'this petition file',
    );
  });

  it('calls upload on an ODS file', async () => {
    await filePetition({
      applicationContext: createApplicationContext(),
      ownershipDisclosureFile: 'this ods file',
    });
    expect(uploadDocumentStub.getCall(1).args[0].document).toEqual(
      'this ods file',
    );
  });

  it('calls upload on a STIN file', async () => {
    await filePetition({
      applicationContext: createApplicationContext(),
      stinFile: 'this stin file',
    });
    expect(uploadDocumentStub.getCall(1).args[0].document).toEqual(
      'this stin file',
    );
  });

  it('uploads a Petition file and a STIN file', async () => {
    await filePetition({
      applicationContext: createApplicationContext(),
      petitionFile: 'something1',
      petitionMetadata: 'something2',
      stinFile: 'something3',
    });
    expect(createCaseStub.getCall(0).args[0]).toMatchObject({
      ownershipDisclosureFileId: undefined,
      petitionFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      stinFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });
  });

  it('uploads an Ownership Disclosure Statement file', async () => {
    await filePetition({
      applicationContext: createApplicationContext(),
      ownershipDisclosureFile: 'something',
      petitionFile: 'something1',
      petitionMetadata: 'something2',
      stinFile: 'something3',
    });
    expect(createCaseStub.getCall(0).args[0]).toMatchObject({
      ownershipDisclosureFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      petitionFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
      stinFileId: 'c54ba5a9-b37b-479d-9201-067ec6e335bb',
    });
  });
});
