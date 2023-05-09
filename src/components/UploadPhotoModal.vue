<script lang="ts" setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useUserStore } from '../stores/users';

const visible = ref(false);
const caption = ref('');
const file = ref<File>();
const userStore = useUserStore();
const loading = ref(false);
const errorMessage = ref('');

interface IData {
	owner_id: string;
	url: string;
	caption: string;
}

interface IProps {
	addNewPost: (post: IData) => void
}

const props = defineProps<IProps>();

function showModal() {
	visible.value = true;
}

async function handleOk() {
	loading.value = true;
	const fileName = crypto.randomUUID();
	try {
		if (file.value) {
			const { data } = await supabase.storage.from('images').upload('public/' + fileName, file.value);
	
			if (data) {
				await supabase.from('posts').insert({
					url: data.path,
					caption: caption.value,
					owner_id: userStore.user.id
				})
			}
			props.addNewPost({
				url: data.path,
				caption: caption.value,
				owner_id: userStore.user.id
			})
			caption.value = '';
		}
	} catch (err) {
		console.log('an error of', err)
		errorMessage.value = (err as Record<string, string>).message || 'Unable to upload image'
	} finally {
		visible.value = false;
		loading.value = false;
	}
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
			<div v-if="!loading">
				<input type="file" accept=".jpeg,.png" @change="handleUploadChange" />
			<AInput
				v-model:value="caption"
				:maxLength="50"
				placeholder="Caption..."
			/>
			<ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
			</div>
			<div class="spinner" v-else>
				<ASpin />
			</div>
		</AModal>
	</div>
</template>

<style scoped>
input {
	margin-top: 10px;
}

.spinner {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
