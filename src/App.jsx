import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Weather from "./Weather";

function App() {
  return (
    <Router basename="/weather-dashboard">
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
