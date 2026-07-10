import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more trial routes here */}
      {/* <Route path="/v2" element={<TrialV2 />} /> */}
    </Routes>
  )
}
