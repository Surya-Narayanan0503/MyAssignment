<script setup lang="ts">
    import session, { Logout } from "../models/session";
</script>

<template>
    <div class="buttons" v-if="!session.user">
        
        <router-link class="button is-dark" to="/login">
           <b> Log in</b>
        </router-link>
    </div>
    <div class="buttons" v-else>
        <div class="avatar">
            <img :src="session.user.picture" />
            <div >
                <strong style="color: dark">{{ session.user.firstName }} {{ session.user.lastName }}</strong> <br />
                <i>{{ session.user.email }}</i>
            </div>
        </div>
        <a class="button is-primary" @click="Logout()">
            <strong>Log out</strong>
        </a>
    </div>
    
</template>
<!-- -->
<style scoped lang="scss">
    .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .5em;
        gap: .5em;
        line-height: 1em;
        img {
            width: 48px;
            height: 48px;
            max-height: max-content;
            border-radius: 10%;
            overflow: hidden;
            object-fit: cover;
        }
    }
</style>
