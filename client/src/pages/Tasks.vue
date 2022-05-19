<script>

import { endSession, session } from '../models/session';
import { useCookies } from 'vue3-cookies';
import router from '../router';
import axios from 'axios';

const { cookies } = useCookies();

export default {
   data () {
	const tabs = ["For me", "By me", "All"];
    return {
	  tabContent : ["For me", "By me", "All"],	
	  todoTitle : '',
	  todoFor : '',
	  todoDate : '',
	  token : session.token,
	  username: session.username,
      doneTodos : [],
	  notDoneTodos : [],
	  currentTab: tabs[1],
	  modalState : false,
	  users : [],
	  usersFetchedForDropDown : []
    }
  },
  methods : {

	async fetchUsersByName(){

		if(this.todoFor === ""){
			this.usersFetchedForDropDown = [];
		}
		else {
			const { data, status } = await axios.get(
				`http://localhost:5000/api/users/fetchbyname?name=${this.todoFor}`,
				{
					headers: {
					'x-auth-token': this.token,
					},
				},
			);
	
			if(status >= 200 && status < 300){
				this.usersFetchedForDropDown = [...data];
			}
		}

	},

	async getAllUsers(){
		const { data } = 
			await axios.get(`http://localhost:5000/api/users`,);
		this.users = data.map(e => {
			return {
				email : e.email,
				userName : e.userName,
			};
		});
	},

	logout() {
		endSession(cookies);
		router.push('/');
	},

	tabClass(tab) {
		if(tab === this.currentTab)
			return 'todosSideBtn tabActive'
		return 'todosSideBtn';
	},

	modalClass() {
		return this.modalState ? 'modal is-active' : 'modal';	
	},

	async changeTab(tab) {
		this.currentTab = tab;
		await this.getTodos();
	},

	async changeDoneStatus(state,todo){
		const todoToEdit = {
			by: todo.username,
			date: todo.todoDate,
			desc: "des",
			done: state,
			for: todo.todoFor,
			title: todo.todoTitle
		};
		const { data, status } = await axios.put(
			`http://localhost:5000/api/todos/${todo._id}`,
			todoToEdit,
			{
				headers: {
				'x-auth-token': this.token,
				},
			},
		);
		if(status == 201){
			console.log(state);
			if(!state){
				this.notDoneTodos = [...this.notDoneTodos, data]
				this.doneTodos = this.doneTodos.filter(todo => todo._id !== data._id);
				console.log(this.doneTodos);
			}
			else {
				this.doneTodos = [...this.doneTodos, data]
				this.notDoneTodos = this.notDoneTodos.filter(todo => todo._id !== data._id);
				console.log(this.notDoneTodos);
			}
		}
	},

	async getTodos() {
		if(this.currentTab == this.tabContent[0]){
			const { data, status } = await axios.get(
				`http://localhost:5000/api/todos?for=${this.username}`,
				{
					headers: {
					'x-auth-token': this.token,
					},
				},
			);
			if(status >= 200 && status < 300){
				this.doneTodos = data.filter(t => t.done);
				this.notDoneTodos = data.filter(t => !t.done);
			}
			else {
				this.doneTodos = [];
				this.notDoneTodos = [];
			}
		}
	
		else if(this.currentTab == this.tabContent[1]){
			const { data, status } = await axios.get(
				`http://localhost:5000/api/todos?by=${this.username}`,
				{
					headers: {
					'x-auth-token': this.token,
					},
				},
			);
			if(status >= 200 && status < 300){
				this.doneTodos = data.filter(t => t.done);
				this.notDoneTodos = data.filter(t => !t.done);
			}
			else {
				this.doneTodos = [];
				this.notDoneTodos = [];
			}
		}

		else {
			const { data, status } = await axios.get(
				`http://localhost:5000/api/todos`,
				{
					headers: {
					'x-auth-token': this.token,
					},
				},
			);
			if(status >= 200 && status < 300){
				this.doneTodos = data.filter(t => t.done);
				this.notDoneTodos = data.filter(t => !t.done);
			}
			else {
				this.doneTodos = [];
				this.notDoneTodos = [];
			}
		}
	},

	async sendEmail(){
		console.log(this.users);
		const emailContent = {
			recieverEmailAddress : this.users.find(u => u.userName == this.todoFor).email,
			subject: "Task Has Been Added To You by " + this.username,
			message : this.todoTitle
		}
		await axios.post(
			`http://localhost:5000/api/sendemail`,
			emailContent,
			{
				headers: {
				'x-auth-token': this.token,
				},
			},
		);
	},

	async addTodo () {
		if(!this.username) return;
		const todoToCreate = {
			by: this.username,
			date: this.todoDate,
			done: false,
			for: this.todoFor,
			title: this.todoTitle
		};
		const { data, status } = await axios.post(
			`http://localhost:5000/api/todos`,
			todoToCreate,
			{
				headers: {
				'x-auth-token': this.token,
				},
			},
		);
		if(status == 201){
			this.notDoneTodos = [...this.notDoneTodos, data];
			this.sendEmail();
		}
		this.modalState = false;
		this.sendEmail();
	}
  },
  async created () {
    await this.getAllUsers();
	await this.getTodos();
  }
}
</script>
<template>
	<h1>T O D O</h1>
	<div class="card tabs">
		<div :class="tabClass(tab)" v-for="tab in tabContent" @click="changeTab(tab)">{{ tab }}</div>
	</div>
	<div class="card add" @click="() => modalState = true">Add</div>

	<div :class="modalClass(modalState)">
  	<div class="modal-background" @click="()=>modalState=false"></div>
  	<div class="modal-content">
  	  <div class="card">
				<h1>Add Todo</h1>
				<input class="input is-normal" type="text" placeholder="Title" v-model="todoTitle" />

				<div class="dropdown is-hoverable">
					<div class="dropdown-trigger">
						<div class="field">
							<div class="control">
								<input
								 	v-on:input="fetchUsersByName"
									class="input is-normal" 
									type="search	
									" placeholder="For" 
									v-model="todoFor" />
							</div>
						</div>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
							<a href="#" class="dropdown-item" 
								v-for="user in usersFetchedForDropDown" @click="()=>todoFor=user.userName">
								{{user.userName}}
							</a>
						</div>
					</div>
				</div>

				<input class="input is-normal" type="date" placeholder="Date" v-model="todoDate" />
				<button class="button is-normal" @click="addTodo">Add</button>
			</div>
  	</div>
  	<button class="modal-close is-large" aria-label="close" @click="()=>modalState=false"></button>
	</div>

	<nav>
		<div class="sessionContainer">
			<img src="data:image/jpeg;base64,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"/>
			<p>{{ username }}</p>
			<button @click="logout" class="button is-normal is-outlined">Log out</button>
		</div>
	</nav>

	<div class="todos">
		<div class="half">
			<div class="heading">TODO</div>
			<div class="todoList">
				<div class="card todo" v-for="todo in notDoneTodos" :key="todo.title">
					<button class="button is-small" @click="changeDoneStatus(true,todo)">{{todo.done ? "✘" : "✔"}}</button>
					<div class="for">for | {{todo.for}}</div>
					<div class="date">due | {{todo.date}}</div>
					<div class="ttitle">{{todo.title}}</div>
					<div class="assignedH">Assigned by</div>
					<div class="assignedC">{{todo.by}}</div>
				</div>
			</div>
		</div>
		<div class="half">
			<div class="heading">DONE</div>
			<div class="todoList">
				<div class="card todo" v-for="todo in doneTodos" :key="todo.title">
					<button class="button is-small" @click="changeDoneStatus(false,todo)">{{todo.done ? "✘" : "✔"}}</button>
					<div class="for">for | {{todo.for}}</div>
					<div class="date">due | {{todo.date}}</div>
					<div class="ttitle">{{todo.title}}</div>
					<div class="assignedH">Assigned by</div>
					<div class="assignedC">{{todo.by}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.add {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100px;
	height: 40px;
	font-weight: 600;
	color: #4285f4;
	cursor: pointer;
	position: fixed;
	z-index: 100;
	bottom: 0;
	left: 30%;
	transform: translateX(-50%);	
	&:hover {
		color: lightcoral;
	}
}

nav {
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	height: 100px;
	width: 100%;
	background-color: transparent;

	.sessionContainer {
		display: flex;
		position: absolute;
		right: 0;
		margin: 20px;

		img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
			object-fit: cover;
		}

		p {
			font-weight: 600;
			margin: 10px 20px;
		}

		button {
			font-weight: 500;
		}
	}
}

