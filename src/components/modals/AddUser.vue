<template>
  <div>
    <b-modal id="add-user" centered title="Add user"
             :hide-footer="true"
    >
      <b-form @submit.prevent="changeData" class="popup-contact-form">
        <NameInputGroup :inputLabel="userInputData.userName.label"
                        :name="userInputData.userName.name"
                        :type="userInputData.userName.type"
                        v-model="formData.userName"
                        :placeholder="userInputData.userName.placeholder"/>
        <NameInputGroup :inputLabel="userInputData.fullName.label"
                        :name="userInputData.fullName.name"
                        :type="userInputData.fullName.type"
                        v-model="formData.fullName"
                        :placeholder="userInputData.fullName.placeholder"/>
        <NameInputGroup :inputLabel="userInputData.phone.label"
                        :name="userInputData.phone.name"
                        :type="userInputData.phone.type"
                        v-mask="'+##(###)-####-###'"
                        v-model="formData.phone"
                        :placeholder="userInputData.phone.placeholder"/>
        <NameInputGroup :inputLabel="userInputData.email.label"
                        :name="userInputData.email.name"
                        :type="userInputData.email.type"
                        v-model="formData.email"
                        :placeholder="userInputData.email.placeholder"/>
        <b-button
            class="add-contact-button"
            type="submit"
            variant="success">
          Add user
        </b-button>
      </b-form>
    </b-modal>
<!--    v-mask="'+##(###)-####-###'"-->
  </div>
</template>

<script>
import NameInputGroup from "@/components/formItems/NameInputGroup";
export default {
  name: "AddUser",
  components: {
    NameInputGroup
  },
  data() {
    return {
      userInputData: {
        userName: {
          label: 'Enter Username',
          name: 'username',
          placeholder: 'Username',
          type: 'text',
        },
        fullName: {
          label: 'Enter FullName',
          name: 'fullname',
          placeholder: 'FullName',
          type: 'text',
        },
        phone: {
          label: 'Enter phone',
          name: 'phone',
          placeholder: 'Phone',
          type: 'text',
        },
        email: {
          label: 'Enter email',
          name: 'email',
          placeholder: 'Email',
          type: 'email',
        },

      },
      formData: {
        userName: '',
        fullName: '',
        phone: '',
        email: '',

      },
    }
  },
  methods: {
    changeData() {
      let data = {
        id: (new Date().getTime()),
        name: this.formData.fullName,
        username: this.formData.userName,
        phone: this.formData.phone,
        email: this.formData.email,
      };
      this.$store.commit('addUser', data)
      this.formData = {};
      this.$bvModal.hide('add-user')
    },
  },
}
</script>

<style scoped>

</style>

