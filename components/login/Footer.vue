<template>
	<div class="flex flex-row justify-between items-center">
		<button class="flex flex-row gap-3" type="button">
			<select
				class="button"
				style="
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
				"
			>
				<option selected>Русский</option>
				<option>English</option>
			</select>
			<img alt="arrow-down" src="~@/assets/icons/arrow-down-filled.svg" />
		</button>
		<div class="flex flex-row gap-6" type="button">
			<button class="button" type="button">Условия</button>
			<button class="button" type="button">Конфиденциальность</button>
		</div>
	</div>
</template>

<style scoped>
.button {
	@apply bg-inherit py-1 text-secondary text-xs;
}
</style>
