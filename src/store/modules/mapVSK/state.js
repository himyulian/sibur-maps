import L from 'leaflet'

export default {
  loading: false,
  mapInstanceVSK: {
    crs: L.CRS.EPSG3395,
    zoom: 16,
    center: [51.627513, 39.242946],
    bounds: null,
    padding: [50, 50, 50, 50]
  },
  tile: {
    // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    url: 'https://vec{s}.maps.yandex.net/tiles?l=map&v=19.06.06-0&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
    options: {
      subdomains: ['01', '02', '03', '04'],
      attribution: '<a href="https://yandex.ru" target="_blank">Яндекс</a>'
    }
  },
  styles: {
    landuse: {
      color: 'teal'
    },
    construnctions: {
      color: 'teal',
      fillOpacity: 1
    },
    roads: {
      color: 'white',
      fillOpacity: 1
    },
    railways: {
      b: {
        color: 'black',
        weight: '3',
        fillOpacity: 1
      },
      w: {
        color: 'white',
        weight: '1.5',
        fillOpacity: 1,
        dashArray: '12'
      }
    }
  },
  markers: {
    m1: [51.62806, 39.233891]
  },
  mapVSK: null
}
