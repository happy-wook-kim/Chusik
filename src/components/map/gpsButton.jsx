import styles from "./gpsButton.module.scss"
import marker from "@/assets/location.svg"

export default function gpsButton ({ setGPS }) {


  const clickedGPS = () => {
    setGPS()
  }

  return (
    <button className={styles.gpsButton} onClick={clickedGPS}>
      <img src={marker} alt="gps"/>
    </button>
  )
}