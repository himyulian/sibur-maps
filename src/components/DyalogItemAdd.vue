<template>
  <q-dialog v-model="dyalogItemAdd" persistent>
    <q-card style="min-width: 400px" class="q-pa-md">
      <q-form
        class="q-gutter-md"
        @submit.prevent.stop="onSubmit"
        @reset="onReset"
      >
        <q-card-section>
          <div class="text-h6">Введите данные</div>
        </q-card-section>
        <q-card-section>
          <q-input
            label="Название"
            v-model="title"
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
  name: 'DyalogItemAdd',
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapFields('SP', [
      'loading',
      'dyalogItemAdd',
      'clickedItem',
      'fields.title',
      'fields.point',
      'fields.polyline',
    ]),
  },
  methods: {
    onSubmit () {
      this.actSPItemAdd({
        title: this.title,
        point: this.point,
        polyline: this.polyline,
      })
    },
    onReset () {
      this.actClearFields()
    },
    ...mapActions('SP', [
      'actSPItemAdd',
      'actClearFields',
    ])
  },
}
</script>
