// app/components/ErrorBoundary.tsx
"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";
import { toast } from "react-toastify";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import "@/styles/main.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    // Example: Log to an external service
    // logErrorToService(error, errorInfo);
    toast.error("Something went wrong. Please try again later.");
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-section">
          <div className="error-boundary-container">
            <MdOutlineReportGmailerrorred className="error-boundary-icon" />
            <h1 className="text-center">Something went wrong.</h1>
            <button
              onClick={() => (window.location.href = "/")}
              className="btn primary-btn flex-btn "
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
