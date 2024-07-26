import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPerson } from '../../models/IPerson';
import { personInit } from '../../services/types';

export interface PersonState {
  person: IPerson;
}

const initialState: PersonState = {
  person: personInit,
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<IPerson>) => {
      state.person = action.payload;
    },
  },
});

export const { setPerson } = personSlice.actions;
export default personSlice.reducer;
