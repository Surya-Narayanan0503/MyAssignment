<script setup lang="ts">
import { ref } from 'vue';
import { endSession, session } from '../models/session';
import { ITask, tasks } from '../models/tasks';
import { users } from '../models/users';
import router from '../router';

const tabs = ['Assigned', 'Created', 'All'];
const currentTab = ref(tabs[0]);

const tabClass = (tab: string) => tab === currentTab.value ? 'tab active' : 'tab';

if(!session.isLoggedIn) router.push('/');

const getTasks = (e: ITask[], done: boolean): ITask[] => {
	if(currentTab.value == tabs[0])
		if(done)
			return e.filter(t => t.for === session.username && t.done);
		else
			return e.filter(t => t.for === session.username && !t.done);

	if(currentTab.value == tabs[1])
		if(done)
			return e.filter(t => t.by === session.username && t.done);
		else
			return e.filter(t => t.by === session.username && !t.done);

	if(done)
		return e.filter(t => t.done);
	else
		return e.filter(t => !t.done);
}

const modalState = ref<boolean>(false);

const modalClass = (modalState: boolean): string => modalState ? 'modal is-active' : 'modal';

const title = ref<string>('');
const tfor = ref<string>('');
const date = ref<string>('');

const addTask = () => {
	if(!session.username) return;
	tasks.value.push({
		by: session.username,
		date: date.value,
		done: false,
		for: tfor.value,
		title: title.value
	});
	modalState.value = false;
}

const logout = () => {
	endSession();
	router.push('/');
};

</script>

<template>
	<h1>T O D O</h1>
	<div class="card tabs">
		<div :class="tabClass(tab)" v-for="tab in tabs" @click="() => (currentTab = tab)">{{ tab }}</div>
	</div>
	<div class="card add" @click="() => modalState = true">Add</div>

	<div :class="modalClass(modalState)">
  	<div class="modal-background" @click="()=>modalState=false"></div>
  	<div class="modal-content">
  	  <div class="card">
				<h1>Add Task</h1>
				<input class="input is-normal" type="text" placeholder="Title" v-model="title" />

				<div class="dropdown is-hoverable">
					<div class="dropdown-trigger">
						<div class="field">
							<div class="control">
								<input class="input is-normal" type="search	" placeholder="For" v-model="tfor" />
							</div>
						</div>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
								<a href="#" class="dropdown-item" v-for="user in users" @click="()=>tfor=user.username">{{user.username}}</a>
						</div>
					</div>
				</div>

				<input class="input is-normal" type="date" placeholder="Date" v-model="date" />
				<button class="button is-normal" @click="addTask">Add</button>
			</div>
  	</div>
  	<button class="modal-close is-large" aria-label="close" @click="()=>modalState=false"></button>
	</div>

	<nav>
		<div class="sessionContainer">
			<p>{{ session.username }}</p>
			<button @click="logout" class="is-normal is-outlined">Log Out</button>
		</div>
	</nav>

	<div class="tasks">
		<div class="half">
			<div class="heading">TODO</div>
			<div class="taskList">
				<div class="card task" v-for="task in getTasks(tasks, false)" :key="task.title">
					<div class="title">{{task.title}}</div>
					<div class="for">{{task.for}}</div>
					<div class="date">{{task.date}} • {{task.by}}</div>
					<div class="field">
						<label>Done</label>
						<input type="checkbox" v-model="task.done" />
					</div>
				</div>
			</div>
		</div>
		<div class="half">
			<div class="heading">DONE</div>
			<div class="taskList">
				<div class="card task" v-for="task in getTasks(tasks, true)" :key="task.title">
					<div class="title">{{task.title}}</div>
					<div class="for">{{task.for}}</div>
					<div class="date">{{task.date}} • {{task.by}}</div>
					<div class="field">
						<label>Done</label>
						<input type="checkbox" v-model="task.done" />
					</div>
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
			width: 80%;
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

.tasks {
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

		.taskList {
			top: 50px;
			position: relative;
			display: flex;
			height: calc(100% - 50px);
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.task {
				height: 40px;
				width: 95%;
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				align-items: center;
				margin-top: 10px;

				.title {
					margin: 0;
					font-size: 18px;
					font-weight: 600;
					padding: 10px;
					width: 200px;
				}

				.date, .for {
					font-weight: 500;
					color: rgb(167, 167, 167);
					width: 200px;
					text-align: center;
				}

				.field {
					label {
						font-weight: 500;
					}

					input {
						margin-right: 20px;
						margin-left: 10px;
					}
				}
			}
		}
	}
}
</style>
