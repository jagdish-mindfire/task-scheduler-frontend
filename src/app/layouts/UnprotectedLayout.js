"use client"
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

export default function UnprotectedLayout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer>{children}</ToastContainer>
      </QueryClientProvider>
    </>
  );
}
