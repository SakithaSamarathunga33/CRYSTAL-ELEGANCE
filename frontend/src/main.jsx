import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// Backend is deployed as its own independent project on its own domain
// (see frontend/nginx.conf — it no longer proxies API paths internally).
axios.defaults.baseURL = 'https://crystal-api.sakitha.com'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
