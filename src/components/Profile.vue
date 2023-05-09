<script setup lang="ts">
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';

interface IData {
	owner_id: string;
	url: string;
	caption: string;
}
const posts = ref<IData[]>([]);
const user = ref<Record<string, string> | null>(null);

const route = useRoute();
const { username } = route.params
function addNewPost(post: IData) {
	posts.value.unshift(post)
}

async function fetchData() {
	const {data: userData} = await supabase.from('users')
		.select()
		.eq('username', username)
		.single();
	if (userData) {
		user.value = userData
	}

	const { data: postsData } = await supabase
		.from('posts')
		.select()
		.eq('owner_id', user.value?.id);

	posts.value = postsData
}

onBeforeMount(() => {
	fetchData();
})

</script>
<template>
	<Container>
		<div class="profile-container">
			<!-- {{ posts }} -->
			<UserBar
					:key="($route.params.username as string)"
					:user="user"
					:userInfo="{
					posts: 4,
					followers: 121,
					following: 12
				}"
				:addNewPost="addNewPost"
			/>
			<ImageGallery :posts="posts"
			/>
		</div>
	</Container>
</template>

<style scoped>
	.profile-container {
		display: flex;
		flex-direction: column;
		padding: 20px 0;
	}
</style>