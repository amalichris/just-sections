import { Routes, Route } from 'react-router-dom'
import JustEjariPreview from './pages/JustEjariPreview'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JustEjariPreview />} />
      <Route path="/justejari" element={<JustEjariPreview />} />
    </Routes>
  )
}
