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
import AllRepoContextProvider from "./context/repoContext.jsx";

// import './index.css'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AllRepoContextProvider>
        <ChakraProvider>
          <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
            <HelmetProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </HelmetProvider>
          </ErrorBoundary>
        </ChakraProvider>
      </AllRepoContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
