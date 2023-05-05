<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/users';

interface IProps {
	isLogin: boolean
}

const userStore = useUserStore();
const { handleSignup } = userStore;

const props = defineProps<IProps>()
const visible = ref<boolean>(false);
const input = reactive({
	username: '',
	email: '',
	password: ''
});
const showModal = () => {
	visible.value = true
}

function handleOk(e: Event) {
	handleSignup(input);
	console.log(e)
	// visible.value = false
}

const title = props.isLogin ? 'Login' : 'Signup';
</script>
<template>
	<div>
		<AButton type="primary" @click="showModal" class="btn">{{ title }}</AButton>
		<AModal v-model:visible="visible" :title="title" @ok="handleOk">
			<AInput class="input" v-if="!isLogin" v-model:value="input.username" placeholder="Username">Basic usage</AInput>
			<AInput class="input" v-model:value="input.email" placeholder="Email">Basic usage</AInput>
			<AInput class="input" v-model:value="input.password" placeholder="Password" type="password">Basic usage</AInput>
			<ATypographyText v-if="userStore.errorMessage" type="danger">{{ userStore.errorMessage }}</ATypographyText>
		</AModal>
	</div>
</template>

<style scoped>
	.btn {
		margin-left: 10px;
	}

	.input {
		margin-top: 5px;
	}
</style>