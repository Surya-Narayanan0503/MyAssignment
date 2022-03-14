<script setup lang="ts">
import { Login } from '../models/session';
import { ref } from 'vue'
let userName = ref('');
let password = ref('');
function login() {
    Login(userName.value, password.value)
}
</script>

<template>
<body>
<div class="bgSizeContain">
<div class="bg-img">
	
    <section class="section">      
       <div class="columns">

       <div class="column is-4 is-offset-4">
           <form @submit.prevent="login">
			   <div class="imgcontainer">
      <img src="https://www.samrattechnologies.com/assets/newtheme/frontimg/login-panel.jpg" alt="Avatar"  class="avatar">
    </div>
	
		  <div class="field">
			  <label for="uname"><b><i>USERNAME</i></b></label>
		  <p class="control has-icons-left has-icons-right">
		    
		    <input class="input" placeholder="USERNAME" v-model="userName">
		    <span class="icon is-small is-left">
		      <i class="fa fa-envelope"></i>
		    </span>
		    <span class="icon is-small is-right">
		      <i class="fa fa-check"></i>
		    </span>
		  </p>
		</div>
		<div class="field">
			<label for="uname"><b><i>PASSWORD</i></b></label>
		  <p class="control has-icons-left">
			   
		    <input class="input" type="password" placeholder="PASSWORD" v-model="password">
		    <span class="icon is-small is-left">
		      <i class="fa fa-lock"></i>
		    </span>
		  </p>
		</div>
		<div class="field">
		  <p class="control">
		    <button class="button is-success">
		      Login
		    </button>
			
		  </p>
		  
		  <span class="psw" style= "color :#6e96ec;">Forgot <a href="#">password?</a></span>
		</div>

        </form>
      </div>         
       </div>
      </section>
</div>
</div>
</body>
</template>


<style >
.bg {

  background-image: url("https://www.samrattechnologies.com/assets/newtheme/frontimg/login-panel.jpg");

  
  height: 150%; 

  /* Center and scale  */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;  
  height: 50%;
  width: 50%
}

.bgSizeConta {
	
	position:fixed; 
    height:100%; 
    width:100%;
    background-color:#BAE2E9;
    margin: -19px 0 0 0;
    width: 100%;

}
.bgSizeContain {

	 background: url(https://media4.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif) no-repeat;
  	 background-size: 100%;
	 background-position: 45px 250px;
	 background-color:black;
	 position:fixed; 
     height:100%; 
     width:100%;  
	 margin: -19px 0 0 0;
     width: 100%;
  	
}

</style>




