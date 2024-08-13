import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import PlayerContextProvider from './context/PlayerContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <PlayerContextProvider>
              <App />
            </PlayerContextProvider>
            <ToastContainer  />
        </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
