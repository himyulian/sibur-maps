import L from 'leaflet'

export default {
  loadingStatus: 'notLoading',
  data: [],
  mapInstance: {
    // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    url: 'https://vec{s}.maps.yandex.net/tiles?l=map&v=19.06.06-0&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
    crs: L.CRS.EPSG3395,
    zoom: 16,
    center: [51.627513, 39.242946],
    bounds: null,
    padding: [50, 50, 50, 50],
    options: {
      subdomains: ['01', '02', '03', '04'],
      attribution: '<a href="https://yandex.ru" target="_blank">Яндекс</a>'
    }
  },
  markers: {
    m1: [51.628060, 39.233891]
  },
  mapVsk: null
}
