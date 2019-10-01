<template>
    <div class="page-container">
        <div class="main-container centered">
            <post-form-component @created="postCreated($event)" :heading="heading"></post-form-component>
            <post-component @deleted="deletePost(post.id)"  v-for="(post, key) in posts" :key="key" :post="post"></post-component>
            <infinite-loading @infinite="infiniteLoadPosts"></infinite-loading>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import PostFormComponent from "./PostFormComponent";

    const postsListUrl = '/list';

    export default {
        data: () => {
            return {
                posts: {},
                page: 1,
                heading: 'Leave your comment here ...'
            }
        },
        components: {PostFormComponent, InfiniteLoading},
        methods: {
            infiniteLoadPosts($state) {
                this.loadPosts().then(data => {
                    if (!data.length) {
                        $state.complete();
                    }
                    if (this.posts.length) {
                        this.page++;
                        this.posts.push(...data);
                        // console.log(this.posts);
                        $state.loaded();
                    } else {
                        this.posts = data;
                    }
                });

            },
            loadPosts() {
                return this.$client.get(postsListUrl, {params: {page: this.page}}).then((response) => {
                    return response.data.data;
                })
                    .catch((error) => console.log(error.response.data))
            },
            postCreated(createdPost) {
                this.posts = [
                    createdPost,
                    ...this.posts
                ]
            },
            deletePost(postId) {
                this.posts = this.posts.filter(function (el) {
                    return el.id !== postId
                });

            }
        }
    }
</script>
