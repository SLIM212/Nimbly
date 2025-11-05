import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashBoard from './pages/DashBoard';

describe('Dashboard pagination', () => {
  const mockTodos = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    todo: `Todo ${i + 1}`,
    completed: i % 2 === 0,
  }));

  beforeEach(() => {
    // mock fetch to avoid network calls
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ todos: mockTodos }),
      })
    );

    // mock localStorage to avoid redirects
    Storage.prototype.getItem = jest.fn(() => 'mock-token');
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shows only 10 todos per page', async () => {
    render(
      <MemoryRouter>
        <DashBoard />
      </MemoryRouter>
    );

    const items = await screen.findAllByText(/Todo/);
    expect(items.length).toBe(10);
  });

  test('navigates to next page correctly', async () => {
    render(
      <MemoryRouter>
        <DashBoard />
      </MemoryRouter>
    );

    // wait for first page to render
    await screen.findAllByText(/Todo/);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // wait for second page to render
    await waitFor(() => {
      const items = screen.getAllByText(/Todo/);
      expect(items[0].textContent).toBe('Todo 11');
    });
  });

  test('disables Previous button on first page', async () => {
    render(
      <MemoryRouter>
        <DashBoard />
      </MemoryRouter>
    );

    // wait for todos to load
    await screen.findAllByText(/Todo/);
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('disables Next button on last page', async () => {
    render(
      <MemoryRouter>
        <DashBoard />
      </MemoryRouter>
    );

    // wait for todos to load
    await screen.findAllByText(/Todo/);
    const nextButton = screen.getByText('Next');

    // click next until last page
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });
});
