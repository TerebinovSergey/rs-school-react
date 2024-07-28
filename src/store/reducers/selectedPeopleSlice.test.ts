import { describe, it, expect } from 'vitest';
import selectedPeopleReducer, {
  addPeople,
  initialState,
  removePeople,
  removeAllPeople,
} from './selectedPeopleSlice';
import { IPeople } from '../../models/IPeople';

describe('selectedPeople slice', () => {
  const person1: IPeople = {
    url: '1',
    name: 'Person 1',
    height: '200',
    mass: '80',
  };
  const person2: IPeople = {
    url: '2',
    name: 'Person 2',
    height: '180',
    mass: '60',
  };

  it('return the initial state', () => {
    expect(selectedPeopleReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('handle addPeople', () => {
    const actual = selectedPeopleReducer(initialState, addPeople(person1));
    expect(actual.selectedPeople).toEqual([person1]);
  });

  it('handle removePeople', () => {
    let state = selectedPeopleReducer(initialState, addPeople(person1));
    state = selectedPeopleReducer(state, addPeople(person2));
    state = selectedPeopleReducer(state, removePeople(person1));
    expect(state.selectedPeople).toEqual([person2]);
  });

  it('handle removeAllPeople', () => {
    let state = selectedPeopleReducer(initialState, addPeople(person1));
    state = selectedPeopleReducer(state, addPeople(person2));
    state = selectedPeopleReducer(state, removeAllPeople());
    expect(state.selectedPeople).toEqual([]);
  });
});
