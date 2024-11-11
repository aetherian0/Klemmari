import { Routes, Route, Link } from "react-router-dom";
import Ohjelma1 from "./Ohjelma1";
import Ohjelma2 from "./Ohjelma2";
import Ohjelma3 from "./Ohjelma3";
import "./App.css";

function Home() {
    return <h1></h1>;
}

function App() {
    return (
        <div className="center">
            <nav>
                <Link to="/">Home</Link> <Link to="/Ohjelma1">Veriarvot</Link>{" "}
                <Link to="/Ohjelma2">Potilastiedot</Link>{" "}
                <Link to="/Ohjelma3">Asetukset</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Ohjelma1" element={<Ohjelma1 />} />
                <Route path="/Ohjelma2" element={<Ohjelma2 />} />
                <Route path="/Ohjelma3" element={<Ohjelma3 />} />
            </Routes>
        </div>
    );
}

export default App;
