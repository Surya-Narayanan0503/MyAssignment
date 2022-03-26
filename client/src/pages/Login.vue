<script setup lang="ts">
import { ref } from 'vue';
import { session } from '../models/session';
import { users } from '../models/users';
import router from '../router';


const user = ref('');
const pass = ref('');
const invalid = ref('');

const signin = () => {
	invalid.value = '';
	const valid = users.value.filter(u => u.username === user.value && u.password === pass.value).length > 0;
	if(valid) {
		session.username = user.value;
		session.isLoggedIn = true;
		router.push('/tasks');
	} else {
		invalid.value = 'Invalid Username or Password';
	}
}

</script>

<template>
	<div class="container">
		<div class="card">
			<h1>SIGN IN</h1>
			<div class="field">
				<label>USERNAME</label>
				<input class="input" type="text" v-model="user" />
			</div>
			<div class="field">
				<label>PASSWORD</label>
				<input class="input" type="password" v-model="pass" />
			</div>
			<p>{{invalid}}</p>
			<button class="button" @click="signin">LOG IN</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.container {
	background: linear-gradient(
		45deg,
		rgba(66, 183, 245, 0.8) 0%,
		rgba(66, 245, 189, 0.4) 100%
	);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	max-width: 100% !important;
	.card {
		width: 600px;
		height: 475px;

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