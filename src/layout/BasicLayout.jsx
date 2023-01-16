import { Outlet } from "react-router-dom"
import BottomNavigation from "../components/layout/BottomNavigation"
import styles from "./Layout.module.scss"

export default function BasicLayout(){
  return (
    <div className={styles.layout}>
      <header className={styles.header}>

      </header>
      <section className={styles.body}>
        <Outlet />
      </section>
      <footer className={styles.footer}>
        <BottomNavigation />
      </footer>
    </div>
  )
}