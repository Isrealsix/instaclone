<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import Container from './Container.vue';
import { ref } from 'vue';
import AuthModal from './AuthModal.vue';
import { useUserStore } from '../stores/users';

const userStore = useUserStore();
const router = useRouter();
const searchUsername = ref('');
const onSearch = () => {
	if (searchUsername.value) {
		router.push(`/profile/${searchUsername.value}`);
		searchUsername.value = '';
	}
};
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
				<div class="content" v-if="!userStore.loadingUser">
					<div class="left-content" v-if="!userStore.user.id">
						<!-- <AButton type="primary">Signup</AButton> -->
						<!-- <AButton type="primary">Login</AButton> -->
						<AuthModal :isLogin="false" />
						<AuthModal :is-login="true" />
					</div>

					<div class="left-content" v-else>
						<AButton type="primary">Profile</AButton>
						<AButton type="primary">Logout</AButton>
					</div>
				</div>
			</div>
		</Container>
	</ALayoutHeader>
</template>

<style scoped>

.content {
	display: flex;
	align-items: center;
}
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
