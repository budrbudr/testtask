export default {
    actions: {
        async fetchUsersList(ctx) {
            let resp = await fetch(`${process.env.VUE_APP_API_URL}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then(resp => resp.json())
                .then(json => {
                    ctx.commit('setUsersList', json)
                })
                .catch(err => console.warn(err))
            return resp

        }
    },
    mutations: {
        setUsersList(state, data) {
            state.users = data
        },
        updateUser (state, data) {
            const usersList = state.users
            let index = usersList.findIndex(item => `${item.id}` === `${data.id}`)
            state.users[index] = Object.assign(state.users[index], data)
        },
        addUser (state, data) {
            let usersList = state.users.push({
                id: data.id,
                name: data.name,
                phone: data.phone,
                username: data.username,
                email: data.email,
            })
            usersList = state.users

        },
        deleteUser (state, data) {
            const usersList = state.users.filter(item => item.id != data.id)
            state.users = usersList
        },
    },
    state: {
        users:[]
    },
    getters: {
        getUsers: state => {
            return state.users
        },
        getUsersById: state => id => {
            return state.users.find(item => item.id == id);
        },
    }
}
