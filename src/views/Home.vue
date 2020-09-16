<template>
  <div>
    <h1>Test task</h1>
    <div class="support-keys">
      <ul class="support__list">
        <li class="support__item">
          <span>Add new user</span>
          <button @click="$bvModal.show('add-user')" class="btn btn-info">
            <b-icon icon="brush" aria-hidden="true"></b-icon>
            Add User
          </button>
        </li>
        <li class="support__item">
          <span>Search by FullName</span>
          <b-form-input
              v-model="keyword"
              type="search"
              placeholder="Search by FullName"
          ></b-form-input>
        </li>
      </ul>

    </div>
    <div class="main-content">
      <b-table striped hover :items="filtered" :fields="fields" tbody-tr-class="calls_table" :keyword="keyword"
               :tbody-tr-attr="dataIdMethod">
        <template v-slot:cell(callButtons)="data">
          <ul class="buttons__list">
            <li class="button__item">
              <button @click="editUser" class="btn btn-info">
                <b-icon icon="gear" aria-hidden="true"></b-icon>
                <span>Edit</span>
              </button>
            </li>
            <li class="button__item">
              <button
                  @click="deleteUser"
                  class="btn btn-danger">
                <b-icon icon="exclamation-circle" aria-hidden="true"></b-icon>
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </template>
      </b-table>
    </div>
    <EditUser :targetId="targetId"/>
    <AddUser/>
    <DeleteDialog :action="'deleteUser'" :params="targetId" @getter="updateList"/>
  </div>
</template>

<script>


import EditUser from "@/components/modals/EditUser";
import DeleteDialog from "@/components/modals/DeleteDialog";
import AddUser from "@/components/modals/AddUser";
export default {
  name: 'Home',
  data() {
    return {
      targetId: {
        id: NaN
      },
      fields: [
        {
          key: 'id',
          sortable: true,
          label: 'id',
          class: 'users-id',
        },
        {
          key: 'username',
          sortable: true,
          label: 'Username',
          class: 'users-date'
        },
        {
          key: 'name',
          sortable: true,
          label: 'FullName',
          class: 'users-name'
        },
        {
          key: 'phone',
          sortable: false,
          label: 'Phone',
          class: 'users-date'
        },
        {
          key: 'email',
          sortable: false,
          label: 'Email',
          class: 'users-date'
        },
        {
          key: 'callButtons',
          label: 'Инструменты',
          sortable: false,
          class: 'calls-buttons'
        },
      ],
      items: [],
      keyword: '',
    }
  },
  components: {AddUser, DeleteDialog, EditUser},
  computed: {
    filtered () {
      return this.keyword
          ? this.items.filter(item => item.name.includes(this.keyword))
          : this.items
    }
  },
  methods: {
    show(e) {
      this.targetId.id = e.target.closest('.calls_table').dataset.id;
      this.$bvModal.show('add-contact')
    },
    editUser(e) {
      this.targetId.id = e.target.closest('.calls_table').dataset.id;
      this.$bvModal.show('edit-user')
    },
    deleteUser(e) {
      this.targetId.id = e.target.closest('.calls_table').dataset.id;
      this.$bvModal.show('delete-dialog')
    },
    dataIdMethod(param) {
      return {
        'data-id': param.id,
      }
    },
    showAllCalls() {
      this.items = this.$store.getters.getUsers
      if (!this.items || !this.items.length) {
        this.$store.dispatch('fetchUsersList')
            .then(() => {
              this.items = this.$store.getters.getUsers
            })
      }
    },
    updateList(status) {
      if (status) {
        this.items = this.$store.getters.getUsers
      }
    },
  },
  mounted() {
    this.showAllCalls()
  }
}
</script>
