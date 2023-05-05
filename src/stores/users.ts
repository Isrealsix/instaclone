import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useUserStore = defineStore('users', () => {
	const user = ref(null);
	const response = reactive({
		message: ''
	});

	const validateEmail = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const handleLogin = () => { }
	
	const handleSignup = (credentials: any) => {
		const { email, password, username } = credentials;

		if (password.length < 6) {
			return response.message = 'Password length is too short'
		}

		if (username.length < 4) {
			return response.message = 'Username is too short'
		}

		if (!validateEmail(email)) {
			return response.message = 'Email is invalid'
		}
	}
	
	const handleLogout = () => { }
	
	const getUser = () => { }
	
	return { handleLogin, response, handleSignup, handleLogout, getUser }
})