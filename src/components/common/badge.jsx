import { useEffect, useState } from "react"
import { categoryImg } from "../../data/markerData"
import styles from "./badge.module.scss"

export default function badge({ type }) {
  const [badgeImg, setBadge] = useState()
  const [badgeCategory, setCategory] = useState()
  
  useEffect(() => {
    setBadge(() => {
      return categoryImg[type]
    })
    setCategory(() => { return type })
  })

  return (
    <div className={styles.badge} active="">
      <img src={badgeImg} alt="뱃지"/>
      <small>{badgeCategory}</small>
    </div>  
  )
}