import { useEffect, useRef } from 'react';
import styles from './markerDetail.module.scss';

export default function markerDetail(props) {
  const info = useRef()

  useEffect(() => {
    if(props.marker.position !== "") open()
  })

  const open = () => {
    info.current.setAttribute('active', "")
  }

  const close = () => {
    info.current.removeAttribute('active')
    props.marker.position = ""
  }

  return (
    <div ref={info} className={styles.marker_info}>
      {props.marker.position &&
      <div className={styles.marker_info_div}>
        <p className={styles.marker_info_div__title}>{props.marker.title}</p> 
        <small className={styles.marker_info_div__position}>{props.marker.position.Ma} / {props.marker.position.La}</small>
      </div>
      }
      <button className={styles.marker_info__close} onClick={close}>X</button>
    </div>
  )
}