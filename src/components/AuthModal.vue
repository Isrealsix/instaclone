<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/users';

// import { storeToRefs } from 'pinia'
// const { name, doubleCount } = storeToRefs(store)
/*
 * When using only state, it is important to use storeToRefs for reactivity
 * When calling actions, you can destructure state and ignore storeToRefs
 */
interface IProps {
	isLogin: boolean;
}

const userStore = useUserStore();

const props = defineProps<IProps>();
const visible = ref<boolean>(false);
const input = reactive({
	username: '',
	email: '',
	password: '',
});
const showModal = () => {
	visible.value = true;
};

async function handleOk() {
	await userStore.handleSignup(input);
	if (userStore.user.id) {
		visible.value = false;
		clearInput();
	}
}

function clearInput() {
	input.email = '';
	input.username = '';
	input.password = '';
	userStore.clearErrorMessage();
}

function handleCancel() {
	clearInput();
	visible.value = false;
}

const title = props.isLogin ? 'Login' : 'Signup';
</script>
<template>
	<div>
		<AButton type="primary" @click="showModal" class="btn">{{ title }}</AButton>
		<AModal v-model:visible="visible" :title="title" @ok="handleOk">
			<template #footer>
				<AButton key="back" @click="handleCancel"> Cancel </AButton>
				<AButton
					key="submit"
					type="primary"
					@click="handleOk"
					:disabled="userStore.loading"
				>
					Submit
				</AButton>
			</template>
			<div v-if="!userStore.loading" class="input-container">
				<AInput
					class="input"
					v-if="!isLogin"
					v-model:value="input.username"
					placeholder="Username"
					>Basic usage</AInput
				>
				<AInput class="input" v-model:value="input.email" placeholder="Email"
					>Basic usage</AInput
				>
				<AInput
					class="input"
					v-model:value="input.password"
					placeholder="Password"
					type="password"
					>Basic usage</AInput
				>
			</div>
			<div v-else class="spinner">
				<ASpin />
			</div>
			<ATypographyText v-if="userStore.errorMessage" type="danger">{{
				userStore.errorMessage
			}}</ATypographyText>
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

.input-container {
	height: 120px;
}

.spinner {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 120px;
}
</style>
