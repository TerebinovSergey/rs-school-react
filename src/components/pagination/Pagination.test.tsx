import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';
import styles from './Pagination.module.css';

vi.mock('./Pagination.module.css', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('./Pagination.module.css')>();
  return {
    ...actual,
    wrapper: 'mock-wrapper',
    link: 'mock-link',
    disabled: 'mock-disabled',
  };
});

describe('Pagination component', () => {
  const onPageChangeMock = vi.fn();

  it('renders correct number of pages', () => {
    render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />,
    );

    const links = screen.getAllByText(/^\d+$/);
    expect(links).toHaveLength(10);
  });

  it('applies disabled class to the current page', () => {
    render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={5}
        onPageChange={onPageChangeMock}
      />,
    );

    const disabledLink = screen.getByText('5');
    expect(disabledLink).toHaveClass(styles.disabled);
  });

  it('calls onPageChange with correct page number when a page is clicked', () => {
    render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />,
    );

    const pageLink = screen.getByText('3');
    fireEvent.click(pageLink);

    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });
});
