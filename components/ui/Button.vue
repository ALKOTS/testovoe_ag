<script setup lang="ts">
withDefaults(
	defineProps<{
		type?: "button" | "submit"
	}>(),
	{
		type: "submit",
	}
)
const emit = defineEmits<{
	(e: "click"): void
}>()
</script>

<template>
	<button
		class="w-full flex-1 bg-submit text-white rounded-md p-input"
		:type
		@click="emit('click')"
	>
		<slot />
	</button>
</template>
