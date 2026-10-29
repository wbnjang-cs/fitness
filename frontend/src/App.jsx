import MainPage from "./pages/mainPage"
import SettingsPage from "./pages/settingsPage"
import { useState } from "react"

export default function App() {
  const [page, setPage] = useState(null)

  if (page === "main") {
    return <MainPage goBack={setPage}/>
  }
  else if (page === "settings") {
    return <SettingsPage onBack={setPage}/>
  }
  else {
    return (
      <div className="home">
        <h1>AI Fitness Trainer</h1>
        <button onClick={() => setPage("main")}>Start workout</button>
        <button onClick={() => setPage("settings")}>Settings</button>
      </div>
    );
  }
}