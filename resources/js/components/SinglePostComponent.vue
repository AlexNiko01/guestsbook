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
    const url = 'http://guestbook-api.dev.local/api/post/';
    import Axios from "axios"

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
                    // console.log(this.data.post);
                });
            }
            ,
            loadPost() {
                return Axios.get(url + this.id, {params: {id: this.id}}).then((response) => {
                    return response.data.data;
                })
                    .catch((error) => console.log(error.response.data))
            }
        }
    }
</script>
