<template>
    <form novalidate class="md-layout" @submit.prevent="currentRoute==='login' ? login() : signup()">
        <md-field :class="{ 'md-invalid': $v.form.email.$error }">
            <label class="mr-2 font-bold text-grey">Email</label>
            <md-input type="email" class="input" v-model="form.email"></md-input>
            <div v-if="!$v.form.email.required && $v.form.email.$dirty">
                <span class="md-error">Email is required</span>
            </div>
            <div v-else-if="$v.form.email.$dirty">
                <span class="md-error">Email is invalid</span>
            </div>
        </md-field>

        <md-field
                :class="{ 'md-invalid': $v.form.name.$error }">
            <label class="mr-2 font-bold text-grey">Name</label>
            <md-input type="text" class="input" v-model="form.name"></md-input>
            <div v-if="!$v.form.name.required && $v.form.name.$dirty">
                <span class="md-error">Name is required</span>
            </div>
        </md-field>

        <md-field
                :class="{ 'md-invalid': $v.form.password.$error }">
            <label class="mr-2 font-bold text-grey">Password</label>
            <md-input type="password" class="input" v-model="form.password"></md-input>
            <div v-if="!$v.form.password.required && $v.form.password.$dirty">
                <span class="md-error">Password is required</span>
            </div>
        </md-field>

        <div class="md-card-actions md-alignment-right">
            <button type="submit" class="md-button md-primary">
                <div class="md-ripple">
                    <div class="md-button-content">Submit</div>
                </div>
            </button>
        </div>
    </form>
</template>

<script>
    import {required, email} from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                currentRoute: ''
            };
        },

        validations: {
            form: {
                name: {
                    required,
                },
                email: {
                    required,
                    email
                },
                password: {
                    required
                }
            }
        },
        mounted() {
            this.currentRoute = this.$route.name;
        },
        methods: {
            login: function () {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return;
                }
                this.$auth.login(this.form);
            },
            signup: function () {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return;
                }
                this.$auth.signup(this.form);
            }
        },
    }
</script>
