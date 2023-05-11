<script setup lang="ts">
import Card from './Card.vue';
import { supabase } from '../supabase';
import { useUserStore } from '../stores/users';
import { onBeforeMount } from 'vue';

const userStore = useUserStore();

const post = {
	id: 1,
	username: 'keith urban',
	caption: 'go on',
	img: 'https://hips.hearstapps.com/hmg-prod/images/keith-urban-gettyimages-1392268289.jpg'
}

onBeforeMount(() => {
	fetchData()
})

async function fetchData() {
	const response = await supabase.from('followers_following')
	.select('following_id')
	.eq('follower_id', userStore.user.id);

	console.log(response, 'of fetchdata in cards');
}
</script>
<template>
	<div class="timeline-container">
		<Card :post="post" />
	</div>
</template>

<style>
	.timeline-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 0;
	}
</style>