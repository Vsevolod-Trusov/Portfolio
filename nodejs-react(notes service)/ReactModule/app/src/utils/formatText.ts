import { ZERO_VALUE } from './constants';

const sliceText = (text: string, slicePosition: number) =>
  text.slice(ZERO_VALUE, slicePosition);

export default sliceText;
