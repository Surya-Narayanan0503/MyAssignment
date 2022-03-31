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
			<img :src="users.filter(u => u.username === session.username)[0].avatar">
			<p>{{ session.username }}</p>
			<button @click="logout" class="button is-normal is-outlined">Log out</button>
		</div>
	</nav>

	<div class="tasks">
		<div class="half">
			<div class="heading">TODO</div>
			<div class="taskList">
				<div class="card task" v-for="task in getTasks(tasks, false)" :key="task.title">
					<button class="button is-small" @click="()=>task.done = true">{{task.done ? "✘" : "✔"}}</button>
					<div class="for">for | {{task.for}}</div>
					<div class="date">due | {{task.date}}</div>
					<div class="ttitle">{{task.title}}</div>
					<div class="assignedH">Assigned by</div>
					<div class="assignedC">{{task.by}}</div>
				</div>
			</div>
		</div>
		<div class="half">
			<div class="heading">DONE</div>
			<div class="taskList">
				<div class="card task" v-for="task in getTasks(tasks, true)" :key="task.title">
					<button class="button is-small" @click="()=>task.done = false">{{task.done ? "✘" : "✔"}}</button>
					<div class="for">for | {{task.for}}</div>
					<div class="date">due | {{task.date}}</div>
					<div class="ttitle">{{task.title}}</div>
					<div class="assignedH">Assigned by</div>
					<div class="assignedC">{{task.by}}</div>
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
