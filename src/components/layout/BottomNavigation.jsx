import styles from "./BottomNavigation.module.scss"

export default function BottomNavigation() {


  return (
    <div className={styles.navigation}>
      <section>
        <span>식당 찾기</span>
      </section>
      <section>
        <span>카테고리</span>
      </section>
      <section>
        <span>설정</span>
      </section>
    </div>
  )
}