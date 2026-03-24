// Login.test.jsx

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login.jsx';
import * as auth from '../api/auth.js';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../api/auth.js', () => ({
    login: vi.fn()
}));

const mockLogin = vi.fn();
vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({ login: mockLogin, user: null, logout: vi.fn() })
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return { ...actual, useNavigate: () => mockNavigate };
});

function renderLogin() {
    return render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
}

describe("Login component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders login form", () => {
        renderLogin();
        expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    });

    test("calls login API and navigates on success", async () => {
        auth.login.mockResolvedValue({
            data: { user: { id: 1 }, token: "abc123", username: "bob" }
        });

        renderLogin();

        fireEvent.change(screen.getByPlaceholderText("username"), { target: { value: "bob" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "secret" } });
        fireEvent.click(screen.getByRole("button", { name: /log in/i }));

        await waitFor(() => {
            expect(auth.login).toHaveBeenCalledWith({ username: "bob", password: "secret" });
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test("shows alert on login failure", async () => {
        auth.login.mockRejectedValue(new Error("Bad credentials"));
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

        renderLogin();

        fireEvent.change(screen.getByPlaceholderText("username"), { target: { value: "bob" } });
        fireEvent.click(screen.getByRole("button", { name: /log in/i }));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("Login failed. Please try again.");
        });
    });
});
