import { Routes, Route, Navigate } from 'react-router-dom'
import { SearchPage } from './pages/SearchPage'
import { ResultPage } from './pages/ResultPage'
import { OutliersPage } from './pages/OutliersPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-800">Apartment Rent Planner</h1>
        </div>
      </header>
      
      <main className="py-6">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/outliers" element={<OutliersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Apartment Rent Planner POC
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
