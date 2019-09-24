import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const MyCustomMarker = Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 24),
    iconUrl: 'link/to/image.png'
  }
})

export const drawControlOptions = {
  position: 'topleft',
  draw: {
    marker: {
      // icon: new MyCustomMarker()
    },
    polyline: {
      shapeOptions: {
        color: '#FF0000',
        weight: 10
      }
    },
    polygon: false /* {
        allowIntersection: false, // Restricts shapes to simple polygons
        drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
        },
        shapeOptions: {
            color: '#bada55'
        }
    } */,
    circle: false, // Turns off this drawing tool
    circlemarker: false, // Turns off this drawing tool
    rectangle: false/* {
        shapeOptions: {
            clickable: false
        }
    } */
  }
  // edit: {
  //     featureGroup: editableLayers, //REQUIRED!!
  //     remove: false
  // }
}

export const drawLocalOptions = {
  draw: {
    toolbar: {
      // #TODO: this should be reorganized where actions are nested in actions
      // ex: actions.undo  or actions.cancel
      actions: {
        title: 'Отменить добавление',
        text: 'Отмена'
      },
      finish: {
        title: 'Закончить рисование линии',
        text: 'Закончить'
      },
      undo: {
        title: 'Удалить предыдущую точку',
        text: 'Удалить пред.'
      },
      buttons: {
        marker: 'Добавить маркер',
        polyline: 'Добавить линию',
        polygon: '- your text-',
        rectangle: '- your text-',
        circle: '- your text-',
        circlemarker: '- your text-'
      }
    },
    handlers: {
      circle: {
        tooltip: {
          start: '- your text-'
        },
        radius: '- your text-'
      },
      circlemarker: {
        tooltip: {
          start: '- your text-.'
        }
      },
      marker: {
        tooltip: {
          start: 'Выберите место на карте'
        }
      },
      polygon: {
        tooltip: {
          start: '- your text-.',
          cont: '- your text-.',
          end: '- your text-.'
        }
      },
      polyline: {
        error: '<strong>Error:</strong> shape edges cannot cross!',
        tooltip: {
          start: 'Выберите точку начала линии.',
          cont: 'Выберите следующую точку.',
          end: 'Нажмите "Закончить" для завершения.'
        }
      },
      rectangle: {
        tooltip: {
          start: '- your text-.'
        }
      },
      simpleshape: {
        tooltip: {
          end: 'Release mouse to finish drawing.'
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: 'Save changes',
          text: 'Save'
        },
        cancel: {
          title: 'Cancel editing, discards all changes',
          text: 'Cancel'
        },
        clearAll: {
          title: 'Clear all layers',
          text: 'Clear All'
        }
      },
      buttons: {
        edit: 'Edit layers',
        editDisabled: 'No layers to edit',
        remove: 'Delete layers',
        removeDisabled: 'No layers to delete'
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: 'Drag handles or markers to edit features.',
          subtext: 'Click cancel to undo changes.'
        }
      },
      remove: {
        tooltip: {
          text: 'Click on a feature to remove.'
        }
      }
    }
  }
}

// "async" is optional
export default async ({ /* app, router, Vue, ... */ }) => {
  // this part resolve an issue where the markers would not appear
}
