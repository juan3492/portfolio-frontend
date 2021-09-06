import React, { useState, useEffect } from 'react';
import './App.css';
import About from './components/About/About'
import Footer from "./components/Footer/Footer"
import Intro from "./components/Intro/Intro";
import Loading from './components/Loading/Loading';
import Portfolio from './components/Portfolio/Portfolio'
import axios from "axios";

function App() {
  const [fetchingData, setFetchingData] = useState(true);

  const [res, setRes] = useState({ about: {}, portfolio: [] });

  const fetchData = async () => {
    const resAbout = await axios
      .get("https://backend-portfolio-juan3492.herokuapp.com/about");
    const resPortfolio = await axios
      .get("https://backend-portfolio-juan3492.herokuapp.com/portfolio");
    setFetchingData(false);
    setRes({ about: resAbout.data[0], portfolio: resPortfolio.data});
  }
  
  useEffect(() => {
    fetchData()
  }, []);


  const content = fetchingData
    ? (
      <Loading />
    ) : (
      <div className="App ld ld-float-ltr-in">
        <Intro />
        <About 
          informationAbout={res.about}
        />
        <Portfolio
          informationPortfolio={res.portfolio}
        />
        <Footer />
      </div>
    );

  return content;
}

export default App;
