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
	  users : []
    }
  },
  methods : {

	async getAllUsers(){
		const { data, status } = 
			await axios.get(`http://localhost:5000/api/users`,);
		this.users = data.map(e => e.userName)
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

			console.log(data);
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

	async addTodo () {
		if(!this.username) return;
		const todoToCreate = {
			by: this.username,
			date: this.todoDate,
			desc: "some desc",
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
			this.notDoneTodos = [...this.notDoneTodos, data]
		}
		this.modalState = false;
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
								<input class="input is-normal" type="search	" placeholder="For" v-model="todoFor" />
							</div>
						</div>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
							<a href="#" class="dropdown-item" 
								v-for="user in users" @click="()=>todoFor=user">
								{{user}}
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
	position: absolute;
	bottom: 0;
	left: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100px;
	height: 40px;
	font-weight: 600;
	color: #4285f4;
	cursor: pointer;

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
			width: 48px;
			height: 48px;
			border-radius: 50%;
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
	position: absolute;
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
	align-items: center;
	justify-content: center;
	top: 200px;
	left: 50px;
	right: 50px;
	height: 72%;

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
