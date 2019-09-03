<template>
	<q-page>
		<l-map
			ref="VSK"
			style="min-height: calc(-50px + 100vh);"
			:crs="mapInstanceVSK.crs"
			:key="mapInstanceVSK.crs.code"
			:zoom="mapInstanceVSK.zoom"
			:center="mapInstanceVSK.center"
			:padding="mapInstanceVSK.padding"
			@update:zoom="zoomUpdated"
			@update:center="centerUpdated"
			@update:bounds="boundsUpdated"
		>
			<l-tile-layer :url="tile.url" :options="tile.options"></l-tile-layer>

			<l-geo-json :geojson="getFeaturesVSKMainLanduse" :optionsStyle="styles.landuse"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKMainRoads" :optionsStyle="styles.roads"></l-geo-json>
			<l-geo-json
				:geojson="getFeaturesVSKMainConstrunctions"
				:optionsStyle="styles.construnctions"
				:options="options"
			></l-geo-json>
			<l-geo-json
				:geojson="getFeaturesVSKMainRailways"
				:optionsStyle="styles.railways.b"
				:options="options"
			></l-geo-json>
			<l-geo-json
				:geojson="getFeaturesVSKMainRailways"
				:optionsStyle="styles.railways.w"
				:options="options"
			></l-geo-json>

			<l-marker :lat-lng="markers.m1"></l-marker>

			<l-marker v-for="(marker, idx) in getMarkers" :key="idx" :lat-lng="marker.CoordPoint"></l-marker>
			
      <l-marker v-for="(marker, idx) in getNewMarkers" :key="idx" :lat-lng="marker.CoordPoint"></l-marker>

		</l-map>

		<q-dialog v-model="dyalogForNewMarker" persistent>
			<q-card style="min-width: 400px" class="q-pa-md">
				<q-form @submit.prevent.stop="onSubmitMarker" @reset="onResetMarker" class="q-gutter-md">
					<q-card-section>
						<div class="text-h6">Введите данные</div>
					</q-card-section>

					<q-card-section>
						<q-input
							dense
							filled
							autogrow
							v-model="title"
							label="Название"
							:rules="[val => !!val || 'Поле обязательно для заполнения']"
						/>
					</q-card-section>

					<q-card-section align="right">
						<q-btn :disable="loading" flat label="Отмена" v-close-popup type="reset" />
						<q-btn :loading="loading" color="primary" label="Сохранить" type="submit" />
					</q-card-section>
				</q-form>
			</q-card>
		</q-dialog>
	</q-page>
</template>

<style>
</style>

<script>
import { mapFields } from 'vuex-map-fields'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker, LGeoJson, LControl } from 'vue2-leaflet'

import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw'

import PopupContent from "../components/GeoJson2Popup"

export default {
  name: 'PageMapVSK',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LControl,
  },
  data() {
    return {
      point: {},
      title: null,
    }
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          `<div>
            ID: ${feature.properties.id}
            <br>
            Name: ${feature.properties.name}
          </div>`,
          { permanent: false, sticky: true }
        );
      };
    },
    ...mapFields('SP', ['dyalogForNewMarker', 'loading']),
    ...mapState('mapVSK', [
      'mapInstanceVSK',
      'tile',
      'styles',
      'mapVSK',
      'markers',
      'newMarkers',
    ]),
    ...mapGetters('mapVSK', [
      'getFeaturesVSKMainLanduse',
      'getFeaturesVSKMainConstrunctions',
      'getFeaturesVSKMainRailways',
      'getFeaturesVSKMainRoads',
      'getNewMarker',
    ]),
    ...mapGetters('SP', [
      'getMarkers',
      'getNewMarkers',
    ])
  },
  methods: {
    onSubmitMarker () {
      this.actAddItemToSP({
        title: this.title,
        point: this.point,
      })
    },
    onResetMarker () {
      this.title = null
    },

    zoomUpdated (zoom) {
      this.setZoom(zoom)
    },
    centerUpdated (center) {
      this.setCenter(center)
    },
    boundsUpdated (bounds) {
      this.setBounds(bounds)
    },
    ...mapMutations('mapVSK', [
      'setZoom',
      'setCenter',
      'setBounds',
      'setAddNewMarker',
    ]),
    ...mapMutations('SP', [
      'setDyalogForNewMarker',
    ]),
    ...mapActions('mapVSK', [
      'actFetchMapVSK',
    ]),
    ...mapActions('SP', [
      'actAddItemToSP',
      'actFetchItemsFromSP',
    ])
  },
  watch: {  },
  created () {
    this.actFetchMapVSK()
    this.actFetchItemsFromSP()
  },
  mounted() {
    const map = this.$refs.VSK.mapObject
    map.createPane('construnctions')
    map.createPane('railways')
    map.getPane('construnctions').style.zIndex = 650
    map.getPane('railways').style.zIndex = 600


    const editableLayers = new L.FeatureGroup()
    map.addLayer(editableLayers)

    const MyCustomMarker = L.Icon.extend({
      options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: 'link/to/image.png'
      }
    })

    const options = {
      position: 'topleft',
      draw: {
        marker: {
            // icon: new MyCustomMarker()
        },
        polyline: false /* {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        } */,
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

    L.drawLocal = {
      draw: {
        toolbar: {
          // #TODO: this should be reorganized where actions are nested in actions
          // ex: actions.undo  or actions.cancel
          actions: {
            title: 'Отменить добавление',
            text: 'Отмена'
          },
          finish: {
            title: '- your text-',
            text: '- your text-'
          },
          undo: {
            title: '- your text-',
            text: '- your text-'
          },
          buttons: {
            polyline: '- your text-',
            polygon: '- your text-',
            rectangle: '- your text-',
            circle: '- your text-',
            marker: 'Добавить маркер',
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
              start: 'Click to start drawing line.',
              cont: 'Click to continue drawing line.',
              end: 'Click last point to finish line.'
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

    const drawControl = new L.Control.Draw(options)
    map.addControl(drawControl)

    const drawEventCreated = (e) => {
      const type  = e.layerType,
            layer = e.layer

      if (type === 'marker') {
        this.dyalogForNewMarker = true
        this.point = layer.getLatLng()
        // layer.bindPopup('A popup!')
      }
      // editableLayers.addLayer(layer);
    }

    map.on(L.Draw.Event.CREATED, drawEventCreated)

  }
}
</script>

<style>
</style>
