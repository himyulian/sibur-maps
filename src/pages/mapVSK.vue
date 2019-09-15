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

			<l-marker v-for="(marker, idx) in getMarkers" :key="idx" :lat-lng="marker.CoordPoint">
        <l-popup>
          <q-card flat class="my-card">
            <q-card-section>
              <div class="text-h6">{{marker.Title}}</div>
              <div class="text-subtitle1">ID: {{marker.Id}}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn rounded :loading="loading" color="primary" class="q-mt-sm" size="sm" label="Редактировать" @click="clickedMarker = marker; dyalogEditMarker = true" />
              <q-btn round :loading="loading" color="primary" class="q-mt-sm" size="sm" icon="delete_forever" @click="clickedMarker = marker; dyalogConfirmDelete = true">
                <q-tooltip>Удалить маркер</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </l-popup>
      </l-marker>

      <l-control position="topright" >
        <div class="column q-gutter-xs">
          <q-btn round color="accent" label="ВСК" @click="actSetCenter([51.627513, 39.242946])"/>
          <q-btn round color="accent" label="Д1" @click="actSetCenter([51.62406, 39.26536])"/>
          <q-btn round color="accent" label="61" @click="actSetCenter([51.59625, 39.22694])"/>
        </div>
      </l-control>

		</l-map>

    <q-dialog v-model="dyalogConfirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" class="text-red" style="font-size: 3rem;" />
          <span class="q-ml-sm">Подтвердите удаление маркера с карты</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup @click="clickedMarker = {}" />
          <q-btn flat label="Удалить маркер" color="primary" v-close-popup @click="deleteMarker(clickedMarker)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

		<q-dialog v-model="dyalogNewMarker" persistent>
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

		<q-dialog v-model="dyalogEditMarker" persistent>
			<q-card style="min-width: 400px" class="q-pa-md">
				<q-form @submit.prevent.stop="onSubmitEditMarker(clickedMarker)" @reset="onResetEditMarker" class="q-gutter-md">
					<q-card-section>
						<div class="text-h6">Измените необходимые данные</div>
					</q-card-section>
					<q-card-section>
						<q-input
							dense
							filled
							autogrow
							v-model="clickedMarker.Title"
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
import { LMap, LTileLayer, LMarker, LGeoJson, LControl, LPopup } from 'vue2-leaflet'

import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw'
import { drawControlOptions, drawLocalOptions } from '../boot/leaflet-boot'

import PopupContent from "../components/GeoJson2Popup"

export default {
  name: 'PageMapVSK',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LControl,
    LPopup,
  },
  data() {
    return {
      dyalogConfirmDelete: false,
      clickedMarker: {},
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
    ...mapFields('SP', [
      'dyalogNewMarker',
      'dyalogEditMarker',
      'loading',
    ]),
    ...mapState('mapVSK', [
      'mapInstance',
      'tile',
      'styles',
      'mapVSK',
      'markers',
      'drawOptions',
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
    deleteMarker(item) {
      this.actDeleteItemFromSP(item.Id)
    },
    onSubmitMarker () {
      this.actAddItemToSP({
        title: this.title,
        point: this.point,
      })
    },
    onResetMarker () {
      this.title = null
    },
    onSubmitEditMarker (clickedMarker) {
      this.actUpdateItemToSP(clickedMarker)
    },
    onResetEditMarker () {
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
    ]),
    ...mapMutations('SP', [
      'setDyalogNewMarker',
    ]),
    ...mapActions('mapVSK', [
      'actSetCenter',
      'actFetchMapVSKmodeDEV',
      'actFetchMapVSKmodePROD',
    ]),
    ...mapActions('SP', [
      'actFetchItemsFromSP',
      'actAddItemToSP',
      'actUpdateItemToSP',
      'actDeleteItemFromSP',
    ])
  },
  watch: {  },
  created () {
    if (process.env.DEV) {
      this.actFetchMapVSKmodeDEV()
    } else if (process.env.PROD) {
      this.actFetchMapVSKmodePROD()
      this.actFetchItemsFromSP()
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
        this.dyalogNewMarker = true
        this.point = layer.getLatLng()
        // layer.bindPopup('A popup!')
      }

      if (type === 'polyline') {
        console.log(layer.getLatLngs())
        // layer.bindPopup('A popup!')
      }
      // editableLayers.addLayer(layer);
    }

    map.on(L.Draw.Event.CREATED, drawEventCreated)

  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 350px
    min-width 250px
</style>
