import { useState } from 'react'
import './App.css'
import Search from './pages/search'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MoviePage from './pages/moviePage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
    <Route path='/*' element={<Search/>} exact  />
    <Route path="/movie/:id" element={<MoviePage />} />

      </Routes>
   
    </BrowserRouter>
  )
}

export default App
