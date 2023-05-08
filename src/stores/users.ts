import { defineStore } from 'pinia';
import { validateEmail } from '../helpers';
import { supabase } from '../supabase';

const initialUser = {
	id: '',
	email: '',
	username: ''
}
export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		username: '',
		email: '',
		password: '',
		loading: false,
		errorMessage: '',
		loadingUser: false,
		user: initialUser
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
			this.loading = true
			const {data: userWithUsername } = await supabase
				.from('users')
				.select()
				.eq('username', username)
				.single();
			
			if (userWithUsername) {
				this.loading = false
				return this.errorMessage = 'User already exists'
			}

			this.errorMessage = ''
			const {error} = await supabase.auth.signUp({
				email,
				password
			})
			if (error) {
				this.loading = false
				console.log(error, 'of fetched error')
				return this.errorMessage = error.message
			}
			await supabase.from('users').insert({
				username,
				email
			});

			const { data: newUser } = await supabase
				.from('users')
				.select()
				.eq('email', email)
				.single()
			
			this.user = {
				id: newUser.id,
				email: newUser.email,
				username: newUser.username
			}
			this.loading = false
		},
		clearErrorMessage() {
			this.errorMessage = ''
		},

		async handleLogin(credentials) {
			const { email, password } = credentials;

			if (!validateEmail(email)) {
				return this.errorMessage = 'Email is invalid'
			}

			if (!password.length) {
				return this.errorMessage = 'Password cannot be empty'
			}

			this.loading = true;
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			})
			if (error) {
				this.loading = false;
				return this.errorMessage = error.message
			}

			const { data: loggedUser } = await supabase
				.from('users')
				.select()
				.eq('email', email)
				.single()
			
			this.user.id = loggedUser.id
			this.user.email = loggedUser.email
			this.user.username = loggedUser.username

			this.loading = false;
			this.errorMessage = ''
		},
		async getUser() {
			this.loadingUser = true
			const { data } = await supabase.auth.getUser();
			
			if (!data.user) {
				this.loadingUser = false;
				return this.user = initialUser;
			}
			const { data: userWithEmail } = await supabase
				.from('users')
				.select()
				.eq('email', data.user.email)
				.single();
			
			this.user.email = userWithEmail.email
			this.user.id = userWithEmail.id
			this.user.username = userWithEmail.username

			this.loadingUser = false
		},
		async handleLogout () {
			await supabase.auth.signOut();
			
			this.user.email = '';
			this.user.id = '';
			this.user.username = ''
			console.log(this.user, 'in store')
		}
		
	},

	
	
	// return { handleLogin, response, handleSignup, handleLogout, getUser }
})