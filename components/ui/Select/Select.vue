<script setup lang="ts">
const { options } = defineProps<{
	hint?: string
	options?: null | SelectItem[]
}>()

const emit = defineEmits<{
	(e: "menuOpen"): void
}>()

const value = defineModel<SelectItem>("value")

const dropdownVisible = ref(false)
const searchQuery = ref("")

const searchInput = ref<HTMLInputElement>()

const dropdownContainer = ref<HTMLDivElement>()
const dropdownMenu = ref<HTMLDivElement>()

const filteredOptions = computed(() => {
	return options?.filter((option) =>
		option.name.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

const selectOption = (option: SelectItem) => {
	value.value = option
	dropdownVisible.value = false
}

onClickOutside(dropdownMenu, () => {
	dropdownVisible.value = false
})
</script>

<template>
	<div ref="dropdownContainer" class="relative w-full bg-white">
		<UiSelectPrompt
			v-model:visible="dropdownVisible"
			:hint
			:value
			@menu-open="emit('menuOpen')"
		/>

		<div
			v-if="dropdownVisible"
			ref="dropdownMenu"
			class="absolute bg-white p-4 my-1 w-full rounded-b-md flex flex-col max-h-80 h-fit overflow-y-auto z-10"
			style="
				box-shadow: 0 6px 12px -3px rgba(0, 0, 0, 0.6),
					0 3px 6px rgba(0, 0, 0, 0.3);
			"
		>
			<div
				class="w-full bg-placeholder flex flex-row p-[10px] gap-1 rounded-md items-center"
			>
				<img
					alt="search-glyph"
					src="~@/assets/icons/search-glyph.svg"
				/>
				<input
					ref="searchInput"
					v-model="searchQuery"
					class="w-full bg-inherit border-none outline-none"
					placeholder="Поиск"
					type="text"
					@click.stop
				/>
				<button
					class="size-3"
					type="button"
					@click="
						() => {
							searchQuery = ''
							searchInput?.focus()
						}
					"
				>
					<img
						alt="clear-icon"
						src="~@/assets/icons/clear-icon.svg"
					/>
				</button>
			</div>

			<button
				v-for="(option, index) in filteredOptions"
				:key="index"
				class="py-4"
				type="button"
				@click="selectOption(option)"
			>
				<slot name="option" :option>
					<div class="flex flex-row gap-[10px] text-left">
						<div class="leading-none">{{ option.flag }}</div>
						<div class="font-normal leading-none">
							{{ option.name }}
						</div>
					</div>
				</slot>
			</button>
			<div
				v-if="!filteredOptions || filteredOptions.length === 0"
				class="text-center text-secondary"
				style="padding-top: 16px"
			>
				Ничего не найдено
			</div>
		</div>
	</div>
</template>
