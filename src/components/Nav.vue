<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Container from './Container.vue';
import { ref } from 'vue';
import AuthModal from './AuthModal.vue';

const searchUsername = ref('');
const onSearch = () => {};
</script>
<template>
	<ALayoutHeader>
		<Container>
			<div class="nav-container">
				<div class="right-content">
					<RouterLink to="/">Instagram</RouterLink>
					<AInputSearch
						v-model:value="searchUsername"
						placeholder="username..."
						style="width: 200px"
						@search="onSearch"
					/>
				</div>
				<div class="left-content">
					<AButton type="primary">Signup</AButton>
					<!-- <AButton type="primary">Login</AButton> -->
					<AuthModal />
				</div>
			</div>
		</Container>
	</ALayoutHeader>
</template>

<style scoped>
.nav-container {
	display: flex;
	justify-content: space-between;
}

.right-content {
	display: flex;
	align-items: center;
}

.right-content a {
	margin-right: 10px;
}

.left-content {
	display: flex;
	align-items: center;
}
.left-content button {
	margin-left: 10px;
}

</style>
