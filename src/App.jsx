import { useEffect, useState } from 'react'
import {Routes} from 'react-router-dom'

import './App.css'
import Topbar from './components/topbar/Topbar'
import Posts from './components/posts/posts'

function App() {

  return (
    <div className="App">
      <Posts/>
    </div>
  )
}

export default App
