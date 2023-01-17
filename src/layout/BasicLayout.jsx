import { Outlet } from "react-router-dom"
import BottomNavigation from "../components/layout/BottomNavigation"
import styles from "./Layout.module.scss"

export default function BasicLayout(){
  const layoutStyle = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  }
  return (
    <>
      <div className={styles.background}/>
      <div className={styles.layout}>
        <section className={styles.body}>
          <Outlet />
        </section>
        {/* <footer className={styles.footer}>
          <BottomNavigation />
        </footer> */}
      </div>
    </>
  )
}