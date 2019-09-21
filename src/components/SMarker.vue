<template>
  <div>
    <l-marker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.CoordPoint">
      <l-popup>
        <q-card flat class="my-card">
          <q-card-section>
            <div class="text-h6">{{marker.Title}}</div>
            <div class="text-subtitle1">ID: {{marker.Id}}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn
              label="Редактировать"
              :loading="loading"
              color="primary"
              class="q-mt-sm"
              size="sm"
              rounded
              @click="clickedMarker = marker; dyalogMarkerEdit = true"
            />
            <q-btn
              :loading="loading"
              icon="delete_forever"
              color="primary"
              class="q-mt-sm"
              size="sm"
              round
              @click="clickedMarker = marker; dyalogMarkerConfirmDelete = true"
            >
              <q-tooltip>Удалить маркер</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </l-popup>
    </l-marker>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { LMarker, LPopup } from 'vue2-leaflet'

export default {
  name: 'SMarker',
  components: {
    LMarker,
    LPopup,
  },
  props: {
    markers: {
      type: Array,
      default: []
    },
  },
  data () {
    return {}
  },
  computed: {
    ...mapFields('SP', [
      'loading',
      'dyalogMarkerEdit',
      'dyalogMarkerConfirmDelete',
      'clickedMarker',
    ]),
  },
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 350px
    min-width 250px
</style>
