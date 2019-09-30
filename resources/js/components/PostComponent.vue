<template>
    <md-card md-with-hover>
        <md-ripple>
            <md-card-header>
                <div class="md-title">{{post.title}}</div>
                <div class="md-subhead">author: {{post.user.name}}</div>
            </md-card-header>
            <md-card-content>
                {{post.content}}
            </md-card-content>
            <md-card-actions>
                <md-button @click.prevent="viewPost(post.id)">View post page</md-button>
                <md-button v-if="$auth.isLoggedIn()" @click.prevent="deletePost(post.id)">Delete</md-button>
            </md-card-actions>
        </md-ripple>
    </md-card>
</template>

<script>
    export default {
        props: {
            post: {},
        },
        mounted() {
        },
        methods: {
            viewPost(postId) {
                this.$router.push({name: 'single-post', params: {id: postId}});
            },
            deletePost(postId) {
                return this.$client.delete('/user/posts/' + postId).then((response) => {
                    this.$emit('deleted');
                    return response.data.data;
                })
                    .catch((error) => console.log(error.response.data))
            }
        }
    }
</script>
