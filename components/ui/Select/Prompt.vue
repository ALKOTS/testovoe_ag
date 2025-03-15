<script setup lang="ts">
defineProps<{
	hint?: string
	value?: SelectItem
}>()
const emit = defineEmits<{
	(e: "menuOpen"): void
}>()

const dropdownVisible = defineModel<boolean>("visible")

const toggleDropdown = () => {
	dropdownVisible.value = !dropdownVisible.value
	emit("menuOpen")
}
</script>

<template>
	<div class="relative bg-inherit">
		<div
			v-if="hint && value"
			class="absolute text-[12px] font-normal text-gray-hint bg-inherit translate-x-5 translate-y-[-10px] px-1"
		>
			{{ hint }}
		</div>
		<button
			class="p-input outline outline-1 outline-input rounded-md w-full flex flex-row justify-between"
			type="button"
			@click="toggleDropdown"
		>
			<div>{{ value ? value.name : hint }}</div>
			<img alt="arrow-down" src="~@/assets/icons/arrow-down.svg" />
		</button>
	</div>
</template>
