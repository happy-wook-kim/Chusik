import styles from "./gpsButton.module.scss"
import marker from "@/assets/location.svg"

export default function gpsButton ({ onClick }) {

  const getMyPosition = (position) => {
    onClick(position?.coords?.latitude, position?.coords?.longitude)
  }

  const clickedGPS = () => {
    if (navigator.geolocation) {
      /**
       * navigator.geolocation 은 Chrome 50 버젼 이후로 HTTP 환경에서 사용이 Deprecate 되어 HTTPS 환경에서만 사용 가능 합니다.
       * http://localhost 에서는 사용이 가능하며, 테스트 목적으로, Chrome 의 바로가기를 만들어서 아래와 같이 설정하면 접속은 가능합니다.
       * chrome.exe --unsafely-treat-insecure-origin-as-secure="http://example.com"
       */
      navigator.geolocation.getCurrentPosition(getMyPosition);
    } else {
      alert('GPS를 허용해주세요.')
    }
  }

  return (
    <button className={styles.gpsButton} onClick={clickedGPS}>
      <img src={marker} alt="gps"/>
    </button>
  )
}