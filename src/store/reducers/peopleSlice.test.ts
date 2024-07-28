import { describe, it, expect } from 'vitest';
import peopleReducer, { setPeople, initialState } from './peopleSlice';
import { IPeople } from '../../models/IPeople';

describe('people slice', () => {
  const mockPeopleList: IPeople[] = [
    {
      url: '1',
      name: 'Person 1',
      height: '200',
      mass: '80',
    },
    {
      url: '2',
      name: 'Person 2',
      height: '180',
      mass: '60',
    },
  ];

  it('return the initial state', () => {
    expect(peopleReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handle setPeople', () => {
    const actual = peopleReducer(initialState, setPeople(mockPeopleList));
    expect(actual.people).toEqual(mockPeopleList);
  });
});
