import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Counter } from './pages';

export default function routes () {
  return <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/counter" element={<Counter />}/>
    </Routes>
  </Router>
}
