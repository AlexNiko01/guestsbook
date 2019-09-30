<template>
    <div class="page-container">
        <div class="main-container centered">
            <post-form-component @created="postCreated($event)"></post-form-component>
            <post-component v-for="(post, key) in posts" :key="key" :post="post"></post-component>
            <infinite-loading @infinite="infiniteLoadPosts"></infinite-loading>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import PostFormComponent from "./PostFormComponent";

    const url = '/list';

    export default {
        data: () => {
            return {
                posts: {},
                page: 1,
            }
        },
        components: {PostFormComponent, InfiniteLoading},
        mounted() {
            this.infiniteLoadPosts();
        },
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
                return this.$client.get(url, {params: {page: this.page}}).then((response) => {
                    return response.data.data;
                })
                    .catch((error) => console.log(error.response.data))
            },
            postCreated(createdPost) {
                this.posts = [
                    createdPost,
                    ...this.posts
                ]
            }
        }
    }
</script>
