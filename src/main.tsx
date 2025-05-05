import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContextProvider } from './context.tsx'
import { CustomThemeProvider } from './ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CustomThemeProvider>
  <ContextProvider>
    <App />
  </ContextProvider>
  </CustomThemeProvider>,
)
