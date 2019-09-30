<template>
    <div class="form-wrapper">
        <h2>
            Leave your comment here ...
        </h2>
        <form novalidate class="md-layout" action="" @submit.prevent="addComment()">

            <md-field md-inline :class="{'md-invalid' : !!errors.title}">
                <label>Title</label>
                <md-input v-model="form.title"></md-input>
                <div v-if="errors.title">
                    <span class="md-error">{{ errors.title }}</span>
                </div>

            </md-field>

            <md-field :class="{'md-invalid' : !!errors.content}">
                <label>Textarea</label>
                <md-textarea v-model="form.content"></md-textarea>
                <div v-if="errors.content">
                    <span class="md-error">{{ errors.content }}</span>
                </div>

            </md-field>
            <div class="md-card-actions md-alignment-right">
                <button type="submit" class="md-button md-primary">
                    <div class="md-ripple">
                        <div class="md-button-content">Add comment</div>
                    </div>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    const url = '/user/posts';

    export default {
        data: () => {
            return {
                errors: {
                    title: '',
                    content: ''
                },
                form: {
                    title: '',
                    content: ''
                },
                createdPost: {}
            }
        },
        components: {},
        mounted() {

        },
        methods: {
            addComment: function () {
                if (!this.checkForm()) {
                    if (!this.$auth.isLoggedIn()) {
                        return window.location.href = 'login';
                    } else {
                        this.createPosts(this.form);
                    }
                }
            },
            checkForm: function (e) {
                let hasErrors = false;
                this.errors = {
                    title: '',
                    content: ''
                };

                if (!this.form.title) {
                    this.errors.title = 'Title is required.';
                    hasErrors = true;

                }
                if (!this.form.content) {
                    this.errors.content = 'Comment is required.';
                    hasErrors = true;
                }
                return hasErrors;
            },
            createPosts(data) {
                return this.$client.post(url, data).then((response) => {
                    this.createdPost = response.data.data;
                    console.log(this.createdPost);
                    this.$emit('created', this.createdPost);

                    return response.data.data;
                })
                    .catch((error) => console.log(error.response.data))
            }
        }
    }
</script>
