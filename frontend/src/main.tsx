import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import { socket, WebsoketProvider } from "./providers/websoketProvider.tsx";
import { ThemeProvider } from "./providers/themeProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <WebsoketProvider value={socket}>
      <ThemeProvider defaultTheme="dark">
        <App />
        <Toaster />
      </ThemeProvider>
    </WebsoketProvider>
  </QueryClientProvider>
);
