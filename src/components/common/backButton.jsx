import backImg from "@/assets/back.svg"
import { useNavigate } from "react-router-dom"
import "./backButton.scss"

export default function backButton() {
  const navigator = useNavigate()

  return (
    <button className="backButton" onClick={() => {navigator(-1)}}>
      <img src={backImg} alt="back"/>
    </button>
  )
}