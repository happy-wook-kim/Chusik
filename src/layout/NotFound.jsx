import { Link } from "react-router-dom"  
  
export default function NotFound() {



  return (
    <div>
      <h1>404</h1>
      <h3>Page is not found</h3>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  )
}