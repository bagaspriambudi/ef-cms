const { getUser } = require('./getUserInteractor');

describe('Get user', () => {
  it('returns the same user passed in with section defined', async () => {
    const user = await getUser({
      role: 'docketclerk',
      userId: 'docketclerk',
    });
    expect(user).toEqual({
      role: 'docketclerk',
      section: 'docket',
      userId: 'docketclerk',
    });
  });
});
