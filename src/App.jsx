import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { Navbar, Welcome, Install, Footer, Services, Transactions } from "./components";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  function handleAccountChange(account) {
    setCurrentAccount(account);
  }

  return (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      {(window.ethereum) ?
      <Welcome currentAccount={currentAccount} handleAccountChange={handleAccountChange}/> :
      <Install />}
    </div>
    <Transactions currentAccount={currentAccount}/>
    <Services />

    <Footer />
  </div>
  );
};

export default App;