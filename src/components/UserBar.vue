<script lang="ts" setup>
import { useRoute } from 'vue-router';
import UploadPhotoModal from './UploadPhotoModal.vue';
import { useUserStore } from '../stores/users';
import { supabase } from '../supabase';

interface IData {
	owner_id: string;
	url: string;
	caption: string;
}

interface IProps {
	user: Record<string, string> | null;
	userInfo: {
		posts: number;
		followers: number;
		following: number;
	};
	addNewPost: (post: IData) => void;
	isFollowing: boolean;
	updateIsFollowing: (following: boolean) => void
}
const props = defineProps<IProps>();

const userStore = useUserStore();
const route = useRoute();
const { username: profileUsername } = route.params;

async function followUser() {
	props.updateIsFollowing(true)
	await supabase.from('followers_following')
		.insert({
			follower_id: userStore.user.id,
			following_id: props.user?.id
		})
}

async function unFollowUser() {
	props.updateIsFollowing(false)
	await supabase.from('followers_following')
		.delete()
		.eq('follower_id', userStore.user.id)
		.eq('following_id', props.user?.id)
}
</script>

<template>
	<div class="userbar-container" v-if="user?.username">
		<div class="top-content">
			<ATypographyTitle :level="2">{{ user.username }}</ATypographyTitle>
			<div v-if="userStore.user.id">
				<UploadPhotoModal
					v-if="profileUsername === userStore.user.username
					"
					:addNewPost="addNewPost"
				/>
				<div v-else>
					<AButton v-if="!isFollowing" @click="followUser">Follow</AButton>
					<AButton v-else @click="unFollowUser">Unfollow</AButton>
				</div>
			</div>
		</div>
		<div class="bottom-content">
			<ATypographyTitle :level="5">{{ userInfo.posts }} posts</ATypographyTitle>
			<ATypographyTitle :level="5"
				>{{ userInfo.followers }} followers</ATypographyTitle
			>
			<ATypographyTitle :level="5"
				>{{ userInfo.following }} following</ATypographyTitle
			>
		</div>
	</div>
	<div class="userbar-container" v-else>
		<div class="top-content">
			<ATypographyTitle :level="2">User not found</ATypographyTitle>
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
