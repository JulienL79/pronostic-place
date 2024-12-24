import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Result } from "./pages/Result/Result";
import { Predict } from "./pages/Predict/Predict";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { DescriptionGame } from "./components/DescriptionGame";
import { Euromillions } from "./pages/Euromillions/Euromillions";
import { Loto } from "./pages/Loto/Loto";
import { useState } from "react";

function App() {

  return (
    <Provider store={store}>
      <Router basename="/pronostic-place">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/euromillions/:page" element={<Euromillions />} />
          <Route path="/loto/:page" element={<Loto />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
