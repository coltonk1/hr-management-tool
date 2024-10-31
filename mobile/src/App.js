import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInScreen from './LogInScreen';
import './App.css';

function App() {
  return (
    <Router>
	<div className="App">
	    <div className="content">
	<Routes>
          {/* Define the route for LogInScreen */}
          <Route path="/" element={<LogInScreen />} />
          {/* You can add other routes here for different components */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
