<script setup lang="ts">
import { ErrorMessage, Field } from "vee-validate"

const { errors, name } = defineProps<{
	errors?: Record<string, string | undefined>
	hint?: string
	name: string
	prefix?: string
	type: string
}>()

const value = defineModel<string>("value")

const isError = ref<boolean | undefined>()

const input = ref<HTMLInputElement | null>()

const { focused: inputFocused } = useFocus(input)

watch(
	() => errors,
	(newValue) => {
		isError.value = newValue && name in newValue
	},
	{ deep: true }
)

watch(
	() => value,
	() => {
		isError.value = false
	},
	{ deep: true }
)
</script>

<template>
	<div class="relative bg-inherit w-full">
		<div
			v-if="hint && value && value.length > 0"
			class="absolute text-[12px] font-normal bg-inherit translate-x-5 translate-y-[-10px] px-1"
			:class="{
				'text-red-500': isError,
				'text-gray-hint': !isError,
			}"
		>
			{{ hint }}
		</div>
		<div
			class="rounded-md p-input w-full outline outline-1 flex flex-row gap-1"
			:class="{
				'outline-red-500': isError,
				'outline-input': !isError,
			}"
		>
			<div v-if="inputFocused || (value && value.length > 0)">+7</div>
			<Field
				:id="name"
				ref="input"
				v-model:model-value="value"
				class="size-full outline-none border-none"
				:name
				:placeholder="hint"
				:type
			/>
		</div>

		<ErrorMessage
			v-if="isError"
			class="text-red-500 text-sm mt-1 px-5"
			:name
		/>
	</div>
</template>
