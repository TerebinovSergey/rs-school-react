import { describe, it, expect } from 'vitest';
import personReducer, {
  setPerson,
  initialState,
  removePerson,
} from './personSlice';
import { IPerson } from '../../models/IPerson';

describe('person slice', () => {
  const mockPeople: IPerson = {
    url: '1',
    name: 'Person 1',
    height: '200',
    mass: '80',
    hair_color: 'red',
    skin_color: 'white',
    eye_color: 'green',
    birth_year: '',
    gender: '',
  };

  it('return the initial state', () => {
    expect(personReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handle setPerson', () => {
    const actual = personReducer(initialState, setPerson(mockPeople));
    expect(actual.person).toEqual(mockPeople);
  });

  it('handle removePerson', () => {
    let actual = personReducer(initialState, setPerson(mockPeople));
    actual = personReducer(actual, removePerson());
    expect(actual).toEqual(initialState);
  });
});
