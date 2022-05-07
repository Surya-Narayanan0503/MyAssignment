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
<<<<<<< HEAD
	username: null,
	email: null
=======
	username: null
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
});

export const endSession = (cookies: Cookies) => {
	session.isLoggedIn = 'false';
	session.token = null;
	session.username = null;
<<<<<<< HEAD
	session.email = null;
	cookies.set('isLoggedIn', 'false');
	cookies.set('token', '');
	cookies.set('username', '');
	cookies.set('email', '');
}

export const setSession = (
	{ token, username, isLoggedIn, email }: ISession,
=======
	cookies.set('isLoggedIn', 'false');
	cookies.set('token', '');
	cookies.set('username', '');
}

export const setSession = (
	{ token, username, isLoggedIn }: ISession,
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
	cookies: Cookies
) => {
	session.isLoggedIn = isLoggedIn;
	session.token = token;
	session.username = username;
<<<<<<< HEAD
	session.email = email;
	cookies.set('isLoggedIn', 'true');
	cookies.set('username', username ?? '');
	cookies.set('token', token ?? '');
	cookies.set('email', email ?? '');
=======
	cookies.set('isLoggedIn', 'true');
	cookies.set('username', username ?? '');
	cookies.set('token', token ?? '');
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
};

export const getSession = (cookies: Cookies) => {
	session.isLoggedIn = cookies.get('isLoggedIn') == 'true' ? 'true' : 'false';
	session.token = cookies.get('token') || null;
	session.username = cookies.get('username') || null;
<<<<<<< HEAD
	session.email = cookies.get('email') || null;
=======
>>>>>>> ccdfd4e8ba06c1c2f5f0019def4e0e2ea947bad6
};
