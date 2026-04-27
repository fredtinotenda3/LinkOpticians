// ===== FILE: components/ErrorBoundary.tsx (CREATE NEW) =====
"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You could send to Sentry here
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-white/60 mb-6">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition"
              >
                Refresh Page
              </button>
              <Link
                href="/"
                className="px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition"
              >
                Go Home
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                <p className="text-red-400 text-sm font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
export function LoadingFallback() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/40 text-sm">Loading...</p>
      </div>
    </div>
  );
}