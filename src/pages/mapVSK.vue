<template>
	<q-page padding>
    <p>Stream: {{}}</p>
		<l-map
			ref="VSK"
			style="min-height: calc(-80px + 100vh);"
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
			<l-geo-json :geojson="getFeaturesVSKMainRailways" :optionsStyle="styles.railways.b" :options="options"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKMainRailways" :optionsStyle="styles.railways.w" :options="options"></l-geo-json>

			<l-marker :lat-lng="markers.m1"></l-marker>

      <l-marker v-for="marker in getMarkers" :key="marker" :lat-lng="marker"></l-marker>

      <l-control position="topleft">
        <q-btn push color="white" text-color="primary" label="Добавить маркер" @click.stop/>
      </l-control>

		</l-map>
	</q-page>
</template>

<style>
</style>

<script>
import 'leaflet-draw/dist/leaflet.draw'
import L, { DomEvent, DomUtil } from 'leaflet'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker, LGeoJson, LControl } from 'vue2-leaflet'
import { interval, fromEvent } from 'rxjs'
import { 
  scan, 
  startWith, 
  takeWhile, 
  switchMap, 
  repeatWhen, 
  tap, 
  take, 
  map, 
} from 'rxjs/operators'

import PopupContent from "../components/GeoJson2Popup"

export default {
  //  v-stream:click="buttonAddMarker$"
  // domStreams: ['buttonAddMarker$'],
  // subscriptions() {

  //   const marker = L.marker([0, 0])
  //   const click$ = this.buttonAddMarker$.pipe(
  //     tap(() => marker.addTo(this.$refs.VSK.mapObject)),
  //     switchMap(() => fromEvent(this.$refs.VSK.$el, 'mousemove').pipe(
  //       map((event) => {
  //         const mousePos = DomEvent.getMousePosition(event, this.$refs.VSK.$el)
  //         const layerPoint = this.$refs.VSK.mapObject.containerPointToLayerPoint(mousePos)
  //         const latlng = this.$refs.VSK.mapObject.layerPointToLatLng(layerPoint)
  //         return latlng;
  //       }),
  //       tap(v => marker.setLatLng(v)),
  //       // tap(point => this.addItemToSP(point))
  //     ))
  //   )

  //   return {
  //     result$: click$
  //   }
  // },
  name: 'PageMapVSK',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LControl,
  },
  methods: {
    onClick(event) {
      this.addItemToSP(event.latlng)
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
    ...mapMutations('moduleMapVSK', ['setZoom', 'setCenter', 'setBounds']),
    ...mapActions('moduleMapVSK', ['fetchMapVSK']),
    ...mapActions('moduleSP', ['addItemToSP', 'fetchItemsFromSP'])
  },
  computed: {
    ...mapState('moduleMapVSK', ['mapInstanceVSK', 'tile', 'styles', 'mapVSK', 'markers']),
    ...mapGetters('moduleMapVSK', ['getFeaturesVSKMainLanduse', 'getFeaturesVSKMainConstrunctions', 'getFeaturesVSKMainRailways', 'getFeaturesVSKMainRoads']),
    ...mapGetters('moduleSP', ['getMarkers']),
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>id: " +
            feature.properties.id +
          "</div>",
          { permanent: false, sticky: true }
        );
      };
    }
  },
  watch: {  },
  created () {
    this.fetchMapVSK()
    this.fetchItemsFromSP()
  },
  mounted() {
    const map = this.$refs.VSK.mapObject;
    map.createPane('construnctions');
    map.createPane('railways');
    map.getPane('construnctions').style.zIndex = 650;
    map.getPane('railways').style.zIndex = 600;


    // ************

    var editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);
        
        var MyCustomMarker = L.Icon.extend({
            options: {
                shadowUrl: null,
                iconAnchor: new L.Point(12, 12),
                iconSize: new L.Point(24, 24),
                iconUrl: 'link/to/image.png'
            }
        });
        
        var options = {
            position: 'topleft',
            draw: {
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
                rectangle: {
                    shapeOptions: {
                        clickable: false
                    }
                },
                marker: {
                    // icon: new MyCustomMarker()
                }
            }
            // edit: {
            //     featureGroup: editableLayers, //REQUIRED!!
            //     remove: false
            // }
        };
        
        var drawControl = new L.Control.Draw(options);
        map.addControl(drawControl);
        
        map.on(L.Draw.Event.CREATED, function (e) {
            var type = e.layerType,
                layer = e.layer;
        
            if (type === 'marker') {
                layer.bindPopup('A popup!');
            }
        
            console.log(e);
            editableLayers.addLayer(layer);
        });

    // ************

  }
}
</script>

<style>
</style>
