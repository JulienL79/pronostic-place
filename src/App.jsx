import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Result } from "./pages/Result";
import { Predict } from "./pages/Predict";
import { NotFound } from "./pages/NotFound";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Predict />} />
          <Route path="/:game/results" element={<Result />} />
          

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
