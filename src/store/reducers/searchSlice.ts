import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchName: string;
}

const initialState = {
  searchName: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
  },
});

export const { setSearchName } = searchSlice.actions;

export default searchSlice.reducer;
