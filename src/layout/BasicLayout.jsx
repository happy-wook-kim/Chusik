import { Outlet } from "react-router-dom"
import BottomNavigation from "../components/layout/BottomNavigation"
import styles from "./Layout.module.scss"

export default function BasicLayout(){

  return (
    <>
      <div className={styles.background}/>
      <div className={styles.layout}>
        <section className={styles.body}>
          <Outlet />
        </section>
        <BottomNavigation />
      </div>
    </>
  )
}