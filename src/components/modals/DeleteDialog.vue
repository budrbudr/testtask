<template>
  <div class="dialog-section">
    <b-modal id="delete-dialog" title="Предупреждение">
      <p class="my-2">Вы уверены, что хотите удалить запись?</p>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button type="submit" size="md" variant="success" @click="accept">
          Да
        </b-button>
        <b-button size="md" variant="danger" @click="cancel()">
          Нет
        </b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: "DeleteDialog",
  components: {},
  props: ['action', 'params'],
  data() {
    return {
      status: true,
    }
  },
  methods: {
    accept() {
      this.$store.commit(`${this.action}`, this.params)
      this.$emit('getter', this.status)
      this.$bvModal.hide('delete-dialog')
    },

  },

}
</script>

<style scoped>

</style>
