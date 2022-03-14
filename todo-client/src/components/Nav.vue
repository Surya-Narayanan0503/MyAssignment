<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from "vue-router";
import LoginBadge from './LoginBadge.vue';

const isOpen = ref(false);
</script>

<template>

  <nav class="navbar navbar is-white"  role="navigation" aria-label="main navigation">
    <div class="container" >
      <div class="navbar-brand">
        &nbsp;&nbsp;
        <a class="navbar-item" >
          <img src="https://thumbs.dreamstime.com/b/hamburger-menu-bar-icon-crystal-blue-banner-background-isolated-172060418.jpg" width="65" />
        </a>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/"><b>Home</b></router-link>
          <router-link class="navbar-item" to="/messages"><b>Main Menu</b></router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"><b>Tasks To-Do</b></a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/assignedtasks">Assigned tasks</router-link>
              <!--router-link class="navbar-item" to="/viewAllTasks">All Tasks</router-link-->
              <!-- <div v-bind:style="styles"></div> -->
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"><b>Help</b></a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/about">Information</router-link>
              <a class="navbar-item">Jobs</a>
              <router-link class="navbar-item" to="/contact">Contact</router-link>
              <hr class="navbar-divider" />
              <a class="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <login-badge />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
<!-- -->
        </div>
      </div>
    </div>
  </nav>
</template>

// styles: {
// 	'background color': 'green';
// }
