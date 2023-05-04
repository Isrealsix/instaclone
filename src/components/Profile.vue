<script setup lang="ts">
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';

</script>
<template>
	<Container>
		<div class="profile-container">
			<UserBar
				username="krisla"
				:userInfo="{
					posts: 4,
					followers: 121,
					following: 12
				}"
			/>
			<ImageGallery :posts="[
				{
					id: 'w-12',
					image: 'https://d.ecumenicalnews.com/full/6750/630-0/louis-litt.jpg'
				},
				{
					id: 'w-12',
					image: 'https://d.ecumenicalnews.com/full/6750/630-0/louis-litt.jpg'
				}
			]"
			/>
		</div>
	</Container>
</template>

<style scoped>
	.profile-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 0;
	}
</style>