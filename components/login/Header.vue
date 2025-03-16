<script setup lang="ts">
defineProps<{
	main?: string
	sub?: string
}>()
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-10">
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-3xl font-medium">{{ main }}</div>
			<div class="text-base font-normal text-secondary">
				{{ sub }}
			</div>
		</div>
	</div>
</template>
