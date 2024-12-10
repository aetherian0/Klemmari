import { useEffect } from "react";
import "./App.css";

function Asetukset({ language, setLanguage, theme, setTheme }) {
    useEffect(() => {
        localStorage.setItem("language", language);
        localStorage.setItem("theme", theme);
    }, [language, theme]);

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
    };

    const handleThemeChange = (event) => {
        const newTheme = event.target.value;
        setTheme(newTheme);
    };

    return (
        <div className="settings-box">
            <h2>{language === "fi" ? "Asetukset" : "Settings"}</h2>

            <div className="setting-item">
                <label>
                    {language === "fi" ? "Valitse kieli:" : "Select Language:"}
                </label>
                <select value={language} onChange={handleLanguageChange}>
                    <option value="fi">Suomi</option>
                    <option value="en">English</option>
                </select>
            </div>

            <div className="setting-item">
                <label>
                    {language === "fi" ? "Valitse teema:" : "Select Theme:"}
                </label>
                <select value={theme} onChange={handleThemeChange}>
                    <option value="light">
                        {language === "fi" ? "Vaalea" : "Light"}
                    </option>
                    <option value="dark">
                        {language === "fi" ? "Tumma" : "Dark"}
                    </option>
                </select>
            </div>
        </div>
    );
}

export default Asetukset;
