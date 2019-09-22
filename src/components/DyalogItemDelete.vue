<template>
  <q-dialog v-model="dyalogItemConfirmDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="warning" class="text-red" style="font-size: 3rem;" />
        <span class="q-ml-sm">Подтвердите удаление элемента с карты</span>
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
          label="Удалить"
          :loading="loading"
          color="primary"
          flat
          @click="deleteItem(clickedItem)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DyalogItemDelete',
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapFields('SP', [
      'loading',
      'dyalogItemConfirmDelete',
      'clickedItem',
    ]),
  },
  methods: {
    deleteItem(item) {
      this.actSPItemDelete(item.Id)
    },
    ...mapActions('SP', [
      'actSPItemDelete',
    ])
  },
}
</script>
