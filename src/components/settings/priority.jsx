import { useEffect, useRef, useState } from 'react'
import styles from './priority.module.scss'

export default function priority({ priority, index, datas, setData }) {
  const section = useRef()
  const [myIndex, setIndex] = useState(0)
  const [targetIndex, setTargetIndex] = useState(0)
  const [shifting, setShifting] = useState(false)

  const onDragStart = (e) => {
    console.log('DS', datas)
    const index = e.target.getAttribute('item-index')
    console.log('myIndex: ',index)
    setIndex(index)
    setShifting(true)
  }

  const onDragEnter = (e) => {
    const index = e.target.getAttribute('item-index')
    if(index !== myIndex){
      console.log('targetIndex: ', index)
      setTargetIndex(index)    
      console.log(myIndex, targetIndex)
      const data = datas
      const item = data.splice(section.current, 1)
      data.splice(targetIndex, 0, item[0])
      setData(() => {
        return [
          ...data
        ]
      })  
    }
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDragEnd = () => {

  }

  return (
    <section
      className={styles.priority}
      draggable="true"
      ref={section}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      item-index={index}>
      <img src={priority.img} alt="icon"/>
      <span>{priority.title}</span>
    </section>
  )
}