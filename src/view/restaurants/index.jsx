import infoStore from "../../stores/info";
import styles from "./restaurant.module.scss"
import { useEffect } from 'react'
import { markerData, coffeeData, storeData, categoryImg } from "../../data/markerData";
import store from "../../assets/store.svg"
import coffee from "../../assets/coffee.svg"
import all from "../../assets/all.svg"

export default function Restaurants() {    
  let map, markers = [], i = 0, markerImage

  useEffect(()=>{
    const script = document.createElement("script");
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        map = initMap()
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        /**
         * marker
         */
        markerData.forEach((marker) => {
          // 마커를 생성합니다
          addMarker(marker)
        })
        coffeeData.forEach((marker) => {
          addMarker(marker)
        })
        storeData.forEach((marker) => {
          addMarker(marker)
        })

        console.log(markers)
        
        /**
         * event
         */
        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
          addMarker(mouseEvent.latLng)
        })
      })
    }
  }, [])

  const initMap = () => {
    const background = document.querySelector('#loading_background')
    const loading = document.querySelector('#loading')
    background.removeAttribute('active')
    loading.removeAttribute('active')

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.498080946822995, 127.02793242136087),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    
    return map 
  }

  /**
   * infoWindow
   */
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
      infowindow.getMap()
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }

  /**
   * marker
   */

  // 마커를 생성하고 지도위에 표시하는 함수입니다
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
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(data.lat, data.lng),
      image: new kakao.maps.MarkerImage(categoryImg[data.category], new kakao.maps.Size(size, size)),
      cateogry: data.category
    });

    const infoWindow = new kakao.maps.InfoWindow({
      // map: map,
      content: `<div style="padding:5px; font-size:0.85rem;">${data.title}</div>`,
      position: new kakao.maps.LatLng(marker.lat, marker.lng),
      removable: true
    })

    kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infoWindow))

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    
    // 생성된 마커를 배열에 추가합니다
    markers.push({marker, category:data.category});
  }

  // 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
  function showMarkers(id) {
    console.log(id)
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
  }

  const changeMarker = (e) => {
    const target = e.target
    const li = document.querySelectorAll('li')
    li.forEach((child) => {
      child.removeAttribute('active')
      child.querySelector('img').removeAttribute('active')
      child.querySelector('span').removeAttribute('active')
    })

    console.log(target)
    target.setAttribute('active','')
    target.querySelector('img').setAttribute('active','')
    target.querySelector('span').setAttribute('active','')

    showMarkers(target.id);
  }

  return (
    <div>
      <div id="loading_background" className={styles.loading_background} active=""></div>
      <div id="loading" className={styles.lds_roller} active=""><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <section className={styles.map} id="map" />
      <div className={styles.category}>
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
    </div>
  )
}