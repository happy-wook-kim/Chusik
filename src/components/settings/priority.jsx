import { useEffect, useRef, useState } from 'react'
import styles from './priority.module.scss'

export default function priority({ priority, index, start, enter  }) {

  const dragStart = (e) => {
    start(parseInt(e.target.getAttribute('item-index')))
  }
  const dragEnter = (e) => {
    enter(parseInt(e.target.getAttribute('item-index')))
  };

  return (
    <section item-index={index} className={styles.priority} draggable 
      onDragStart={(e) => dragStart(e, index)}
      onDragEnter={(e) => dragEnter(e)}
      onDragOver={(e) => e.preventDefault()}>
      <img src={priority?.img} alt="icon"/>
      <span>{priority?.title}</span>
    </section>
  )
}