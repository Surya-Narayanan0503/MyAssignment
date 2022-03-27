import { ref } from 'vue';

export interface IUser {
	username: string;
	password: string;
	avatar: string;
}

export const users = ref<IUser[]>([
	{
		username: 'Surya',
		password: 'pass',
		avatar: "https://randomuser.me/api/portraits/men/4.jpg"
	},
	{
		username: 'Ragu',
		password: 'pass',
		avatar: "https://randomuser.me/api/portraits/men/5.jpg"
	},
]);
