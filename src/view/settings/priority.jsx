import styles from './priority.module.scss'
import Priority from '@/components/settings/priority'
import { useRef, useState } from 'react';
import BackButton from '@/components/common/backButton';

export default function SetPriority() {
  const [datas, setData] = useState([
    {title: '맛', img: new URL('@/assets/taste.png', import.meta.url).href},
    {title: '가격', img: new URL('@/assets/money.svg', import.meta.url).href},
    {title: '서비스', img: new URL('@/assets/service.png', import.meta.url).href},
    {title: '인테리어', img: new URL('@/assets/interior.png', import.meta.url).href},
    {title: '위치', img: new URL('@/assets/location.svg', import.meta.url).href},
    {title: '주차', img: new URL('@/assets/park.svg', import.meta.url).href},
    {title: '넓은 좌석', img: new URL('@/assets/broad.svg', import.meta.url).href},
    {title: '제로 페이', img: new URL('@/assets/pay.svg', import.meta.url).href},
  ])

  const onDragEnd = () => {

  }

  return (
    <div>
      <section className="header">
        <BackButton />
        <h2>내가 좋아하는 식당은?</h2>
      </section>
        <div className={styles.priority}>
            {datas.map((data,i) => 
              <Priority 
                key={data.title}
                priority={data}
                index={i}
                datas={datas}
                setData={setData}
              />
            )}
        </div>
    </div>
  )
}