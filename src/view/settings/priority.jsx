import styles from './priority.module.scss'
import Priority from '@/components/settings/priority'
import { useRef, useState } from 'react';
import BackButton from '@/components/common/backButton';

export default function SetPriority() {
  const [datas, setData] = useState([
    {title: '맛', img: new URL('@/assets/taste.png', import.meta.url).href},
    {title: '가격', img: new URL('@/assets/money.svg', import.meta.url).href},
    {title: '위치', img: new URL('@/assets/location.svg', import.meta.url).href},
    {title: '서비스', img: new URL('@/assets/service.png', import.meta.url).href},
    {title: '인테리어', img: new URL('@/assets/interior.png', import.meta.url).href},
    {title: '주차', img: new URL('@/assets/park.svg', import.meta.url).href},
    {title: '넓은 좌석', img: new URL('@/assets/broad.svg', import.meta.url).href},
    {title: '제로 페이', img: new URL('@/assets/pay.svg', import.meta.url).href},
  ])

  const dragItem = useRef()
  const dragOverItem = useRef()

  const dragStartHandler = (position) => {
    dragItem.current = position;
  }

  const dragEnterHandler = (position) => {
    dragOverItem.current = position;
    const copyListItems = [...datas];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // dragItem.current = dragOverItem.current;
    setData(copyListItems);
  }

  return (
    <div>
      <section className="header">
        <BackButton />
        <h2>내가 좋아하는 식당은?</h2>
      </section>
        <div className={styles.priority}>
          {datas.map((data,i) => (
            <Priority 
              key={i}
              priority={data}
              index={i}
              start={dragStartHandler}
              enter={dragEnterHandler}
            />
            
            // <section className={styles.priority}>
            //   <img src={data.img} alt="icon" draggable
            //     onDragStart={(e) => dragStart(e, i)}
            //     onDragEnter={() => dragEnter(i)}
            //     onDragOver={(e) => e.preventDefault()}/>
            //   <span>{data.title}</span>
            // </section>
            ))
          }
        </div>
    </div>
  )
}