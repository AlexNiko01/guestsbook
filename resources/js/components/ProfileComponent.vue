<template>
    <div class="page-container">
        <div class="main-container centered">
            <post-component @deleted="deletePost(post.id)" v-for="(post, key) in posts" :key="key"
                            :post="post"></post-component>
            <infinite-loading @infinite="infiniteLoadPosts"></infinite-loading>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';

    const url = '/user/posts';

    export default {
        data: () => {
            return {
                posts: {},
                page: 1,
            }
        },
        components: {InfiniteLoading},
        mounted() {
        },
        methods: {
            infiniteLoadPosts($state) {
                this.loadPosts().then(data => {
                    console.log(!data.length);
                    if (!data.length) {
                        $state.complete();
                    }
                    if (this.posts.length) {
                        this.page++;
                        this.posts.push(...data);
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
            deletePost(postId) {
                this.posts = this.posts.filter(function (el) {
                    return el.id !== postId
                });

            }
        }
    }
</script>
