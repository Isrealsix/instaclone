<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
function showModal() {
	visible.value = true;
}

// function handleOk() {
// 	visible.value = false
// }  
</script>
<template>
	<div>
		<AButton @click="showModal">Upload Photo</AButton>
		<!-- <AButton v-modal:visible="visible" title="Basic Modal" @ok="handleOk">
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</AButton> -->
	</div>
</template>
