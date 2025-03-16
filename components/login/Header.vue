<template>
	<div class="flex flex-col items-center justify-center gap-10">
		<div class="h-10 max-w-[300px] w-[300px] bg-placeholder">logo</div>
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-3xl font-medium">{{ $t("loginHeader") }}</div>
			<div class="text-base font-normal text-secondary">
				{{ $t("loginSubHeader") }}
			</div>
		</div>
	</div>
</template>
