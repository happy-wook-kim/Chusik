import { useEffect, useRef, useState } from 'react'
import styles from './priority.module.scss'

export default function priority({ priority, index, enter  }) {
  const dragItem = useRef()
  const dragOverItem = useRef()

  const dragStart = (e, position) => {
    dragItem.current = position
  }
  const dragEnter = (e) => {
    dragOverItem.current = parseInt(e.target.getAttribute('item-index'));
    enter(dragOverItem.current)
    console.log(dragOverItem.current)
  };

  return (
    <section item-index={index} className={styles.priority} draggable 
      onDragStart={(e) => dragStart(e, index)}
      onDragEnter={(e) => dragEnter(e)}
      onDragOver={(e) => e.preventDefault()}>
      <img src={priority.img} alt="icon"/>
      <span>{priority.title}</span>
    </section>
  )
}