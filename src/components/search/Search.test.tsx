import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from './Search';

vi.mock('../../hooks/useSearchQuery.ts', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('../../hooks/useSearchQuery.ts')>();
  return {
    ...mod,
    useSearchQuery: () => ['', vi.fn()] as const,
  };
});

const testValue = 'Luke Skywalker';

describe('Search component', () => {
  it('renders without crashing', () => {
    render(<Search onSubmit={vi.fn()} />);
    expect(
      screen.getByPlaceholderText("Enter the person's name"),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSubmit with the query when form is submitted', () => {
    const onSubmitMock = vi.fn();
    render(<Search onSubmit={onSubmitMock} />);
    const inputElement = screen.getByPlaceholderText("Enter the person's name");
    const formElement = screen.getByTestId('form');

    fireEvent.change(inputElement, { target: { value: testValue } });
    fireEvent.submit(formElement);

    expect(onSubmitMock).toHaveBeenCalledWith(testValue);
  });

  it('updates queryHook value when input changes', () => {
    render(<Search onSubmit={vi.fn()} />);
    const inputElement = screen.getByPlaceholderText("Enter the person's name");

    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(inputElement).toHaveValue(testValue);
  });
});
