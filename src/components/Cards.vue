<script setup lang="ts">
import Card from './Card.vue';
import { supabase } from '../supabase';
import { useUserStore } from '../stores/users';
import { onBeforeMount, ref } from 'vue';
import Observer from './Observer.vue';

const userStore = useUserStore();

// const post = {
// 	id: 1,
// 	username: 'keith urban',
// 	caption: 'go on',
// 	img: 'https://hips.hearstapps.com/hmg-prod/images/keith-urban-gettyimages-1392268289.jpg'
// }

interface IPosts {
	id: number
	username: string
	caption: string
	url: string
}

const reachEnd = ref(false)
const posts = ref<IPosts[] | []>([])
const lastCardIndex = ref(2)
const ownersId = ref([])
onBeforeMount(() => {
	fetchData()
})

async function fetchData() {
	const { data: followings } = await supabase.from('followers_following')
	.select('following_id')
	.eq('follower_id', userStore.user.id);

	ownersId.value = followings.map(following => following.following_id);

	const { data } = await supabase
		.from('posts')
		.select()
		.in('owner_id', ownersId.value)
		.range(0, lastCardIndex.value)
		.order('created_at', { ascending: false });

	posts.value = data
}

async function fetchNextSet() {
	if (reachEnd.value) return;
	const { data } = await supabase
		.from('posts')
		.select()
		.in('owner_id', ownersId.value)
		.range(lastCardIndex.value + 1, lastCardIndex.value + 3)
		.order('created_at', { ascending: false });

	posts.value = [
		...posts.value,
			...data
		]

	lastCardIndex.value = lastCardIndex.value + 3

	if (!data.length) {
		reachEnd.value = true;
	}
}
</script>
<template>
	<div class="timeline-container">
		<Card v-for="(post, index) in posts" :key="index" :post="post" />
		<Observer v-if="posts?.length" @intersect="fetchNextSet" />
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