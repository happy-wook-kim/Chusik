import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigator = useNavigate()

  useEffect(() => {
    navigator('/map', { replace: true })
  }, [])
}