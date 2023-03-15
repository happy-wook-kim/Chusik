import styles from "./BottomNavigation.module.scss"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

export default function BottomNavigation() {
  const location = useLocation();
  const [navi, setNavi] = useState([
    {
      index: 0,
      value: false,
      title: '식당 찾기',
      src: new URL('@/assets/map.svg', import.meta.url).href,
      url: '/restaurants'
    },
    {
      index: 1,
      value: false,
      title: '즐겨찾기',
      src: new URL('@/assets/bookmark.svg', import.meta.url).href,
      url: '/favorites'
    },
    {
      index: 2,
      value: false,
      title: '설정',
      src: new URL('@/assets/settings.svg', import.meta.url).href,
      url: '/settings'
    }
  ])

  return (
    <div className={styles.navigation}>
      {navi?.map((item, i) => 
        <section key={item.index}>
          <Link to={item.url}> 
            <button 
              className={location.pathname.includes(item.url) ? styles.buttonActive : ''} 
              item-index={i}>
              <img src={item.src} />
              {item.title}
            </button>
          </Link>
        </section>
      )}
    </div>
  )
}