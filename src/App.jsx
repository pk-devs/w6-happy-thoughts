import { Header } from "./components/Header"
import { WriteHappyThought } from "./components/WriteHappyThought"
import { DisplayHappyThought } from "./components/DisplayHappyThought"
import { useState } from "react"

export const App = () => {
  
  const [refresh, setRefresh] = useState("false")

  const handleRefresh = () => {
    setRefresh(prev => !prev)
  }

  return (
    <div className="app">
      <Header />
      <WriteHappyThought onNewThought={handleRefresh}/>
      <DisplayHappyThought key={refresh} />
    </div>
)}
