import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from '../../models/IPeople';

export interface SelectedPeopleState {
  selectedPeople: IPeople[];
}

export const initialState: SelectedPeopleState = {
  selectedPeople: [],
};

const selectedPeopleSlice = createSlice({
  name: 'selectedPeople',
  initialState,
  reducers: {
    addPeople: (state, action: PayloadAction<IPeople>) => {
      state.selectedPeople.push(action.payload);
    },
    removePeople: (state, action: PayloadAction<IPeople>) => {
      state.selectedPeople = state.selectedPeople.filter(
        (people) => people.url !== action.payload.url,
      );
    },
  },
});

export const { addPeople, removePeople } = selectedPeopleSlice.actions;

export default selectedPeopleSlice.reducer;
