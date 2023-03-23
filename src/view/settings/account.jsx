import styles from "./account.module.scss"
import BackButton from "@/components/common/backButton"

export default function SetAccount() {

  return (
    <div className={styles.account}>
      <section className="header">
        <BackButton />
        <h2>계정 정보</h2>
      </section>
    </div>
  )
}