import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MapPicker from './components/MapPicker';
import InsightPanel from './components/InsightPanel';  // Includes advanced weather stats
import SensorChart from './components/SensorChart';     // Real-time soil moisture chart
import WeatherTimeline from './components/WeatherTimeline';
import IrrigationAdvisor from './components/IrrigationAdvisor';
import ThankYou from './components/ThankYou'; // Thank you message after setup
import SetupGuide from './components/SetupGuide'; // System setup and usage guide
import SmartIrrigationOverview from './components/SmartIrrigationOverview'; // Overview of smart irrigation system

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });

  const isValid = (val) => typeof val === 'number' && !isNaN(val);
  const isLocationValid = isValid(location.lat) && isValid(location.lon);

  return (
    
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Navbar />

      <MapPicker onSubmit={setLocation} />

      {isLocationValid && (
        <>
          
          <IrrigationAdvisor location={location} />     
           
          <InsightPanel location={location} />   
          <SensorChart location={location} />           
          <SetupGuide />

          <WeatherTimeline location={location} />     
          <SmartIrrigationOverview />
          <ThankYou />
        </>
      )}
    </div>
  );
}

export default App;

