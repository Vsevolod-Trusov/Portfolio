import { default as stringIsEquals } from './stringsIsEquals';

const INPUT_TEXT = 'Hello world';
const SECOND_TEXT = 'Vsevolod';

describe('test stringsIsEquals', () => {
  it('Expect true from equal two strings', () => {
    const isEqual = stringIsEquals(INPUT_TEXT, INPUT_TEXT);
    expect(isEqual).toEqual(true);
  });

  it('Expect false from equal two strings', () => {
    const isEqual = stringIsEquals(INPUT_TEXT, SECOND_TEXT);
    expect(isEqual).toEqual(false);
  });
});
