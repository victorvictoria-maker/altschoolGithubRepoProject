import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ChakraProvider } from "@chakra-ui/react";

// import './index.css'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ErrorBoundary
        fallback={<p>Something went wrong and this is error boundary</p>}
      >
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
