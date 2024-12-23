import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/reset.css'
import './css/main.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />,
)
