<template>
    <div class="page-container">
        <div class="main-container centered">
            <post-form-component :post="post" :heading="heading"></post-form-component>
        </div>
    </div>
</template>
<script>
    const showPostUrl = '/post/';

    export default {
        data: () => {
            return {
                post: null,
                heading: 'Update'
            }
        },
        mounted() {
            this.loadPost().then((data) => {
                this.post = data;
            });
        },
        methods: {
            loadPost: function () {
                if (this.$route.params.id) {
                    return this.$client.get(showPostUrl + this.$route.params.id).then((response) => {
                        return response.data.data;
                    })
                        .catch((error) => console.log(error.response.data))
                }
            }
        }


    }
</script>
