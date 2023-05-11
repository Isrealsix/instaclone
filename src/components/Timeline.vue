<script setup lang="ts">
import Card from './Card.vue';
import Container from './Container.vue';
import { useUserStore } from '../stores/users';

const userStore = useUserStore();

const post = {
	id: 1,
	username: 'keith urban',
	caption: 'go on',
	img: 'https://hips.hearstapps.com/hmg-prod/images/keith-urban-gettyimages-1392268289.jpg'
}

export type TPost = typeof post;

</script>
<template>
	<Container>
		<div v-if="!userStore.loadingUser">
			<div v-if="userStore.user.id" class="timeline-container">
				<Card :post="post" />
			</div>
			<div v-else class="timeline-container">
				<h2>Log in to view posts</h2>
			</div>
		</div>
		<div v-else class="spinner">
			<ASpin />
		</div>
	</Container>
</template>

<style scoped>
	.timeline-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 0;
	}

	.spinner {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90vh;
	}
</style>