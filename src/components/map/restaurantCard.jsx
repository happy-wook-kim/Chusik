import { useEffect, useRef } from "react"
import styles from "./restaurantCard.module.scss"

export default function restaurantCard({ list, setList, info }) {
  const x = new URL('@/assets/x.svg', import.meta.url).href
  const card = useRef()

  const close = () => {
    const data = list
    data.splice((data.length - 1),1)
    setList(data)
  }

  const agree = () => {
    const data = list
    data.splice((data.length - 1),1)
    setList(data)
  }

  return (
    <section className={styles.restaurantCard} ref={card}>
      <img src={x} alt="close" onClick={close}/>
      <img src={info.img} alt="thumbnail"/>
      <div className={styles.restaurantCard__text} id="textDiv">
        <p>{info.title}</p>
        <strong>{info.category}</strong>
        <small>{info.desc}</small>
      </div>
      <div className={styles.restaurantCard__btn}>
        <button className={styles.restaurantCard__btn__disagree} onClick={close}>가기 싫다</button>
        <button className={styles.restaurantCard__btn__agree} onClick={agree}>가고 싶다</button>
      </div>
    </section>
  )
}