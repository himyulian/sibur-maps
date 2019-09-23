import L from 'leaflet'

export default {
  loading: false,
  mapVSK: null,
  mapInstance: {
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
  exampleMarkers: [
    {
      Id: 777,
      Title: 'ЗУ - 1',
      CoordPoint: [51.629331, 39.231754],
    },
    {
      Id: 888,
      Title: 'ЗУ - 2',
      CoordPoint: [51.629024, 39.232452],
    },
    {
      Id: 999,
      Title: 'Пожарная часть',
      CoordPoint: [51.628890, 39.233514],
    },
  ],
  examplePolylines: [
    {
      Id: 11,
      Title: '11',
      CoordPolyline: [
        [51.62823954198548, 39.23455953598023],
        [51.627331414050964, 39.23964500427247],
        [51.628479925733075, 39.24013853073121],
        [51.62795909266173, 39.24307823181153]
      ],
    },
  ],
}
