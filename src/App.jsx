import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Mylist from './pages/Mylist'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:id' element={<MovieDetail />} />
                <Route path='/Mylist' element={<Mylist />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
