<script lang="ts" setup>
import { TPost } from './Timeline.vue'

interface IProps {
	post: TPost
}
defineProps<IProps>()

</script>
<template>
	<ACard hoverable style="width: 240px" class="card">
		<template #cover>
			<img :src="`https://whjgjphvhlwmgllekasd.supabase.co/storage/v1/object/public/images/${post.url}`" alt="" />
		</template>
		<ACardMeta :title="post.username">
			<template #description>{{ post.caption }}</template>
		</ACardMeta>
	</ACard>
</template>

<style scoped>
.card {
	margin-bottom: 20px;
}
</style>