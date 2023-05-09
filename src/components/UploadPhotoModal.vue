<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const caption = ref('');
const file = ref<File>();
function showModal() {
	visible.value = true;
}

function handleOk() {
	visible.value = false;
}

function handleUploadChange(ev: Event) {
	const target = ev.target as HTMLInputElement;
	const uploadedFile = target.files?.[0] as File
	if (target.files?.[0]) {
		file.value = uploadedFile
	}
}

</script>
<template>
	<div>
		<AButton @click="showModal">Upload Photo</AButton>
		<AModal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
			<input type="file" accept=".jpeg,.png" @change="handleUploadChange" />
			<AInput
				v-model:value="caption"
				:maxLength="50"
				placeholder="Caption..."
			/>
		</AModal>
	</div>
</template>

<style scoped>
input {
	margin-top: 10px;
}
</style>
