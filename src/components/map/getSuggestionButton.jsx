import styles from "./getSuggestionButton.module.scss"
import suggestion from "@/assets/like.svg"

export default function getSuggestion ({ onClick }) {

  const clickButton = () => {
    onClick()
  }

  return (
    <div className={styles.suggestion_button} onClick={clickButton}>
      <img src={suggestion} alt="suggestion" />  
    </div>
  )
}

