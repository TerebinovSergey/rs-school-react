import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import SavePeople from './SavePeople';
import selectedPeopleReducer from '../../store/reducers/selectedPeopleSlice';

const store = configureStore({
  reducer: {
    selectedPeople: selectedPeopleReducer,
  },
  preloadedState: {
    selectedPeople: {
      selectedPeople: [
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
      ],
    },
  },
});

describe('SavePeople Component', () => {
  it('display the correct number of selected people', () => {
    render(
      <Provider store={store}>
        <SavePeople />
      </Provider>,
    );

    expect(screen.getByText('selected 2')).toBeInTheDocument();
  });

  it('call handleRemoveSelectedPeople on button click', () => {
    const dispatch = vi.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={store}>
        <SavePeople />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'selectedPeople/removeAllPeople',
    });
  });
});
