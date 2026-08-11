"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-6">
      <div className="w-full max-w-sm rounded-lg border border-sand-deep bg-white p-8 shadow-sm">
        <h1 className="font-display text-xl font-semibold text-charcoal">Valista Admin</h1>
        <p className="mt-1 text-sm text-charcoal/60">Sign in to manage site content.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <label className="block text-sm text-charcoal/60">
            Email
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
            />
          </label>

          <label className="block text-sm text-charcoal/60">
            Password
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
            />
          </label>

          {state.error && <p className="text-sm text-terracotta">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-kraft px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-kraft-dark disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
