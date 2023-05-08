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

function handleOk(e: Event) {
	userStore.handleSignup(input);
	console.log(e);
	// visible.value = false
}

function handleCancel() {
	userStore.clearErrorMessage();
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
				<AButton key="submit" type="primary" @click="handleOk"> Ok </AButton>
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
</style>
