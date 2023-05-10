<script setup lang="ts">
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';
import { useUserStore } from '../stores/users';

interface IData {
	owner_id: string;
	url: string;
	caption: string;
}
const userStore = useUserStore();
const posts = ref<IData[]>([]);
const user = ref<Record<string, string> | null>(null);
const loading = ref(false);
const isFollowing = ref(false);
const route = useRoute();

const { username } = route.params;
function addNewPost(post: IData) {
	posts.value.unshift(post);
}

async function fetchData() {
	loading.value = true;
	const { data: userData } = await supabase
		.from('users')
		.select()
		.eq('username', username)
		.single();

	if (!userData) {
		loading.value = false;
		return (user.value = null);
	}
	user.value = userData;

	const { data: postsData } = await supabase
		.from('posts')
		.select()
		.eq('owner_id', user.value?.id);

	await fetchIsFollowing();
	posts.value = postsData;
	loading.value = false;
}

async function fetchIsFollowing() {
	if (userStore.user?.id && userStore.user.id !== user.value?.id) {
		const { data } = await supabase
			.from('followers_following')
			.select()
			.eq('follower_id', userStore.user.id)
			.eq('following_id', user.value?.id)
			.single();
		if (data) isFollowing.value = true
	}
}

watch(userStore.user, () => {
	fetchIsFollowing()
})
onBeforeMount(() => {
	fetchData();
});
</script>
<template>
	<Container>
		<div class="profile-container" v-if="!loading">
			<UserBar
				:user="user"
				:userInfo="{
					posts: 4,
					followers: 121,
					following: 12,
				}"
				:addNewPost="addNewPost"
				:isFollowing="isFollowing"
			/>
			<ImageGallery :posts="posts" />
		</div>
		<div v-else class="spinner">
			<ASpin />
		</div>
	</Container>
</template>

<style scoped>
.profile-container {
	display: flex;
	flex-direction: column;
	padding: 20px 0;
}

.spinner {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 85vh;
}
</style>
