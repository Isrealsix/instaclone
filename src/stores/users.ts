import { defineStore } from 'pinia';
import { validateEmail } from '../helpers';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		username: '',
		email: '',
		password: '',
		errorMessage: ''
	}),
	getters: {},
	actions: {
		handleSignup(credentials: {
			username: string;
			email: string;
			password: string;
		}) {
			const { email, password, username } = credentials;

			if (password.length < 6) {
				console.log('short pass')
				return this.errorMessage = 'Password length is too short'
			}

			if (username.length < 4) {
				console.log('short usr')
				return this.errorMessage = 'Username is too short'
			}

			if (!validateEmail(email)) {
				console.log('short email')
				return this.errorMessage = 'Email is invalid'
			}

			this.errorMessage = ''
		}
	}
	// const handleLogin = () => { }
	
	// const handleLogout = () => { }
	
	// const getUser = () => { }
	
	// return { handleLogin, response, handleSignup, handleLogout, getUser }
})