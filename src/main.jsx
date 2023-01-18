import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './scss/normalize.scss'  
import NotFound from './layout/NotFound'
import Home from './view/Home'
import Restaurants from './view/restaurants'
import BasicLayout from './layout/BasicLayout'
import Settings from './view/settings'
import Favorites from './view/favorites'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<BasicLayout />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/restaurants'} element={<Restaurants />} />
          <Route path={'/favorites'} element={<Favorites />} />
          <Route path={'/settings'} element={<Settings />} />
          <Route path={'/*'} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
