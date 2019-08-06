<template>
	<q-page padding>
		<l-map
			style="min-height: calc(-100px + 100vh);"
			:crs="mapInstance.crs"
			:key="mapInstance.crs.code"
			:zoom="mapInstance.zoom"
			:center="mapInstance.center"
			:padding="mapInstance.padding"
			@update:zoom="zoomUpdated"
			@update:center="centerUpdated"
			@update:bounds="boundsUpdated"
		>
			<l-tile-layer :url="mapInstance.url" :options="mapInstance.options"></l-tile-layer>
			<l-polygon :lat-lngs="[GET_VSK_LANDUSE]"></l-polygon>
			<l-marker :lat-lng="markers.m1"></l-marker>
		</l-map>
	</q-page>
</template>

<style>
</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker, LPolygon, LPolyline } from 'vue2-leaflet'

export default {
  name: 'PageMapVSK',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolygon
  },
  methods: {
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
    ...mapActions('mapVskModule', ['fetchData', 'fetchMapVsk'])
  },
  computed: {
    ...mapState('mapVskModule', ['mapInstance', 'mapVsk', 'markers']),
    ...mapGetters('mapVskModule', ['GET_DATA', 'GET_VSK_LANDUSE'])
  },
  created () {
    this.fetchData()
    this.fetchMapVsk()
  }
}
</script>

<style>
</style>