.modal-content {
	z-index: 200;
	width: 500px;
	height: 600px;
	.card {
		display: flex;
		height: 100%;
		width: 100%;
		background-color: white;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h1 {
			font: 'Roboto';
			font-size: 24px;
			font-weight: 500;
			margin-bottom: 20px;
		}

		.dropdown.is-hoverable {
			width: 80%;

			.dropdown-trigger {
				width: 100%;

				input {
					width: 100%;
				}
			}
		}

		input {
			margin-top: 20px;
			width: 80%;
		}

		button {
			margin-top: 20px;
		}
	}
}


.tabs {
	position: fixed;
	z-index: 100;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	width: 500px;
	height: 40px;
	margin: 0;

	.tab {
		color: #abc9f8;
		font-weight: 600;
		cursor: pointer;
		width: 33%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			color: lightcoral;
		}
	}

	.active {
		color: #4285f4;
	}
}

h1 {
	position: absolute;
	color: #4285f4;
	font-size: 36px;
	font-weight: 800;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
}

.todos {
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: center;
	top: 200px;
	left: 50px;
	right: 50px;
	padding-bottom: 150px;

	.half {
		height: calc(100%);
		width: calc(50%);
		display: flex;
		align-items: center;
		flex-direction: column;

		.heading {
			position: absolute;
			font-size: 18px;
			font-weight: 800;
			height: 50px;
			line-height: 50px;
			top: 0;
			color: rgb(161, 161, 161);
		}

		.todoList {
			top: 50px;
			position: relative;
			display: flex;
			height: calc(100% - 50px);
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.todo {
				height: 160px;
				padding: 20px;
				width: 95%;
				margin-top: 10px;

				button {
					position: absolute;
					padding: 5px;
					height: 24px;
					width: 24px;
				}

				.for {
					position: absolute;
					left: 60px;
					font-size: 14px;
					font-weight: 600;
					color: grey;
				}

				.date {
					position: absolute;
					right: 30px;
					font-size: 14px;
					font-weight: 600;
					color: grey;
				}

				.ttitle {
					position: absolute;
					top: 50px;
					left: 60px;
					font-weight: 800;
					font-size: 24px;
				}

				.assignedH {
					position: absolute;
					top: 100px;
					left: 60px;
					font-size: 13px;
					color: grey;
				}

				.assignedC {
					position: absolute;
					top: 120px;
					left: 60px;
					font-weight: 600;
					font-size: 16px;
				}
			}
		}
	}
}
</style>
