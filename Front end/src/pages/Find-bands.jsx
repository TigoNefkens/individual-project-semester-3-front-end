import './Find-bands.css';
import React, { useState, useEffect } from "react";
import CustomHeader from "../components/Header.jsx";
import BandComponent from '../components/BandComponent.jsx';
import bandAPI from '../apis/bandAPI';

function FindBands() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    bandAPI.getAllBands()
      .then(data => setBands(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app-background">
      
      <CustomHeader />
      <div className="scroll-page">
        {bands.map(band => (
          <BandComponent key={band.Id} band={band} />
        ))}
      </div>
    </div>
  );
}

export default FindBands;