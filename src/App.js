import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Today from './pages/Today'
import Youtuber from './pages/Youtuber'
import Not from './pages/Not'
import Header from './components/section/Header'
import Main from './components/section/Main'
import Footer from './components/section/Footer'
import Search from './pages/Search'
import ScrollTo from './utils/scrollTo'
import Video from './pages/Video'

const App = () => {
    return (
        <BrowserRouter>
            <ScrollTo />
            <Header />
            <Main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/today' element={<Today />} />
                    <Route path='/youtuber' element={<Youtuber />} />
                    <Route path='/search/:searchId' element={<Search />} />
                    <Route path='/video/:videoId' element={<Video />} />
                    <Route path='*' element={<Not />}></Route>
                </Routes>
            </Main>
            <Footer />
        </BrowserRouter>
    );
}

export default App
