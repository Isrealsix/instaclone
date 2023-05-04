<script setup lang="ts">
import Nav from './components/Nav.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <main>
		<Nav />
		<RouterView />
	</main>
</template> 

<style scoped>
</style>
