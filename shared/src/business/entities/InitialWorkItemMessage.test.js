const { InitialWorkItemMessage } = require('./InitialWorkItemMessage');

describe('InitialWorkItemMessage', () => {
  describe('validation', () => {
    it('should have error messages for missing fields', () => {
      const message = new InitialWorkItemMessage({});
      expect(message.getFormattedValidationErrors().message).toEqual(
        'Message is required.',
      );
      expect(message.getFormattedValidationErrors().assigneeId).toEqual(
        'Recipient is required.',
      );
      expect(message.getFormattedValidationErrors().section).toEqual(
        'Section is required.',
      );
    });

    it('should be valid when all fields are present', () => {
      const message = new InitialWorkItemMessage({
        assigneeId: '6805d1ab-18d0-43ec-bafb-654e83405416',
        message: 'hello world',
        section: 'docket',
      });
      expect(message.getFormattedValidationErrors()).toEqual(null);
    });
  });
});
