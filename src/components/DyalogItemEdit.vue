<template>
  <q-dialog v-model="dyalogItemEdit" persistent>
    <q-card style="min-width: 400px" class="q-pa-md">
      <q-form
        class="q-gutter-md"
        @submit.prevent.stop="onSubmit(clickedItem)"
        @reset="onReset"
      >
        <q-card-section>
          <div class="text-h6">Измените необходимые данные</div>
        </q-card-section>
        <q-card-section>
          <q-input
            label="Название"
            v-model="Title"
            dense
            filled
            autogrow
            :rules="[val => !!val || 'Поле обязательно для заполнения']"
          />
        </q-card-section>
        <q-card-section align="right">
          <q-btn
            label="Отмена"
            :disable="loading"
            type="reset"
            flat
            v-close-popup
          />
          <q-btn
            label="Сохранить"
            :loading="loading"
            type="submit"
            color="primary"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DyalogItemEdit',
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapFields('SP', [
      'loading',
      'dyalogItemEdit',
      'clickedItem',
      'clickedItem.Title',
      'fields.title',
    ]),
  },
  methods: {
    onSubmit (marker) {
      this.actSPItemUpdate(marker)
    },
    onReset () {
    },
    ...mapActions('SP', [
      'actSPItemUpdate',
    ])
  },
}
</script>
