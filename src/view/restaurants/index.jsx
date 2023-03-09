import infoStore from "../../stores/info";
import styles from "./restaurant.module.scss"
import { useEffect } from 'react'
import { markerData, coffeePositions, storePositions } from "../../data/markerData";
import store from "../../assets/store.svg"
import coffee from "../../assets/coffee.svg"

export default function Restaurants() {
  const markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
  let coffeeMarkers = [], // 커피숍 마커 객체를 가지고 있을 배열입니다
  storeMarkers = [] // 편의점 마커 객체를 가지고 있을 배열입니다

  useEffect(()=>{
    const script = document.createElement("script");
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const background = document.querySelector('#loading_background')
        const loading = document.querySelector('#loading')
        background.removeAttribute('active')
        loading.removeAttribute('active')

        const map = initMap()

        /**
         * marker
         */
        markerData.forEach((marker) => {
          // 마커를 생성합니다
          const markers = new kakao.maps.Marker({
            //마커가 표시 될 지도
            map: map,
            //마커가 표시 될 위치
            position: new kakao.maps.LatLng(marker.lat, marker.lng),
            //마커에 hover시 나타날 title
            title: marker.title,
          });
    
          const infoWindow = new kakao.maps.InfoWindow({
            // map: map,
            content: `<div style="padding:5px; font-size:0.85rem;">${marker.title}</div>`,
            position: new kakao.maps.LatLng(marker.lat, marker.lng),
            // removable: true
          })
    
          kakao.maps.event.addListener(markers, 'mouseover', makeOverListener(map, markers, infoWindow))
      
          kakao.maps.event.addListener(markers, 'mouseout', makeOutListener(infoWindow))
        });
        
        createCoffeeMarkers(); // 커피숍 마커를 생성하고 커피숍 마커 배열에 추가합니다
        createStoreMarkers(); // 편의점 마커를 생성하고 편의점 마커 배열에 추가합니다
    
        // changeMarker('coffee'); // 지도에 커피숍 마커가 보이도록 설정합니다   
        
        // 커피숍 마커를 생성하고 커피숍 마커 배열에 추가하는 함수입니다
        function createCoffeeMarkers() {
          for (var i = 0; i < coffeePositions.length; i++) {  
            var imageSize = new kakao.maps.Size(22, 26),
                imageOptions = {  
                  spriteOrigin: new kakao.maps.Point(10, 0),    
                  spriteSize: new kakao.maps.Size(36, 98)  
                };     
            
            // 마커이미지와 마커를 생성합니다
            var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
                marker = createMarker(coffeePositions[i], markerImage);  
            
            // 생성된 마커를 커피숍 마커 배열에 추가합니다
            coffeeMarkers.push(marker);
          }     
        }
    
        // 편의점 마커를 생성하고 편의점 마커 배열에 추가하는 함수입니다
        function createStoreMarkers() {
          for (var i = 0; i < storePositions.length; i++) {
            var imageSize = new kakao.maps.Size(22, 26),
                imageOptions = {   
                  spriteOrigin: new kakao.maps.Point(10, 36),    
                  spriteSize: new kakao.maps.Size(36, 98)  
                };       
        
            // 마커이미지와 마커를 생성합니다
            var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
                marker = createMarker(storePositions[i], markerImage);  
    
            // 생성된 마커를 편의점 마커 배열에 추가합니다
            storeMarkers.push(marker);    
          }        
        }
    
        // 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
        function changeMarker(type){
          var coffeeMenu = document.getElementById('coffeeMenu');
          var storeMenu = document.getElementById('storeMenu');
          
          // 커피숍 카테고리가 클릭됐을 때
          if (type === 'coffee') {
            // 커피숍 카테고리를 선택된 스타일로 변경하고
            coffeeMenu.className = 'menu_selected';
            
            // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
            storeMenu.className = '';
            
            // 커피숍 마커들만 지도에 표시하도록 설정합니다
            setCoffeeMarkers(map);
            setStoreMarkers(null);
          } else if (type === 'store') { // 편의점 카테고리가 클릭됐을 때   
            // 편의점 카테고리를 선택된 스타일로 변경하고
            coffeeMenu.className = '';
            storeMenu.className = 'menu_selected';
            
            // 편의점 마커들만 지도에 표시하도록 설정합니다
            setCoffeeMarkers(null);
            setStoreMarkers(map);
          }  
        } 
        
        /**
         * event
         */
        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
            alert(mouseEvent.latLng.toString());
          });
      })
    }

    }, [])


  const initMap = () => {
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
  // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
  function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;            
  }

  // 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
  function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
      position: position,
      image: image
    });
    
    return marker;  
  }   

  // 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
  function setCoffeeMarkers(map) {        
    for (var i = 0; i < coffeeMarkers.length; i++) {  
      coffeeMarkers[i].setMap(map);
    }        
  }

  // 편의점 마커들의 지도 표시 여부를 설정하는 함수입니다
  function setStoreMarkers(map) {        
    for (var i = 0; i < storeMarkers.length; i++) {  
      storeMarkers[i].setMap(map);
    }        
  }

  // 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
  function changeMarker(type){
    const coffeeMenu = document.getElementById('coffeeMenu');
    const storeMenu = document.getElementById('storeMenu');

    console.log(coffeeMenu, storeMenu)
    
    // 커피숍 카테고리가 클릭됐을 때
    if (type === 'coffee') {
      // 커피숍 카테고리를 선택된 스타일로 변경하고
      coffeeMenu.className = 'menu_selected';
      
      // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
      storeMenu.className = '';
      
      // 커피숍 마커들만 지도에 표시하도록 설정합니다
      setCoffeeMarkers(map);
      setStoreMarkers(null);
    } else if (type === 'store') { // 편의점 카테고리가 클릭됐을 때   
      // 편의점 카테고리를 선택된 스타일로 변경하고
      coffeeMenu.className = '';
      storeMenu.className = 'menu_selected';
      
      // 편의점 마커들만 지도에 표시하도록 설정합니다
      setCoffeeMarkers(null);
      setStoreMarkers(map);
    }  
  } 

  const test = (e) => {
    const li = document.querySelectorAll('li')
    li.forEach((child) => {
      child.removeAttribute('active')
      child.querySelector('img').removeAttribute('active')
      child.querySelector('span').removeAttribute('active')
    })

    e.target.setAttribute('active','')
    e.target.querySelector('img').setAttribute('active','')
    e.target.querySelector('span').setAttribute('active','')
  }

  return (
    <div>
      <div id="loading_background" className={styles.loading_background} active=""></div>
      <div id="loading" className={styles.lds_roller} active=""><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <section className={styles.map} id="map" />
      <div className={styles.category}>
        <ul>
          <li id="coffeeMenu" onClick={test} active="">
            <img src={coffee} active=""/>
            <span active="">커피</span>
          </li>
          <li id="storeMenu" onClick={test}>
            <img src={store} />
            <span>편의점</span>
          </li>
        </ul>
      </div>
    </div>
  )
}