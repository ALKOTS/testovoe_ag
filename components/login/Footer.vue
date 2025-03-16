<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>

<template>
	<div class="flex flex-row justify-between items-center">
		<div class="flex flex-row gap-3" type="button">
			<select
				class="button"
				style="
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
				"
			>
				<option :selected="locale == 'ru'" @click="setLocale('ru')">
					Русский
				</option>
				<option :selected="locale == 'en'" @click="setLocale('en')">
					English
				</option>
			</select>
			<img alt="arrow-down" src="~@/assets/icons/arrow-down-filled.svg" />
		</div>
		<div class="flex flex-row gap-6" type="button">
			<button class="button" type="button">
				{{ $t("loginFooterContidions") }}
			</button>
			<button class="button" type="button">
				{{ $t("loginFooterConfidentiality") }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.button {
	@apply bg-inherit py-1 text-secondary text-xs;
	cursor: pointer;
}
</style>
