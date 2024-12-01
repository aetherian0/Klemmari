import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Veriarvot from "./Veriarvot";
import Potilastiedot from "./Potilastiedot";
import Chattibotti from "./Chattibotti";
import Asetukset from "./Asetukset";
import KayntiTiedot from "./KayntiTiedot";
import "./App.css";

function Home({ language }) {
    let date = new Date().toLocaleDateString();

    return (
        <h1>
            {language === "fi"
                ? `Tervetuloa! Tänään on ${date}`
                : `Welcome! Today is ${date}`}
        </h1>
    );
}

function App() {
    // Language and Theme State
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "fi"
    );
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    // Apply theme and language on load
    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <div className="center">
            <nav>
                <Link to="/">{language === "fi" ? "Koti" : "Home"}</Link>
                <Link to="/Veriarvot">
                    {language === "fi" ? "Veriarvot" : "Blood Values"}
                </Link>
                <Link to="/Potilastiedot">
                    {language === "fi" ? "Potilastiedot" : "Patient Info"}
                </Link>
                <Link to="/Chattibotti">
                    {language === "fi" ? "Chattibotti" : "Chatbot"}
                </Link>
                <Link to="/Asetukset">
                    {language === "fi" ? "Asetukset" : "Settings"}
                </Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home language={language} />} />
                <Route
                    path="/Veriarvot"
                    element={<Veriarvot language={language} />}
                />
                <Route
                    path="/Potilastiedot"
                    element={<Potilastiedot language={language} />}
                />
                <Route
                    path="/Chattibotti"
                    element={<Chattibotti language={language} />}
                />
                <Route
                    path="/Asetukset"
                    element={
                        <Asetukset
                            language={language}
                            setLanguage={setLanguage}
                            setTheme={setTheme}
                        />
                    }
                />
                <Route
                    path="/kaynti/:id"
                    element={<KayntiTiedot language={language} />}
                />
            </Routes>
        </div>
    );
}

export default App;
