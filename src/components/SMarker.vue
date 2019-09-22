<template>
  <div>
    <l-marker v-for="(item, idx) in items" :key="idx" :lat-lng="item.CoordPoint">
      <l-popup>
        <q-card flat class="my-card">
          <q-card-section>
            <div class="text-h6">{{item.Title}}</div>
            <div class="text-subtitle1">ID: {{item.Id}}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn
              label="Редактировать"
              :disable="loading"
              color="primary"
              class="q-mt-sm"
              size="sm"
              rounded
              @click="clickedItem = item; dyalogItemEdit = true"
            />
            <q-btn
              :disable="loading"
              icon="delete_forever"
              color="primary"
              class="q-mt-sm"
              size="sm"
              round
              @click="clickedItem = item; dyalogItemConfirmDelete = true"
            >
              <q-tooltip>Удалить</q-tooltip>
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
    items: {
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
      'dyalogItemEdit',
      'dyalogItemConfirmDelete',
      'clickedItem',
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
