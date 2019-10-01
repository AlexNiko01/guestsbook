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
                <md-button @click.prevent="viewPost(post.id)">View</md-button>
                <md-button v-if="$auth.isLoggedIn()" @click.prevent="updatePost(post.id)">Update</md-button>
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
            viewPost: function (postId) {
                this.$router.push({name: 'view-post', params: {id: postId}});
            },
            deletePost: function (postId) {
                console.log(postId);
                return this.$client.delete('/user/posts/' + postId).then((response) => {
                    if(response.status === 200){
                        this.$emit('deleted');
                    }
                })
                    .catch((error) => console.log(error.response.data))
            },
            updatePost: function (postId) {
                console.log(postId);
                this.$router.push({name: 'update-post', params: {id: postId}});
            },
            postBelongToUser(){

            }
        }
    }
</script>
