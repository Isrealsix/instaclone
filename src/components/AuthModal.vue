<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
	isLogin: boolean
}
const props = defineProps<IProps>()
const visible = ref<boolean>(false);
const showModal = () => {
	visible.value = true
}

function handleOk(e: Event) {
	console.log(e);
	visible.value = false
}

const title = props.isLogin ? 'Login' : 'Signup';
</script>
<template>
	<div>
		<AButton type="primary" @click="showModal" class="btn">{{ title }}</AButton>
		<AModal v-model:visible="visible" :title="title" @ok="handleOk">
			<AInput class="input" v-if="!isLogin" v-model:value="value" placeholder="Username">Basic usage</AInput>
			<AInput class="input" v-model:value="value" placeholder="Email">Basic usage</AInput>
			<AInput class="input" v-model:value="value" placeholder="Password">Basic usage</AInput>
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