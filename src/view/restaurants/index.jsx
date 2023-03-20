import styles from "./restaurant.module.scss"
import { useEffect, useRef, useState } from 'react'
import { markerData, coffeeData, storeData, categoryImg } from "@/data/markerData";
import store from "@/assets/store.svg"
import coffee from "@/assets/coffee.svg"
import all from "@/assets/all.svg"
import search from "@/assets/search.svg"
import { useNavigate } from "react-router-dom";
import MarekrDetail from "@/components/common/markerDetail"

export default function Restaurants() {    
  const { kakao } = window
  let i = 0, position
  const category = useRef(), tools = useRef(), sectionMap = useRef()
  let [map, setMap] = useState({})
  let [markers, setMarkers] = useState([])
  const [markerDetail, setMarkerDetail] = useState({
    title: '',
    position: '',
    category: '',
  })
  const navigator = useNavigate()
  const size = {
    width: '480px',
    height: 'calc(100vh - 60px)',
  }

  useEffect(()=>{
    kakao.maps.load(() => {
      position = new kakao.maps.LatLng(37.498080946822995, 127.02793242136087)
      map = initMap(position, size)
      setMap(() => {
        return map
      })

      markerData.forEach((marker) => {
        addMarker(marker)
      })
      coffeeData.forEach((marker) => {
        addMarker(marker)
      })
      storeData.forEach((marker) => {
        addMarker(marker)
      })
      
      kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
        addMarker(mouseEvent.latLng)
      })
    })
  }, [])

  const initMap = (position, size) => {
    const background = document.querySelector('#loading_background')
    const loading = document.querySelector('#loading')
    background.removeAttribute('active')
    loading.removeAttribute('active')

    sectionMap.current.style.width = size.width
    sectionMap.current.style.height = size.height

    const options = {
      center: position,
      level: 4,
    };
    const map = new kakao.maps.Map(sectionMap.current, options);
    
    return map 
  }

  /**
   * marker
   */
  const addMarker = (data) => {
    if(!data?.title) {
      data = {
        title: '추가된 데이터' + (i++),
        lat: data.Ma,
        lng: data.La,
        category: 'restaurant'
      }
    }

    const size = 32
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(data.lat, data.lng),
      image: new kakao.maps.MarkerImage(categoryImg[data.category], new kakao.maps.Size(size, size)),
      cateogry: data.category,
      title: data.title
    });

    kakao.maps.event.addListener(marker, 'click', showDetail(map, marker, data.category))
    kakao.maps.event.addListener(marker, 'rightclick', function() {
      alert('marker rightclick!');
    });

    marker.setMap(map);    
    setMarkers((prevState) => {
      return [
        ...prevState, 
        {
          marker,
          category:data.category
        }
      ]
    })
  }

  function showMarkers(id) {
    for (var i = 0; i < markers.length; i++) {
      if(id === 'all') {
        markers[i].marker.setMap(map);
      }else {
        if(id === markers[i].category) {
          markers[i].marker.setMap(map);
        }else {
          markers[i].marker.setMap(null);
        }
      }
    }

    if(id !== markerDetail.category && id !== 'all') {
      setMarkerDetail((prevState) => {
        return { 
          ...prevState, 
          position: "",
          title: undefined,
          category: undefined
        }
      }) 
    }
  }

  const changeMarker = (e) => {
    const target = e.target
    const li = category.current.querySelectorAll('li')
    li.forEach((child) => {
      child.removeAttribute('active')
      child.querySelector('img').removeAttribute('active')
      child.querySelector('span').removeAttribute('active')
    })

    target.setAttribute('active','')
    target.querySelector('img').setAttribute('active','')
    target.querySelector('span').setAttribute('active','')

    showMarkers(target.id);
  }

  const showDetail = (map, marker, category) => {
    return () => {
      map.panTo(marker.getPosition())
      const img = new kakao.maps.MarkerImage(categoryImg[category], new kakao.maps.Size(32, 32))
      const reactImg = new kakao.maps.MarkerImage(new URL('@/assets/react.svg', import.meta.url).href, new kakao.maps.Size(18, 18))

      marker.setImage(reactImg)

      setMarkerDetail((prevState) => {
        return { 
          ...prevState, 
          position: marker.getPosition(),
          title: marker.getTitle(),
          category: category
        }
      })
    }
  }

  const searchRestaurant = () => {
    navigator(`/restaurants/search`)
  }

  return (
    <div>
      <div id="loading_background" className={styles.loading_background} active=""></div>
      <div id="loading" className={styles.lds_roller} active=""><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <section className={styles.map} id="map" ref={sectionMap}/>
      <div className={styles.category} ref={category}>
        <ul>
          <li id="all" active="" onClick={changeMarker}>
            <img src={all} active=""/>
            <span active="">전체</span>
          </li>
          <li id="cafe" onClick={changeMarker}>
            <img src={coffee} />
            <span>카페</span>
          </li>
          <li id="store" onClick={changeMarker}>
            <img src={store} />
            <span>가게</span>
          </li>
        </ul>
      </div>
      <div className={styles.tools} ref={tools}>
        <ul>
          <li onClick={searchRestaurant}>
            <img src={search} />
          </li>
        </ul>
      </div>
      <MarekrDetail marker={markerDetail}/>
    </div>
  )
}