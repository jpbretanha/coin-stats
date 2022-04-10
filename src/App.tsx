import { Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import CoinPage from "routes/coin-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<CoinPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
