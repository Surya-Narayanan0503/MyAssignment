<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const message = ref("Hello vue!");
const currentTab = ref("All");
const prompt = ref("Waiting for input ...");
const notifications = reactive([
  { type: "primary", message: "primary notification" },
  { type: "link", message: "link notification" },
  { type: "success", message: "success notification" },
  { type: "warning", message: "warning notification" },
  { type: "danger", message: "danger notification" },
]);
    function cardClick() {
        message.value = 'You clicked the card!';
    }
    function close(index: number) {
        notifications.splice(index, 1);
    }
                
    onMounted(() => {
        setInterval(() => {
            prompt.value += '.';
        }, 500);
    });
</script>

<template>
<!-- -->
             <div class="bgcolor">
                <div class="section is-orange" >
                <div class="columns is-orange">

                    <div class="column is-one-quarter ">
                        <aside class="menu">
                            <p class="menu-label">
                              General
                            </p>
                            <ul class="menu-list">
                              <li><a>Dashboard</a></li>
                              <li><a>Customers</a></li>
                            </ul>
                            <p class="menu-label">
                              Administration
                            </p>
                            <ul class="menu-list">
                              <li><a>Team Settings</a></li>
                              <li>
                                <a class="is-active">Manage Your Team</a>
                                <ul>
                                  <li><a>Members</a></li>
                                  <li><a>Plugins</a></li>
                                  <li><a>Add a member</a></li>
                                </ul>
                              </li>
                              <li><a>Invitations</a></li>
                              <li><a>Cloud Storage Environment Settings</a></li>
                              <li><a>Authentication</a></li>
                            </ul>
                            <p class="menu-label">
                              Transactions
                            </p>
                            <ul class="menu-list">
                              <li><a>Payments</a></li>
                              <li><a>Transfers</a></li>
                              <li><a>Balance</a></li>
                            </ul>
                          </aside>
                    </div>

                    <div class="column is-half">
                        <h1 class="title">To-Do App Wall</h1>
                        
                        <div class="card" @click="cardClick"  >
                            <div class="card-image">
                              <figure class="image is-4by3">
                                <img src="https://media2.giphy.com/media/heHtSaIJSw7PxXzkP5/giphy.gif?cid=ecf05e47tjrwzf984lyoqdw403dut7nw6gtpnk9k0tvadre8&rid=giphy.gif&ct=g" alt="Placeholder image">
                              </figure>
                            </div>
                                <button class="delete"></button>
                            
                          </div>

                        <Messages />
                     <!-- -->   
                    </div>
                       
                    <div class="column is-one-quarter">
                        
                        <article class="panel is-primary">
                            <p class="panel-heading">
                              Primary
                            </p>
                            <p class="panel-tabs">
                              <a :class="{ 'is-active': currentTab == 'All' }" @click=" currentTab = 'All' " >All</a>
                              <a :class="{ 'is-active': currentTab == 'Public' }" @click=" currentTab = 'Public' " >Public</a>
                              <a :class="{ 'is-active': currentTab == 'Private' }" @click=" currentTab = 'Private' " >Private</a>
                              <a :class="{ 'is-active': currentTab == 'Sources' }" @click=" currentTab = 'Sources' " >Sources</a>
                              <a :class="{ 'is-active': currentTab == 'Forks' }" @click=" currentTab = 'Forks' " >Forks</a>
                            </p>
                            <div class="panel-block">
                              <p class="control has-icons-left">
                                <input class="input is-primary" type="text" :placeholder="prompt">
                                <span class="icon is-left">
                                  <i class="fas fa-search" aria-hidden="true"></i>
                                </span>
                              </p>
                            </div>
                            <a class="panel-block is-active">
                              <span class="panel-icon">
                                <i class="fas fa-book" aria-hidden="true"></i>
                              </span>
                              bulma
                            </a>
                            <a class="panel-block">
                              <span class="panel-icon">
                                <i class="fas fa-book" aria-hidden="true"></i>
                              </span>
                              marksheet
                            </a>
                            <a class="panel-block">
                              <span class="panel-icon">
                                <i class="fas fa-book" aria-hidden="true"></i>
                              </span>
                              minireset.css
                            </a>
                            <a class="panel-block">
                              <span class="panel-icon">
                                <i class="fas fa-book" aria-hidden="true"></i>
                              </span>
                              jgthms.github.io
                            </a>
                          </article>
                    </div>
                </div>
            </div>
          </div>  
  
</template>


<style scoped>
.bgcolor {
	
	position:fixed; 
    height:100%; 
    width:100%;
    background-color:#A5E2B3;
    margin: -19px 0 0 0;
    width: 100%;
}

</style>
