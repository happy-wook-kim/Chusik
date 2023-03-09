import { Link, Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";

export default function Home() {

  return(
    <div>
      <Navigate to="/restaurants" />
    </div>
  )
}