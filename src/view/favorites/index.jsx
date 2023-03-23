import { useEffect } from "react"
import styles from "./favorite.module.scss"

export default function Favorites() {

  useEffect(() => {
    const backButton = document.querySelector('.backButton')
    console.log(backButton)
  }, [])


  return (
    <div>
      <h1>favorite!</h1>
    </div>
  )
}