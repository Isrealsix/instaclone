<script setup lang="ts">

type Posts = {
	owner_id: string;
	url: string;
	caption: string;
}

interface IProps {
	posts: Posts[]
}
defineProps<IProps>();
</script>
<template>
	<div class="image-gallery-container">
		<img v-for="post in posts" :key="post.owner_id" :src="`https://whjgjphvhlwmgllekasd.supabase.co/storage/v1/object/public/images/${post.url}`" >
	</div>
</template>

<style scoped>
.image-gallery-container {
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
}

img {
	margin: 5px;
	width: 200px;
}
</style>