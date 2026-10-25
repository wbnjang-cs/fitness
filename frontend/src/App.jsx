import WebcamPage from "./pages/webcamPage";
import MenuPage from "./pages/menuPage";
import {useState} from "react"



export default function App() {
  const [config, setConfig] = useState(null)

  if (config === null){
    return <MenuPage updateConfig={setConfig} />
  }
  return <div> 
    <WebcamPage 
      repsPerSet={config.repsPerSet}
      setAmount = {config.setAmount}
      exerciseName = {config.exerciseName}
      updateConfig = {setConfig}
     />
  </div> 
}