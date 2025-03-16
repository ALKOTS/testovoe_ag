<script setup lang="ts">
import { ErrorMessage, Field } from "vee-validate"

defineProps<{
	hint?: string
	name: string
	type: string
	value?: string
}>()
</script>

<template>
	<div class="relative bg-inherit w-full">
		<div
			v-if="hint && value && value.length > 0"
			class="absolute text-[12px] font-normal text-gray-hint bg-inherit translate-x-5 translate-y-[-10px] px-1"
		>
			{{ hint }}
		</div>

		<Field
			:id="name"
			class="rounded-md p-input w-full outline outline-1 outline-input"
			:name
			:placeholder="hint"
			:type
			:value
		/>

		<ErrorMessage class="text-red-500 text-sm mt-1" :name />
	</div>
</template>
