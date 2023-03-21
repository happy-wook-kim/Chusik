import { useState } from "react"
import styles from "./search.module.scss"
import searchIcon from "@/assets/search.svg"
import { tmp } from "@/data/searchData"
import { categoryImg } from "@/data/markerData"
import { useNavigate } from "react-router-dom"

export default function Search() {
  const [searchText, setText] = useState("")
  const [result, setResult] = useState([])
  const navigator = useNavigate()

  const textSearch = (e) => {
    setText(() => e.target.value)
  }

  const search = async (e) => {
    e.preventDefault();

    setTimeout(() => {
      setResult((prev) => {
        return [
          ...prev, 
          ...tmp
        ]
      })
    }, 500);

    // if(parseInt(searchText) < 30){
    //   const response = await fetch(`/api/posts/${searchText}`)
    //   console.log(response)
    //   const json = await response.json()
    //   console.log(json)
    //   if(response.ok) {
    //     setObject(() => {
    //       return {
    //         ...json
    //       }
    //     })
    //   }
    // }
  }

  const gotoResult = (e) => {
    const target = e.target
    const index = target.getAttribute('item-index')
    const item = result[index]
    navigator(`/restaurants?lat=${item.lat}&lng=${item.lng}`, { state: { data: item}})
  }

  return (
    <div className={styles.search}>
      <form className={styles.search__input} onSubmit={search}>
        <input value={searchText} 
          onInput={textSearch}/>
        <button onClick={search}>
          <img src={searchIcon}/>
        </button>
      </form>
      {searchText.length > 0 &&
      <div className={styles.search__guide}>
        <span>"{searchText}" 검색 목록</span>
      </div>
      }
      <section className={styles.search__results}>
        {result?.map((result,i) => 
          <section key={result.id} className={styles.search__results__result} onClick={gotoResult} item-index={i}>
            <img src={categoryImg[result.category]} />
            <span>{result.title}</span>
            <small>{result.lat} / {result.lng}</small>
          </section>
        )}
      </section>
    </div>
  )
}