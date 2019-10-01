<template>
    <div v-if="post" class="page-container">
        <div class="main-container centered">
            <h2>{{post.title}}</h2>
            <div>
                {{post.content}}
            </div>
        </div>

    </div>
</template>

<script>
    const url = '/post/';

    export default {
        data: () => {
            return {
                post: {},
            }
        },
        props: {},
        mounted() {
            this.id = this.$route.params.id;
            this.setProps();
        }
        ,
        methods: {
            setProps() {
                this.loadPost().then(data => {
                    this.post = data;
                });
            },
            loadPost() {
                return this.$client.get(url + this.id).then((response) => {
                    return response.data.data;
                })
                    .catch((error) => console.log(error.response.data))
            }
        }
    }
</script>
