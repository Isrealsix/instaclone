<script setup lang="ts">
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { ref } from 'vue';

interface IData {
	owner_id: string;
	url: string;
	caption: string;
}
const posts = ref<IData[]>([]);

function addNewPost(post: IData) {
	posts.value.push(post)
}

</script>
<template>
	<Container>
		<div class="profile-container">
			{{ posts }}
			<UserBar
					:key="($route.params.username as string)"
					username="krisla"
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