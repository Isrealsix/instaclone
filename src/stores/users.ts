import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('users', () => {
	const user = ref(null);

	const handleLogin = () => {}
	const handleSignup = () => {}
	const handleLogout = () => {}
	const getUser = () => { }
	
	return { handleLogin, handleSignup, handleLogout, getUser }
})