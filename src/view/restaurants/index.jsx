import infoStore from "../../stores/info";
import styles from "./restaurant.module.scss"
import { useEffect } from 'react'
import { markerData, coffeeData, storeData } from "../../data/markerData";
import store from "../../assets/store.svg"
import coffee from "../../assets/coffee.svg"

export default function Restaurants() {
  var imageSrc = '../../../public/chusik_64x64.png' // 마커이미지의 주소입니다    
    
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
        markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(32, 32))

        /**
         * marker
         */
        markerData.forEach((marker) => {
          // 마커를 생성합니다
          addMarker(marker)
        });

        console.log(markers)
        
        /**
         * event
         */
        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
          addMarker(mouseEvent.latLng);
        });
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
      level: 5,
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
        lng: data.La
      }
    }

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(data.lat, data.lng),
      image: markerImage
    });

    console.log(data.title)

    const infoWindow = new kakao.maps.InfoWindow({
      // map: map,
      content: `<div style="padding:5px; font-size:0.85rem;">${data.title}</div>`,
      position: new kakao.maps.LatLng(marker.lat, marker.lng),
      // removable: true
    })

    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infoWindow))
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infoWindow))

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    
    // 생성된 마커를 배열에 추가합니다
    markers.push(marker);
  }

  // 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
  function setCoffeeMarkers() {       
    coffeeData.forEach((marker) => {
      // 마커를 생성합니다
      const markers = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(marker.lat, marker.lng),
        //마커에 hover시 나타날 title
        title: marker.title,
      });
    })    
  }


  // 편의점 마커들의 지도 표시 여부를 설정하는 함수입니다
  function setStoreMarkers() {
    storeData.forEach((marker) => {
      // 마커를 생성합니다
      const markers = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(marker.lat, marker.lng),
        //마커에 hover시 나타날 title
        title: marker.title,
      });
    })       
  }

  const changeMarker = (e) => {
    const target = e.target
    const li = document.querySelectorAll('li')
    li.forEach((child) => {
      child.removeAttribute('active')
      child.querySelector('img').removeAttribute('active')
      child.querySelector('span').removeAttribute('active')
    })

    target.setAttribute('active','')
    target.querySelector('img').setAttribute('active','')
    target.querySelector('span').setAttribute('active','')

    const coffeeMenu = document.getElementById('coffeeMenu');
    const storeMenu = document.getElementById('storeMenu');

    // 커피숍 카테고리가 클릭됐을 때
    if (target.id === 'coffeeMenu') {
      // 커피숍 마커들만 지도에 표시하도록 설정합니다
      setCoffeeMarkers();
    } else if (target.id === 'storeMenu') {
      // 편의점 마커들만 지도에 표시하도록 설정합니다
      setStoreMarkers();
    }  
  }

  return (
    <div>
      <div id="loading_background" className={styles.loading_background} active=""></div>
      <div id="loading" className={styles.lds_roller} active=""><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <section className={styles.map} id="map" />
      <div className={styles.category}>
        <ul>
          <li id="coffeeMenu" onClick={changeMarker} active="">
            <img src={coffee} active=""/>
            <span active="">커피</span>
          </li>
          <li id="storeMenu" onClick={changeMarker}>
            <img src={store} />
            <span>편의점</span>
          </li>
        </ul>
      </div>
    </div>
  )
}