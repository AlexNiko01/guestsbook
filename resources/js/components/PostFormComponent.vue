<template>
    <div class="form-wrapper">
        <h2>
            {{heading}}
        </h2>
        <form novalidate class="md-layout" action="" @submit.prevent="submit()">
            <md-field md-inline :class="{'md-invalid' : $v.form.title.$error }">
                <label>Title</label>
                <md-input v-model="form.title"></md-input>
                <div v-if="!$v.form.title.required">
                    <span class="md-error">Title is required</span>
                </div>
            </md-field>
            <md-field :class="{'md-invalid' : $v.form.content.$error }">
                <label>Textarea</label>
                <md-textarea v-model="form.content"></md-textarea>
                <div v-if="!$v.form.content.required">
                    <span class="md-error">Content is required</span>
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
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';

    const createPostUrl = '/user/posts';
    const updatePostUrl = '/user/posts/';

    export default {
        data: () => {
            return {
                form: {
                    title: '',
                    content: ''
                },
                createdPost: {}
            }
        },
        props: [
            'post',
            'heading'
        ],
        mounted() {
            this.$watch('post', post => {
                this.form.title = post.title;
                this.form.content = post.content;
            })

        },
        validations: {
            form: {
                title: {
                    required,
                },
                content: {
                    required,

                }
            }
        },
        methods: {
            submit: function () {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return;
                }
                if (!this.$auth.isLoggedIn()) {
                    return window.location.href = 'login';
                }
                if (this.$route.params.id) {
                    this.updatePost(this.$route.params.id, this.form);
                } else {
                    this.createPost(this.form);
                }
            },
            createPost: function (data) {
                return this.$client.post(createPostUrl, data).then((response) => {
                    this.createdPost = response.data.data;
                    this.$emit('created', this.createdPost);
                    return response.data.data;
                })
                    .catch((error) => console.log(error.response.data))
            },
            updatePost(id, data) {
                return this.$client.put(updatePostUrl + id, data).then((response) => {
                    return window.location.href = '/';
                })
                    .catch((error) => console.log(error.response.data))
            }
        }
    }
</script>
