import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./menu.module.scss"

export default function menu(props) {
  const navigator = useNavigate()

  return (
    <div className={styles.menus}>
      {props.menus?.map((menu) => 
      <div className={styles.menu} key={menu.title} onClick={() => navigator(`./${menu.alt}`)}>
        <img className={styles.menu__img} src={menu.img} alt={menu.alt}/>
        <span className={styles.menu__title}>{menu.title}</span>
      </div>
      )}
    </div>
  )
}