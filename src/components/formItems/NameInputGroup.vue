<template>
    <b-form-group
            :label="inputLabel"
    >
        <b-form-input
                required
                :placeholder="placeholder" :name="name" :type="type" :autocomplete="autocomplete"
                v-model="inputValue" @input="$emit('input', inputValue)">
        ></b-form-input>
    </b-form-group>
</template>

<script>
    export default {
        name: "NameInputGroup",
        props: {
            placeholder: {
                default: "",
                type: String,
            },
            name: {
                default: "",
                type: String,
            },
            value: {
                default: "",
                type: String,
            },
            type: {
                default: "text",
                type: String,
            },
            autocomplete: {
                default: "off",
                type: String,
            },
            iconSrc: {
                default: null,
                type: String,
            },
            inputLabel: {
                default: "",
                type: String
            },
        },
        data() {
            return {
                inputValue: this.value,
            }
        },

    }
</script>

<style scoped>

</style>
