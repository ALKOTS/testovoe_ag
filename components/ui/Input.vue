<script setup lang="ts">
defineProps<{
	hint?: string
}>()

const value = defineModel<string>("value")
</script>

<template>
	<div class="relative bg-inherit w-full">
		<div
			v-if="hint && value && value.length > 0"
			class="absolute text-[12px] font-normal text-gray-hint bg-inherit translate-x-5 translate-y-[-10px] px-1"
		>
			{{ hint }}
		</div>
		<input
			v-model="value"
			class="rounded-md p-input w-full outline outline-1 outline-input"
			:placeholder="hint"
			type="text"
		/>
	</div>
</template>
