<script setup lang="ts">
import { ref } from 'vue';
import { session } from '../models/session';
import { ITask, tasks } from '../models/tasks';
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

</script>

<template>
	<h1>T O D O</h1>
	<div class="card tabs">
		<div :class="tabClass(tab)" v-for="tab in tabs" @click="() => (currentTab = tab)">{{ tab }}</div>
	</div>
	<div class="card add">Add</div>

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
