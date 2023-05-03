import ReactDOM from "react-dom/client";
import NiceModal from "@ebay/nice-modal-react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </QueryClientProvider>
);
