import { Link } from "react-router-dom";



export default function Home() {


  return(
    <div>
      <h1>HELLO THIS IS CHU SIK</h1>
      <Link to="/restaurants">
        <button>Go</button>
      </Link>
      <Link to="/restaurant">
        <button>Go 404</button>
      </Link>
    </div>
  )
}