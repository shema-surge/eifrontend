import { useEffect, useState } from 'react'
import {Routes} from 'react-router-dom'

import './App.css'
import Topbar from './components/topbar/Topbar'
import Posts from './components/posts/posts'
import Leftbar from './components/leftbar/Leftbar'

function App() {

  return (
    <div className="App">
      <Topbar/>
      <div className="contentContainer">
        <Leftbar/>
        <Posts/>
      </div>
      
    </div>
  )
}

export default App
