<template>
  <div class="dialog-section">
    <b-modal id="delete-dialog" title="Warning">
      <p class="my-2">Are you sure you want to delete the entry?</p>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button type="submit" size="md" variant="success" @click="accept">
         Yes
        </b-button>
        <b-button size="md" variant="danger" @click="cancel()">
          No
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
