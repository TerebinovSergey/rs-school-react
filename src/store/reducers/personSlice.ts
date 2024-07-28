import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPerson } from '../../models/IPerson';
import { personInit } from '../../services/types';

export interface PersonState {
  person: IPerson;
}

export const initialState: PersonState = {
  person: personInit,
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<IPerson>) => {
      state.person = action.payload;
    },
    removePerson: (state) => {
      state.person = personInit;
    },
  },
});

export const { setPerson, removePerson } = personSlice.actions;
export default personSlice.reducer;
