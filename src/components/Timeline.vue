<script setup lang="ts">
import Card from './Card.vue';
import Container from './Container.vue';

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
		<div class="timeline-container">
			<Card :post="post" />
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
</style>