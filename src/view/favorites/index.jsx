import { useEffect } from "react"
import styles from "./favorite.module.scss"

export default function Favorites() {
  const data = [
    {title: '일식당', writer: '1번', icon: '1.png',},
    {title: '이이식당', writer: '2번', icon: '2.png',},
    {title: '사사삼식당', writer: '3번', icon: '3.png',},
  ]

  useEffect(() => {
    console.log(data)
  })

  return (
    <div>
      <h1>나만의 식당</h1>
    </div>
  )
}