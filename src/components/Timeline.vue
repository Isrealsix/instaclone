<script setup lang="ts">
import Container from './Container.vue';
import { useUserStore } from '../stores/users';
import Cards from './Cards.vue';
import LoginMessage from './LoginMessage.vue'

const userStore = useUserStore();

const post = {
	id: 1,
	username: 'keith urban',
	caption: 'go on',
	url: 'https://hips.hearstapps.com/hmg-prod/images/keith-urban-gettyimages-1392268289.jpg'
}

export type TPost = typeof post;

</script>
<template>
	<Container>
		<div v-if="!userStore.loadingUser">
			<Cards v-if="userStore.user.id" />
			<LoginMessage v-else />
		</div>
		<div v-else class="spinner">
			<ASpin />
		</div>
	</Container>
</template>

<style scoped>

	.spinner {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90vh;
	}
</style>