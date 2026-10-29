import WebcamPage from "./webcamPage";
import MenuPage from "./menuPage";
import {useState} from "react"



export default function MainPage({goBack}) {
  const [config, setConfig] = useState(null)

  if (config === null){
    return <MenuPage updateConfig={setConfig} goBack={goBack} />
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