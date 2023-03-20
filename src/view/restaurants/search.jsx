import { useState } from "react"
import styles from "./search.module.scss"

export default function search() {
  const [searchText, setText] = useState("")
  const [myObject, setObject] = useState({
    id: '',
    title: ''
  })

  const textSearch = (e) => {
    setText(() => e.target.value)
  }

  const search = async() => {
    const response = await fetch(`/api/posts/${searchText}`)
    console.log(response)
    const json = await response.json()
    console.log(json)
    if(response.ok) {
      setObject(() => {
        return {
          ...json
        }
      })
    }
  }

  return (
    <div>
      <h1>search!</h1>
      <input value={searchText} 
        onInput={textSearch}/>
      <button onClick={search}></button>
      {searchText.length > 0 &&
      <div>
        <span>"{searchText}" 검색 목록</span>
      </div>
      }
      {myObject.title}
    </div>
  )
}