import { ref } from 'vue';

export interface ITask {
	by: string;
	date: string;
	done: boolean;
	title: string;
	for: string;
}

export const tasks = ref<ITask[]>([
	{
		by: 'Surya',
		date: '20-04-2022',
		done: false,
		title: 'Update NodeJS',
		for: 'Ragu'
	},
	{
		by: 'Ragu',
		date: '20-04-2022',
		done: false,
		title: 'Update Vue',
		for: 'Surya'
	},
	{
		by: 'Ragu',
		date: '20-04-2022',
		done: true,
		title: 'Do something',
		for: 'Surya'
	}
]);