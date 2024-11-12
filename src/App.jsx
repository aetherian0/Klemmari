import { Routes, Route, Link } from "react-router-dom";
import Veriarvot from "./Veriarvot";
import Potilastiedot from "./Potilastiedot";
import Chattibotti from "./Chattibotti";
import "./App.css";

function Home() {
    return <h1></h1>;
}

function App() {
    return (
        <div className="center">
            <nav>
                <Link to="/">Home</Link> <Link to="/Veriarvot">Veriarvot</Link>{" "}
                <Link to="/Potilastiedot">Potilastiedot</Link>{" "}
                <Link to="/Chattibotti">Chattibotti</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Veriarvot" element={<Veriarvot />} />
                <Route path="/Potilastiedot" element={<Potilastiedot />} />
                <Route path="/Chattibotti" element={<Chattibotti />} />
            </Routes>
        </div>
    );
}

export default App;
