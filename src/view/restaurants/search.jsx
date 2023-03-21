import { useState } from "react"
import styles from "./search.module.scss"

export default function Search() {
  const [searchText, setText] = useState("")
  const [myObject, setObject] = useState({
    id: '',
    title: ''
  })

  const textSearch = (e) => {
    setText(() => e.target.value)
  }

  const search = async (e) => {
    e.preventDefault();

    if(parseInt(searchText) < 30){
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
  }

  return (
    <div className={styles.search}>
      <form className={styles.search__input} onSubmit={search}>
        <input value={searchText} 
          onInput={textSearch}/>
        <button onClick={search}></button>
      </form>
      {searchText.length > 0 &&
      <div>
        <span>"{searchText}" 검색 목록</span>
      </div>
      }
      {myObject.title}
    </div>
  )
}