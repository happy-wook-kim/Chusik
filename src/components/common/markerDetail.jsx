import { useEffect, useRef } from 'react';
import styles from './markerDetail.module.scss';

export default function markerDetail({ marker }) {
  const info = useRef()

  useEffect(() => {
    if(marker.position !== "") open()
  })

  const open = () => {
    info.current.setAttribute('active', "")
  }

  const close = () => {
    info.current.removeAttribute('active')
    marker.position = ""
  }

  return (
    <div ref={info} className={styles.marker_info}>
      {marker.position &&
      <div className={styles.marker_info_div}>
        <p className={styles.marker_info_div__title}>{marker.title}</p> 
        <small className={styles.marker_info_div__position}>{marker.position.Ma} / {marker.position.La}</small>
      </div>
      }
      <button className={styles.marker_info__close} onClick={close}>X</button>
    </div>
  )
}