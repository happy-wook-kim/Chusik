import { Link } from "react-router-dom"  
import styles from "./Layout.module.scss"
  
export default function NotFound() {

  return (
    <>
      <div className={styles.notFound}>
        <h1>404</h1>
        <h3>Page is not found</h3>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </>
  )
}