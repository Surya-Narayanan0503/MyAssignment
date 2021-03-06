import { reactive } from 'vue';

type Cookies = {
	get: (keyName: string) => string;
	set: (keyName: string, value: string) => any;
};

export interface ISession {
	isLoggedIn: 'true' | 'false';
	token: string | null;
	username: string | null;
	email : string | null;
}

export const session: ISession = reactive<ISession>({
	isLoggedIn: 'false',
	token: null,
	username: null,
	email: null
});

export const endSession = (cookies: Cookies) => {
	session.isLoggedIn = 'false';
	session.token = null;
	session.username = null;
	session.email = null;
	cookies.set('isLoggedIn', 'false');
	cookies.set('token', '');
	cookies.set('username', '');
	cookies.set('email', '');
}

export const setSession = (
	{ token, username, isLoggedIn, email }: ISession,
	cookies: Cookies
) => {
	session.isLoggedIn = isLoggedIn;
	session.token = token;
	session.username = username;
	session.email = email;
	cookies.set('isLoggedIn', 'true');
	cookies.set('username', username ?? '');
	cookies.set('token', token ?? '');
	cookies.set('email', email ?? '');
};

export const getSession = (cookies: Cookies) => {
	session.isLoggedIn = cookies.get('isLoggedIn') == 'true' ? 'true' : 'false';
	session.token = cookies.get('token') || null;
	session.username = cookies.get('username') || null;
	session.email = cookies.get('email') || null;
};
