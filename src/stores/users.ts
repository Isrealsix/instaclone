import { defineStore } from 'pinia';
import { validateEmail } from '../helpers';
import { supabase } from '../supabase';

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
		async handleSignup(credentials: {
			username: string;
			email: string;
			password: string;
		}) {
			const { email, password, username } = credentials;

			if (password.length < 6) {
				return this.errorMessage = 'Password length is too short'
			}

			if (username.length < 4) {
				return this.errorMessage = 'Username is too short'
			}

			if (!validateEmail(email)) {
				return this.errorMessage = 'Email is invalid'
			}

			// validate if user exists
			const {data: userWithUsername } = await supabase
				.from('users')
				.select()
				.eq('username', username)
				.single();
			
			if (userWithUsername) {
				return this.errorMessage = 'User already exists'
			}

			this.errorMessage = ''
			const {error} = await supabase.auth.signUp({
				email,
				password
			})
			if (error) {
				console.log(error, 'of fetched error')
				return this.errorMessage = error.message
			}
			await supabase.from('users').insert({
				username,
				email
			})
		}
	}
	// const handleLogin = () => { }
	
	// const handleLogout = () => { }
	
	// const getUser = () => { }
	
	// return { handleLogin, response, handleSignup, handleLogout, getUser }
})