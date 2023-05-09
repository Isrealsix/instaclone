<script lang="ts" setup>
import { useRoute } from 'vue-router';
import UploadPhotoModal from './UploadPhotoModal.vue';
import { useUserStore } from '../stores/users';

interface IProps {
	username: string;
	userInfo: {
		posts: number;
		followers: number;
		following: number;
	}
}
defineProps<IProps>();

const userStore = useUserStore();
const route = useRoute();
const { username: profileUsername } = route.params
</script>

<template>
	<div class="userbar-container">
		<div class="top-content">
			<ATypographyTitle :level="2">{{ username }}</ATypographyTitle>
			<UploadPhotoModal v-if="userStore.user.id && profileUsername === userStore.user.username" />
		</div>
		<div class="bottom-content">	
			<ATypographyTitle :level="5">{{ userInfo.posts }} posts</ATypographyTitle>
			<ATypographyTitle :level="5">{{ userInfo.followers }} followers</ATypographyTitle>
			<ATypographyTitle :level="5">{{ userInfo.following }} following</ATypographyTitle>
		</div>
	</div>
</template>

<style scoped>
.userbar-container {
	padding-bottom: 75px;
}

.top-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.bottom-content {
	display: flex;
	align-items: center;
}

.bottom-content h5 {
	margin: 0 !important;
	padding: 0;
	margin-right: 30px !important;
	align-items: center;
}
</style>