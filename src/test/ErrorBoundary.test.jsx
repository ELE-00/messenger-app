// ErrorBoundary.test.jsx

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

// Component that throws to trigger boundary
function Bomb({ shouldThrow }) {
    if (shouldThrow) throw new Error("Test error");
    return <div>No error</div>;
}

describe("ErrorBoundary", () => {
    beforeEach(() => {
        // Suppress console.error for expected throws
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    test("renders children when no error", () => {
        render(
            <ErrorBoundary>
                <Bomb shouldThrow={false} />
            </ErrorBoundary>
        );
        expect(screen.getByText("No error")).toBeInTheDocument();
    });

    test("renders fallback UI when child throws", () => {
        render(
            <ErrorBoundary>
                <Bomb shouldThrow={true} />
            </ErrorBoundary>
        );
        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    });

    test("Try again button is present in fallback UI", () => {
        render(
            <ErrorBoundary>
                <Bomb shouldThrow={true} />
            </ErrorBoundary>
        );
        // Fallback shows a reset button
        const btn = screen.getByRole("button", { name: /try again/i });
        expect(btn).toBeInTheDocument();
        // Clicking does not throw
        expect(() => fireEvent.click(btn)).not.toThrow();
    });
});
