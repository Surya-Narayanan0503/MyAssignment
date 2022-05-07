<script setup lang="ts">

import { ref } from "vue";
import { useCookies } from 'vue3-cookies';
import { setSession } from '../models/session';
import router from '../router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const incorrect = ref('invisible');

const { cookies } = useCookies();

const signin = async () => {
<<<<<<< HEAD
		
=======
	
	console.log(username.value);
	console.log(password.value);
	

>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
	const response = await axios.post('http://localhost:5000/api/auth', {
		userName : username.value,
		password : password.value
	});	

	if (response.status >= 200 && response.status < 300) {		
<<<<<<< HEAD
=======
		
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
		incorrect.value = "invisible";
		setSession({
			isLoggedIn: "true",
			token: response.data.token,
			username: username.value,
<<<<<<< HEAD
			email: response.data.email
=======
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
		}, cookies);
		router.push('/tasks');
	}

	else {
		incorrect.value = "visible";
		username.value = "";
<<<<<<< HEAD
		password.value = "";			
=======
		password.value = "";
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
	}
};

const modalState = ref<boolean>(false);

const modalClass = (modalState: boolean): string => modalState ? 'modal is-active' : 'modal';

const rUser = ref('');
const rPass = ref('');
const rCPass = ref('');
<<<<<<< HEAD
const rEmail = ref('');
=======
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
const rError = ref('');

const register = async () => {
	rError.value = '';

<<<<<<< HEAD
	if(rUser.value === '' || rPass.value === '' || rCPass.value === '' || rEmail.value === '')
=======
	if(rUser.value === '' || rPass.value === '' || rCPass.value === '')
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
		return rError.value = 'Some field is left empty';

	if(rPass.value !== rCPass.value)
		return rError.value = "Passwords don't match";

	await axios.post('http://localhost:5000/api/users', {
		userName : rUser.value,
<<<<<<< HEAD
		password : rPass.value,
		email: rEmail.value
=======
		password : rPass.value
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
	});
	
	modalState.value = false;
	rUser.value = '';
	rPass.value = '';
	rCPass.value = '';
<<<<<<< HEAD
	rEmail.value = '';
=======
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
}

</script>


<template>
	<h1 class="title">To Do</h1>
	<div class="container">
		<img src="../assets/checklist.svg" width="900">
		<div class="card">
			<h1>SIGN IN</h1>
			<div class="field">
				<label>USERNAME</label>
				<input class="input" type="text" v-model="username" />
			</div>
			<div class="field">
				<label>PASSWORD</label>
				<input class="input" type="password" v-model="password" />
			</div>
			<p>{{invalid}}</p>
			<button class="button" @click="signin">LOG IN</button>
			<button class="button" @click="()=>modalState=true">REGISTER</button>
		</div>
			<div :class="modalClass(modalState)">
			<div class="modal-background" @click="()=>modalState=false"></div>
			<div class="modal-content">
			<div class="card">
						<h1>Register</h1>
						<input class="input is-normal" type="text" placeholder="Username" v-model="rUser" />
						<input class="input is-normal" type="password" placeholder="Password" v-model="rPass" />
						<input class="input is-normal" type="password" placeholder="Confirm" v-model="rCPass" />
<<<<<<< HEAD
						<input class="input is-normal" type="text" placeholder="Email" v-model="rEmail" />
=======
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
						<button class="button is-normal" @click="register">Register</button>
						<p>{{rError}}</p>
					</div>
			</div>
			<button class="modal-close is-large" aria-label="close" @click="()=>modalState=false"></button>
		</div>
	</div>
</template>

<style scoped lang="scss">

h1.title {
	position: absolute;
	top: 100px;
	font-weight: 800;
	font-size: 48px;
}
.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	max-width: 100% !important;
	.card {
		width: 600px;
		height: 500px;

		p {
			color: red;
			position: absolute;
			top: 330px;
			left: 120px;
		}

		.field {
			margin-top: 40px;
			margin-left: 40px;
			display: flex;
			flex-direction: column;
			label {
				font-size: 16px;
				font-weight: 600;
			}

			input {
				margin-top: 10px;
				width: 400px;
			}
		}

		button {
			margin-left: 40px;
			width: 400px;
			margin-top: 40px;
			background-color: #4285f4;
			color: white;
		}

		h1 {
			font-size: 30px;
			font-weight: 600;
			color: #4285f4;
			margin-top: 45px;
			margin-left: 40px;
		}
	}
}
</style>