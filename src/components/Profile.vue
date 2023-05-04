<script setup lang="ts">
import Container from './Container.vue';
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
			<h1>IMAGEGALLERY</h1>
		</div>
	</Container>
</template>

<style scoped>
	.profile-container {
		display: flex;
		align-items: center;
		padding: 20px 0;
	}
</style>