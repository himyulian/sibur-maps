<template>
	<q-page>
		<l-map
			ref="VSK"
			style="min-height: calc(-50px + 100vh);"
			:crs="mapInstance.crs"
			:key="mapInstance.crs.code"
			:zoom="mapInstance.zoom"
			:center="mapInstance.center"
			:padding="mapInstance.padding"
			@update:zoom="zoomUpdated"
			@update:center="centerUpdated"
			@update:bounds="boundsUpdated"
		>
			<l-tile-layer :url="tile.url" :options="tile.options"></l-tile-layer>

			<l-geo-json :geojson="getFeaturesVSKMainLanduse" :optionsStyle="styles.landuse"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKMainRoads" :optionsStyle="styles.roads"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKMainConstrunctions" :optionsStyle="styles.construnctions" :options="options"></l-geo-json>
			<l-geo-json	:geojson="getFeaturesVSKMainRailways"	:optionsStyle="styles.railways.b"	:options="options"></l-geo-json>
			<l-geo-json	:geojson="getFeaturesVSKMainRailways"	:optionsStyle="styles.railways.w"	:options="options"></l-geo-json>

			<l-geo-json :geojson="getFeaturesVSKD1Landuse" :optionsStyle="styles.landuse"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKD1Roads" :optionsStyle="styles.roads"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSKD1Construnctions" :optionsStyle="styles.construnctions" :options="options"></l-geo-json>
			<l-geo-json	:geojson="getFeaturesVSKD1Railways"	:optionsStyle="styles.railways.b"	:options="options"></l-geo-json>
			<l-geo-json	:geojson="getFeaturesVSKD1Railways"	:optionsStyle="styles.railways.w"	:options="options"></l-geo-json>

			<l-geo-json :geojson="getFeaturesVSK61Landuse" :optionsStyle="styles.landuse"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSK61Roads" :optionsStyle="styles.roads"></l-geo-json>
			<l-geo-json :geojson="getFeaturesVSK61Construnctions" :optionsStyle="styles.construnctions" :options="options"></l-geo-json>

      <s-marker :items="markers"></s-marker>
      <s-marker :items="getMarkers"></s-marker>

      <l-control position="topright" >
        <div class="column q-gutter-xs">
          <q-btn round color="accent" label="ВСК" @click="actSetCenter([51.627513, 39.242946])"/>
          <q-btn round color="accent" label="Д1" @click="actSetCenter([51.62406, 39.26536])"/>
          <q-btn round color="accent" label="61" @click="actSetCenter([51.59625, 39.22694])"/>
        </div>
      </l-control>

		</l-map>

    <dyalog-item-add/>
    <dyalog-item-edit/>
    <dyalog-item-delete/>

	</q-page>
</template>

<style>
</style>

<script>
import { mapFields } from 'vuex-map-fields'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker, LGeoJson, LControl, LPopup } from 'vue2-leaflet'

import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw'
import { drawControlOptions, drawLocalOptions } from '../boot/leaflet-boot'

import SMarker from "../components/SMarker"
import DyalogItemAdd from "../components/DyalogItemAdd"
import DyalogItemEdit from "../components/DyalogItemEdit"
import DyalogItemDelete from "../components/DyalogItemDelete"

export default {
  name: 'PageMapVSK',
  components: {
    SMarker,
    DyalogItemAdd,
    DyalogItemEdit,
    DyalogItemDelete,
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LControl,
    LPopup,
  },
  data() {
    return {}
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
    ...mapFields('SP', [
      'dyalogItemAdd',
      'fields.point',
      'fields.polyline',
    ]),
    ...mapState('mapVSK', [
      'mapInstance',
      'tile',
      'styles',
      'mapVSK',
      'markers',
    ]),
    ...mapGetters('mapVSK', [
      'getFeaturesVSKMainLanduse',
      'getFeaturesVSKMainConstrunctions',
      'getFeaturesVSKMainRailways',
      'getFeaturesVSKMainRoads',
      'getFeaturesVSKD1Landuse',
      'getFeaturesVSKD1Construnctions',
      'getFeaturesVSKD1Railways',
      'getFeaturesVSKD1Roads',
      'getFeaturesVSK61Landuse',
      'getFeaturesVSK61Construnctions',
      'getFeaturesVSK61Roads',
    ]),
    ...mapGetters('SP', [
      'getMarkers',
    ])
  },
  methods: {
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
    ]),
    ...mapActions('mapVSK', [
      'actSetCenter',
      'actFetchMapVSKmodeDEV',
      'actFetchMapVSKmodePROD',
    ]),
    ...mapActions('SP', [
      'actSPItemsFetch',
    ])
  },
  watch: {  },
  created () {
    if (process.env.DEV) {
      this.actFetchMapVSKmodeDEV()
    } else if (process.env.PROD) {
      this.actFetchMapVSKmodePROD()
      this.actSPItemsFetch()
    }
  },
  mounted() {
    const map = this.$refs.VSK.mapObject
    map.createPane('construnctions')
    map.createPane('railways')
    map.getPane('construnctions').style.zIndex = 650
    map.getPane('railways').style.zIndex = 600

    const editableLayers = new L.FeatureGroup()
    map.addLayer(editableLayers)

    L.drawLocal = drawLocalOptions

    const drawControl = new L.Control.Draw(drawControlOptions)
    map.addControl(drawControl)

    const drawEventCreated = (e) => {
      const type  = e.layerType,
            layer = e.layer

      if (type === 'marker') {
        this.dyalogItemAdd = true
        this.point = layer.getLatLng()
        // layer.bindPopup('A popup!')
      }

      if (type === 'polyline') {
        // this.actSPItemAdd({
        //   title: this.title,
        //   polyline: layer.getLatLngs(),
        // })
        // layer.bindPopup('A popup!')
      }
      // editableLayers.addLayer(layer);
    }

    map.on(L.Draw.Event.CREATED, drawEventCreated)

  }
}
</script>

<style lang="stylus" scoped>
</style>
