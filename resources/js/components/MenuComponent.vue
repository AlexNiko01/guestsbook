<template>
    <div>
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-layout md-gutter">
                <md-menu md-direction="bottom-start">
                    <md-button md-menu-trigger>
                        <router-link to="/">Home</router-link>
                    </md-button>
                </md-menu>

                <md-menu v-if="$auth.isLoggedIn()" md-direction="bottom-end">
                    <md-button md-menu-trigger>
                        <router-link to="/profile">My profile</router-link>
                    </md-button>
                </md-menu>
            </div>
            <div class="md-layout-item md-layout md-gutter"></div>
            <div class="md-layout-item md-layout md-gutter"></div>
            <div class="md-layout-item md-layout md-gutter">
                <md-menu v-if="!$auth.isLoggedIn()"
                         md-direction="bottom-end">
                    <md-button md-menu-trigger>
                        <router-link to="/login">Login</router-link>
                    </md-button>
                </md-menu>
                <md-menu v-if="$auth.isLoggedIn()" md-direction="bottom-end">
                    <md-button md-menu-trigger>
                        <a @click.prevent="$auth.logout()">Logout</a>
                    </md-button>
                </md-menu>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .md-menu {
        margin: 24px;
    }
</style>
