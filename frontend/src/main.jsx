import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import PlayerContextProvider from './context/PlayerContext.jsx'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ScrollToTop from './components/scroll-to-top.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

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
      <ScrollToTop />
        <QueryClientProvider client={queryClient}>
            <PlayerContextProvider>
              <App />
            </PlayerContextProvider>
            <ToastContainer  />
        </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
