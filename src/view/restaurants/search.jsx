import { useState } from "react"
import styles from "./search.module.scss"
import axios from "axios"

export default function search() {
  const [searchText, setText] = useState(1)
  const [myObject, setObject] = useState({
    id: '',
    title: ''
  })

  const textSearch = (e) => {
    setText(() => e.target.value)
  }

  const search = async() => {
    const response = await axios(`/api/posts/${searchText}`, 
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          'Content-Type':'application/json'
        },
      })
    
    console.log(response)
    if(response.status === 200 && response.data) {
      setObject(() => response.data)
    }

    const response2 = await axios(`https://jsonplaceholder.typicode.com/posts/${searchText}`, 
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Content-Type':'application/json'
      },
    })
  
   console.log(response2)
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