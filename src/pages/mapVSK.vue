<template>
	<q-page padding>
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
				@click="onClick"
			></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKMainRailways" :optionsStyle="styles.railways.b" :options="options"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKMainRailways" :optionsStyle="styles.railways.w" :options="options"></l-geo-json>

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
      this.setZoom(zoom)
    },
    centerUpdated (center) {
      this.setCenter(center)
    },
    boundsUpdated (bounds) {
      this.setBounds(bounds)
    },
    ...mapMutations('moduleMapVSK', ['setZoom', 'setCenter', 'setBounds']),
    ...mapActions('moduleMapVSK', ['fetchMapVSK'])
  },
  computed: {
    ...mapState('moduleMapVSK', ['mapInstanceVSK', 'tile', 'styles', 'mapVSK', 'markers']),
    ...mapGetters('moduleMapVSK', ['getFeaturesVSKMainLanduse', 'getFeaturesVSKMainConstrunctions', 'getFeaturesVSKMainRailways', 'getFeaturesVSKMainRoads']),
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
  },
  mounted() {
    const map = this.$refs.VSK.mapObject;
    map.createPane('construnctions');
    map.createPane('railways');
    map.getPane('construnctions').style.zIndex = 650;
    map.getPane('railways').style.zIndex = 600;
  }
}
</script>

<style>
</style>
