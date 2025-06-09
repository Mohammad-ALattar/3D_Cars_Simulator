import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TokenGuard from "@/components/TokenGuard";
import { Suspense } from "react";
import { Analytics } from '@vercel/analytics/react'; // ✅ Use this for Vite

const AppRoutes = () => useRoutes(routes);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TokenGuard>
          <Suspense fallback={<div>Loading route...</div>}>
            <AppRoutes />
          </Suspense>
        </TokenGuard>
      </BrowserRouter>
      <Analytics />
    </QueryClientProvider>
  );
}
