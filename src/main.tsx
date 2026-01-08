import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import Header from './components/shared/Header.tsx'
import { store } from './store'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <a href="#main-content" className="absolute top-[-40px] left-0 bg-black text-white p-2 no-underline z-[100] focus:top-0">
            Skip to main content
          </a>
          <main id="main-content" className="container py-6" role="main">
            <Header />
            <App />
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#ffffff",
              },
              duration: 5000,
            }}
          />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
