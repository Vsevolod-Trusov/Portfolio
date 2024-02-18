import { default as formatDate } from './formatDate';

const TEST_DATE = '2023-12-12T23:00:00';

test('Expect sliced date string format: dd:mm:yyyy', () => {
  const date = formatDate(new Date(TEST_DATE));
  expect(date).toEqual('12.12.2023');
});
