import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './markerDetail.module.scss';
import Badge from '@/components/common/badge';
import { categoryImg } from "@/data/markerData";


const markerDetail = forwardRef(
  (props, ref) => {
    const marker = props?.marker
    const info = useRef()
    const resetState = props.resetState
    useImperativeHandle(ref, () => ({
      close,
    }))
  
    useEffect(() => {
      if(marker.position !== "") open()
      else close()
    }, [marker])
  
    const open = () => {
      info.current.setAttribute('active', "")
    }
  
    const close = () => {
      if(marker?.marker){
        const img = new kakao.maps.MarkerImage(categoryImg[marker.category], new kakao.maps.Size(32, 32))
        marker.marker.setImage(img)
      }
      info.current.removeAttribute('active')
      marker.position = ""
      if(marker?.mode === 'search') {
        resetState()
      }
    }
  
    return (
      <div ref={info} className={styles.marker_info}>
        {marker.position &&
        <div className={styles.marker_info_div}>
          <Badge 
            className={styles.marker_info_div__badge}
            type={marker.category}
          />
          <p className={styles.marker_info_div__title}>{marker.title}</p> 
          <small className={styles.marker_info_div__position}>{marker.position.Ma} / {marker.position.La}</small>
        </div>
        }
        <button className={styles.marker_info__close} onClick={close}>X</button>
      </div>
    )
})

export default markerDetail