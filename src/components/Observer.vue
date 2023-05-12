<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const emits = defineEmits(['intersect']);
const observer = ref<IntersectionObserver | null>(null);
const rootRef = ref()

onMounted(() => {
	observer.value = new IntersectionObserver(([entry]) => {
		if (entry && entry.isIntersecting) {
			emits('intersect')
		}
	});
	observer.value.observe(rootRef.value)
})
</script>
<template>
	<div class="observer" ref="rootRef"></div>
</template>

<style scoped>
	.observer {
		height: 30px;
		width: 30px;
		background-color: rebeccapurple;
	}
</style>