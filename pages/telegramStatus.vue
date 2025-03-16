<template>
	<div
		class="relative w-[500px] h-[600px] outline outline-1 outline-input rounded-md p-[30px] *:w-full bg-white flex flex-col items-center justify-between"
	>
		<button
			class="absolute left-[30px]"
			type="button"
			@click="navigateTo($localePath({ name: 'index-step2' }))"
		>
			<img alt="arrow-left" src="~@/assets/icons/arrow-back.svg" />
		</button>
		<div class="flex flex-col items-center gap-16">
			<div class="flex flex-col items-center gap-7">
				<img
					alt="telegram-logo"
					class="size-28"
					src="~@/assets/icons/tg-plane.svg"
				/>
				<div class="font-medium text-2xl">Telegram</div>
				<div class="text-center text-[#808080]">
					{{ $t("tgBotHint") }}
				</div>
			</div>
			<div class="w-full flex flex-col gap-7 items-center">
				<UiButton>{{ $t("continue") }}</UiButton>
				<button
					class="flex-1 w-full flex flex-row justify-center items-center gap-[10px]"
					type="button"
				>
					<div class="text-submit font-medium text-base">
						{{ $t("tgCheckStatus") }}
					</div>
				</button>
			</div>
		</div>
	</div>
</template>
