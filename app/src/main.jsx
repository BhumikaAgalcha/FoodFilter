import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
   *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
   }
    body{
      background-color: #323334;
      color: white;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
    }
`

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GlobalStyle />
    <App />
  </StrictMode>,
)
