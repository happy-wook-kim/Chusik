import styles from "./gpsButton.module.scss"
import marker from "@/assets/location.svg"

export default function gpsButton ({ setPosition }) {


  const clicked = () => {
    setPosition()
  }

  return (
    <button className={styles.gpsButton} onClick={clicked}>
      <img src={marker} alt="gps"/>
    </button>
  )
}