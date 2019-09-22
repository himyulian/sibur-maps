<template>
  <q-dialog v-model="dyalogMarkerConfirmDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="warning" class="text-red" style="font-size: 3rem;" />
        <span class="q-ml-sm">Подтвердите удаление маркера с карты</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Отмена"
          :disable="loading"
          color="primary"
          flat
          v-close-popup
        />
        <q-btn
          label="Удалить маркер"
          :loading="loading"
          color="primary"
          flat
          @click="deleteMarker(clickedMarker)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DyalogMarkerDelete',
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapFields('SP', [
      'loading',
      'dyalogMarkerConfirmDelete',
      'clickedMarker',
    ]),
  },
  methods: {
    deleteMarker(item) {
      this.actSPItemDelete(item.Id)
    },
    ...mapActions('SP', [
      'actSPItemDelete',
    ])
  },
}
</script>
