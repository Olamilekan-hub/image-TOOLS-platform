
// client/src/App.jsx
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import GeneratePage from './pages/GeneratePage'
import EditPage from './pages/EditPage'
import RemixPage from './pages/RemixPage'
import UpscalePage from './pages/UpscalePage'
import DescribePage from './pages/DescribePage'
import ReframePage from './pages/ReframePage'
import NotFoundPage from './pages/NotFoundPage'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-base-100 text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/remix" element={<RemixPage />} />
            <Route path="/upscale" element={<UpscalePage />} />
            <Route path="/describe" element={<DescribePage />} />
            <Route path="/reframe" element={<ReframePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}

export default App