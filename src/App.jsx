import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

// import { Navbar, Welcome, Footer, Services, Transactions } from "./components";

import { Navbar, Welcome, Install, Footer, Services } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      {(window.ethereum) ? <Welcome /> : <Install />}
    </div>
    <Services />
    {/* <Transactions /> */}
    <Footer />
  </div>
);

export default App;