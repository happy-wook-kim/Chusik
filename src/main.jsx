import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './scss/normalize.scss'  
import NotFound from './layout/NotFound'
import Home from './view/Home'
import Restaurants from './view/restaurants'
import RestaurantsSearch from './view/restaurants/search'
import BasicLayout from './layout/BasicLayout'
import Settings from './view/settings'
import Favorites from './view/favorites'
import SetAccount from './view/settings/account'
import SetFavorite from './view/settings/favorite'
import SetBlacklist from './view/settings/blacklist'

document.querySelector("body").style.height = window.innerHeight + "px"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<BasicLayout />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/restaurants'} element={<Restaurants />} />
          <Route path={'/restaurants/search'} element={<RestaurantsSearch />} />
          <Route path={'/favorites'} element={<Favorites />} />
          <Route path={'/settings'} element={<Settings />} />
          <Route path={'/settings/account'} element={<SetAccount />} />
          <Route path={'/settings/favorite'} element={<SetFavorite />} />
          <Route path={'/settings/blacklist'} element={<SetBlacklist />} />
          <Route path={'/*'} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>,
)
