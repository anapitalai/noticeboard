import { SortByCreateDatePipe } from './sort-by-create-date.pipe';

describe('SortByCreateDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortByCreateDatePipe();
    expect(pipe).toBeTruthy();
  });
});
