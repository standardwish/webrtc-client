import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { NavigationBar } from "./components/navigation-bar.tsx";
import ProfileProvider from "./context/provider.tsx";
import "./index.css";
import Docs from "./routes/docs/page.tsx";

const client_key = import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_KEY;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 60 * 1000, // 5분
      staleTime: 1 * 60 * 1000, // 1분
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProfileProvider>
      <GoogleOAuthProvider clientId={client_key!}>
        <QueryClientProvider client={queryClient}>
          <NavigationBar />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ProfileProvider>
  </React.StrictMode>
);
