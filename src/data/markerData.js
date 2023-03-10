export const markerData = [
  {
    title: '강남역 쉐르빌',
    lat: 37.492367869237434,
    lng: 127.03072897688642,
    category: 'home'
  },
  {
    title: "콜드스퀘어",
    lat: 37.49168745888284, 
    lng: 127.03129973740876,
    category: 'building'
  },
  {
    title: "하남돼지집",
    lat: 37.490842424005616,
    lng: 127.030583774403176,
    category: 'restaurant'
  },
  {
    title: "수유리우동",
    lat: 37.494915253753194,
    lng: 127.0315122688059974,
    category: 'restaurant'
  },
  {
    title: "맛닭꼬",
    lat: 37.49456273069659,
    lng: 127.0315211256646381,
    category: 'restaurant'
  },
]

// 커피숍 마커가 표시될 좌표 배열입니다
export const coffeeData = [ 
  {
    title: '1번 커피',
    lat: 37.498553760499505,
    lng: 127.02882598822454,
    category: 'cafe'
  },
  {
    title: '2번 커피',
    lat: 37.497625593121384,
    lng: 127.02935713582038,
    category: 'cafe'
  },
  {
    title: '3번 커피',
    lat: 37.49646391248451,
    lng: 127.02675574250912,
    category: 'cafe'
  },
  {
    title: '4번 커피',
    lat: 37.49629291770947,
    lng: 127.02587362608637,
    category: 'cafe'
  },
  {
    title: '5번 커피',
    lat: 37.49754540521486,
    lng: 127.02546694890695,
    category: 'cafe'
  },
  {
    title: '6번 커피',
    lat: 37.499590490909185,
    lng: 127.0263723554437,
    category: 'cafe'
  },
  {
    title: '7번 커피',
    lat: 37.499427948430814,
    lng: 127.02794423197847,
    category: 'cafe'
  },
];

// 편의점 마커가 표시될 좌표 배열입니다
export const storeData = [
  {
    title: '1번 스토어',
    lat: 37.49996818951873,
    lng: 127.02943721562295,
    category: 'store'
  },
  {
    title: '2번 스토어',
    lat: 37.49932849491523,
    lng: 127.02935780247945,
    category: 'store'
  },
  {
    title: '3번 스토어',
    lat: 37.49640098874988,
    lng: 127.02609983175294,
    category: 'store'
  },
  {
    title: '4번 스토어',
    lat: 37.49640072567703,
    lng: 127.02726459882308,
    category: 'store'
  },
  {
    title: '5번 스토어',
    lat: 37.496201943633714,
    lng: 127.02959405469642,
    category: 'store'
  },
  {
    title: '6번 스토어',
    lat: 37.49671536281186,
    lng: 127.03020491448352,
    category: 'store'
  },
  {
    title: '7번 스토어',
    lat: 37.497535461505684,
    lng: 127.02948149502778,
    category: 'store'
  },
];

export const categoryImg = {
  'restaurant': new URL('/chusik_64x64.png', import.meta.url).href,
  'store': new URL('../../src/assets/store.png', import.meta.url).href,
  'home': new URL('../../src/assets/home.png', import.meta.url).href,
  'cafe': new URL('../../src/assets/cafe.png', import.meta.url).href,
  'building': new URL('../../src/assets/building.png', import.meta.url).href,
}