import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import { TextProvider } from "./pnc/text";
import { router } from "./router";
import { GlobalStyles } from "./styles";
import { theme } from "./theme";

const queryClient = new QueryClient();

const home_node = document.getElementById("home");

const WrappedHome = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <TextProvider>
          <RouterProvider router={router} />
        </TextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

window.onload = () => {
  ReactDOM.render(<WrappedHome />, home_node);
};
