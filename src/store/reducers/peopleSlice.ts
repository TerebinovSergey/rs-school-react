import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from '../../models/IPeople';

export interface PeopleState {
  people: IPeople[];
}

const initialState: PeopleState = {
  people: [],
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<IPeople[]>) => {
      state.people = action.payload;
    },
  },
});

export const { setPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
