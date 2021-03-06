const {
  joiValidationDecorator,
} = require('../../utilities/JoiValidationDecorator');
const joi = require('joi-browser');

/**
 *
 * @param rawPetition
 * @constructor
 */
function PetitionWithoutFiles(rawPetition) {
  Object.assign(this, rawPetition, {
    irsNoticeDate: rawPetition.irsNoticeDate
      ? new Date(rawPetition.irsNoticeDate).toISOString()
      : undefined,
  });
}

joiValidationDecorator(
  PetitionWithoutFiles,
  joi.object().keys({
    caseType: joi.string().required(),
    filingType: joi.string().required(),
    irsNoticeDate: joi
      .date()
      .max('now')
      .iso()
      .optional(),
    preferredTrialCity: joi.string().required(),
    procedureType: joi.string().required(),
  }),
);

module.exports = PetitionWithoutFiles;
