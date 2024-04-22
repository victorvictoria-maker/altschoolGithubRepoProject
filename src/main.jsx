import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundaryComponent from "./../src/components/ErrorBoundaryComponent";
import "tailwindcss/tailwind.css";
import "./index.css";

// import './index.css'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);
