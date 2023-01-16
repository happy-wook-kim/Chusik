import { Link } from "react-router-dom";


export default function Restaurants() {

  return (
    <div>
      <h1>Restaurant!</h1>
      <Link to={`/`}>
        <button>home</button>
      </Link>
    </div>
  )
}