
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function MapPicker({ onSubmit }) {
  const [latValue, setLatValue] = useState('');
  const [lonValue, setLonValue] = useState('');
  const [latDir, setLatDir] = useState('N');
  const [lonDir, setLonDir] = useState('E');
  const boxRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = () => {
    const lat = latDir === 'S' ? -Math.abs(parseFloat(latValue)) : Math.abs(parseFloat(latValue));
    const lon = lonDir === 'W' ? -Math.abs(parseFloat(lonValue)) : Math.abs(parseFloat(lonValue));

    if (!isNaN(lat) && !isNaN(lon)) {
      const subtleLat = lat + Math.random() * 0.000001;
      onSubmit({ lat: subtleLat, lon });
      setTimeout(() => onSubmit({ lat, lon }), 10);

      setLatValue('');
      setLonValue('');
      setLatDir('N');
      setLonDir('E');
    } else {
      alert('❗Please enter valid numeric coordinates.');
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const subtleLat = lat + Math.random() * 0.000001;
        onSubmit({ lat: subtleLat, lon });
        setTimeout(() => onSubmit({ lat, lon }), 10);
      },
      () => {
        alert('❌ Unable to retrieve your location.');
      }
    );
  };

  return (
    <div
      ref={boxRef}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 border border-green-100"
    >
      <h3 className="text-xl font-bold text-green-700 mb-4">📍 Select Farm Location</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Latitude</label>
          <input
            type="text"
            value={latValue}
            onChange={(e) => setLatValue(e.target.value)}
            className="w-full border rounded px-2 py-1"
            placeholder="e.g. 22.5726"
          />
          <select
            value={latDir}
            onChange={(e) => setLatDir(e.target.value)}
            className="mt-2 w-full border rounded px-2 py-1"
          >
            <option value="N">North</option>
            <option value="S">South</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Longitude</label>
          <input
            type="text"
            value={lonValue}
            onChange={(e) => setLonValue(e.target.value)}
            className="w-full border rounded px-2 py-1"
            placeholder="e.g. 88.3639"
          />
          <select
            value={lonDir}
            onChange={(e) => setLonDir(e.target.value)}
            className="mt-2 w-full border rounded px-2 py-1"
          >
            <option value="E">East</option>
            <option value="W">West</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Submit Coordinates
        </button>
        <button
          onClick={handleUseLocation}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded transition"
        >
          📡 Use My Current Location
        </button>
      </div>
    </div>
  );
}

export default MapPicker;
