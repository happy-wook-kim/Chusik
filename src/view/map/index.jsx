import styles from "./map.module.scss"
import { useEffect, useRef, useState } from 'react'
import { markerData, coffeeData, storeData, categoryImg } from "@/data/markerData"
import store from "@/assets/store.svg"
import coffee from "@/assets/coffee.svg"
import all from "@/assets/all.svg"
import search from "@/assets/search.svg"
import { useLocation, useNavigate } from "react-router-dom"
import MarekrDetail from "@/components/common/markerDetail"
import { restaurantsData } from "@/data/restaurantData"
import RestaurantCard from "@/components/map/restaurantCard"
import GPSButton from "@/components/map/gpsButton"

export default function Restaurants() {    
  const { kakao } = window
  let i = 0, latlng = [37.498080946822995, 127.02793242136087], searchedMarker, clickedMarker = {}
  const category = useRef(), tools = useRef(), sectionMap = useRef()
  const navigator = useNavigate(), location = useLocation()
  let [map, setMap] = useState({})
  let [position, setPosition] = useState({})
  let [markers, setMarkers] = useState([])
  const [reset, setReset] = useState(false)
  const [countRender, setCounter] = useState(0)
  let [markerDetail, setMarkerDetail] = useState({
    title: '',
    position: '',
    category: '',
  })
  const [suggestion, setSuggestion] = useState([])
  const markerDetailRef = useRef()

  useEffect(()=>{
    setSuggestion(restaurantsData)
    if(location.state) getQuery()
    kakao.maps.load(() => {
      position = initPosition()
      setPosition(position)
      map = initMap(position)
      setMap(map)
      if(location.state){
        searchedMarker = location.state.data
        addMarker(searchedMarker, "search")
        setMarkerDetail(() => {
          return { 
            position: new kakao.maps.LatLng(location.state.data.lat, location.state.data.lng),
            title: location.state.data.title,
            category: location.state.data.category,
            mode: 'search'
          }
        })
      }else {
        initMarkers()
        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
          addMarker(mouseEvent.latLng)
        })
      }
    })
  }, [])

  useEffect(() => {
    if(countRender > 0) {
      markers[0].marker.setMap(null)
      markers.splice(0, 1)
      navigator(`/map`)
      initMarkers()
    }
  }, [reset])

  const initMap = () => {
    const background = document.querySelector('#loading_background')
    const loading = document.querySelector('#loading')
    background.removeAttribute('active')
    loading.removeAttribute('active')

    const options = {
      center: position,
      level: 4,
    }
    
    return new kakao.maps.Map(sectionMap.current, options) 
  }

  const initPosition = () => {
    return new kakao.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]))
  }

  const initMarkers = () => {
    markerData.forEach((marker) => {
      addMarker(marker)
    })
    coffeeData.forEach((marker) => {
      addMarker(marker)
    })
    storeData.forEach((marker) => {
      addMarker(marker)
    })
  }

  /**
   * marker
   */
  const addMarker = (data, type=undefined) => {
    if(!data?.title) {
      data = {
        title: '추가된 데이터' + (i++),
        lat: data.Ma,
        lng: data.La,
        category: 'restaurant'
      }
    }

    let size = 32
    if(type === "search") size = 64
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

    markerDetailRef.current.close()
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
      
      const img = new kakao.maps.MarkerImage(categoryImg[category], new kakao.maps.Size(64, 64))
      marker.setImage(img)

      if(clickedMarker?.marker) {
        const orgImg = new kakao.maps.MarkerImage(categoryImg[clickedMarker.category], new kakao.maps.Size(32, 32))
        clickedMarker.marker.setImage(orgImg)
      }

      setMarkerDetail((prevState) => {
        return { 
          ...prevState, 
          marker,
          position: marker.getPosition(),
          title: marker.getTitle(),
          category: category
        }
      })
      clickedMarker['marker'] = marker
      clickedMarker['category'] = category
    }
  }

  const searchRestaurant = () => {
    navigator(`./search`)
  }

  /**
   * =를 만나면 앞을 key, 뒤를 value. 단, &를 만나기 전까지
   */
  const getQuery = () => {
    if(location.state?.data?.lat) latlng[0] = location.state?.data?.lat
    if(location.state?.data?.lng) latlng[1] = location.state?.data?.lng
  }

  const resetState = () => {
    if(!reset) {
      setCounter(countRender + 1)
      setReset(() => true)
    }
  }

  const closeSuggestion = (data) => {
    setSuggestion([...data])
  }

  return (
    <div>
      <div id="loading_background" className={styles.loading_background} active=""></div>
      <div id="loading" className={styles.lds_roller} active=""><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <section className={styles.map} id="map" ref={sectionMap}/>
      {/* {suggestion?.map((data) => 
        <RestaurantCard setList={closeSuggestion} list={suggestion} info={data} key={data.title}/>
      )} */}
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
      <GPSButton setPosition={setPosition}/>
      <MarekrDetail marker={markerDetail} resetState={resetState} ref={markerDetailRef}/>
    </div>
  )
}