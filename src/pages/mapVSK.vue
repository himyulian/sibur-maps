<template>
	<q-page padding>
		<l-map
			ref="myMap"
			style="min-height: calc(-100px + 100vh);"
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

			<l-geo-json :geojson="vsk_main_landuse" :optionsStyle="styles.landuse"></l-geo-json>
			<l-geo-json :geojson="vsk_main_roads" :optionsStyle="styles.roads"></l-geo-json>
			<l-geo-json
				:geojson="vsk_main_construnctions"
				:optionsStyle="styles.construnctions"
				:options="options"
				@click="onClick"
			></l-geo-json>
			<l-geo-json :geojson="vsk_main_railways" :optionsStyle="styles.railways.b" :options="options"></l-geo-json>
			<l-geo-json :geojson="vsk_main_railways" :optionsStyle="styles.railways.w" :options="options"></l-geo-json>

			<l-marker :lat-lng="markers.m1"></l-marker>
		</l-map>
	</q-page>
</template>

<style>
</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'

import PopupContent from "../components/GeoJson2Popup"

export default {
  name: 'PageMapVSK',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson
  },
  methods: {
    onClick(event) {
      console.log('event', event)
    },
    zoomUpdated (zoom) {
      this.SET_ZOOM(zoom)
    },
    centerUpdated (center) {
      this.SET_CENTER(center)
    },
    boundsUpdated (bounds) {
      this.SET_BOUNDS(bounds)
    },
    ...mapMutations('mapVskModule', ['SET_ZOOM', 'SET_CENTER', 'SET_BOUNDS']),
    ...mapActions('mapVskModule', ['fetchMapVsk'])
  },
  computed: {
    ...mapState('mapVskModule', ['mapInstanceVSK', 'tile', 'styles', 'mapVsk', 'markers']),
    ...mapGetters('mapVskModule', ['vsk_main_landuse', 'vsk_main_construnctions', 'vsk_main_railways', 'vsk_main_roads']),
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
    this.fetchMapVsk()
  },
  mounted() {
    const map = this.$refs.myMap.mapObject;
    map.createPane('construnctions');
    map.createPane('railways');
    map.getPane('construnctions').style.zIndex = 650;
    map.getPane('railways').style.zIndex = 600;
  }
}
</script>

<style>
</style>
