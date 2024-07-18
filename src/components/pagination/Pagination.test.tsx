import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import Pagination from './Pagination';
import styles from './Pagination.module.css';

describe('Pagination component', () => {
  const onPageChangeMock = vi.fn();

  it('renders correct number of pages', () => {
    render(
      <Router>
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={onPageChangeMock}
        />
      </Router>,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(10);
  });

  it('applies disabled class to the current page', () => {
    render(
      <Router>
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          currentPage={5}
          onPageChange={onPageChangeMock}
        />
      </Router>,
    );

    const disabledLink = screen.getByText('5');
    expect(disabledLink).toHaveClass(styles.disabled);
  });

  it('calls onPageChange with correct page number when a page is clicked', () => {
    render(
      <Router>
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={onPageChangeMock}
        />
      </Router>,
    );

    const pageLink = screen.getByText('3');
    fireEvent.click(pageLink);

    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it('applies correct link for each page', () => {
    render(
      <Router>
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={onPageChangeMock}
        />
      </Router>,
    );

    const pageLink = screen.getByText('5');
    expect(pageLink).toHaveAttribute('href', '/?page=5');
  });
});
