import { ref } from 'vue';

export interface IUser {
	username: string;
	password: string;
}

export const users = ref<IUser[]>([
	{
		username: 'Surya',
		password: 'pass',
	},
	{
		username: 'Ragu',
		password: 'pass',
	},
]);
