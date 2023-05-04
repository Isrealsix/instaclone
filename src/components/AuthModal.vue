<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<boolean>(false);
const showModal = () => {
	visible.value = true
}

function handleOk(e: Event) {
	console.log(e);
	visible.value = false
}
</script>
<template>
	<div>
		<AButton type="primary" @click="showModal">Login</AButton>
		<AModal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
			<p>Some contents</p>
			<p>Some contents</p>
			<p>Some contents</p>
		</AModal>
	</div>
</template>