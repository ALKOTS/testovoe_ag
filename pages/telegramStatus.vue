<script setup lang="ts">
const data_create = useLocalStorage<CreateData | undefined>("data_create", {})
const localePath = useLocalePath()
const bot_link = ref<string>("")
watch(
	() => data_create.value,
	(newValue) => {
		if (Object.keys(newValue).length < 1) {
			navigateTo(localePath({ name: "index" }))
		} else {
			bot_link.value = newValue.data.client_channels.find(
				(channel) => channel.type == "telegram"
			)?.link
		}
	},
	{ deep: true, immediate: true }
)
const { execute: send } = useFetch<SendData>(
	"https://api.kod.mobi/api/v1/message/send",
	{
		headers: {
			"x-api-key": "09459085-5327-4ae9-85a8-214b7755fc2a",
		},
		immediate: false,
		method: "GET",
		onResponse: (response) => {
			if (response.response._data.success) {
				navigateTo(localePath({ name: "index-step2" }))
			}
		},
		query: {
			session_id: computed(() => data_create.value?.data.session_id),
			type: "telegram",
		},
		watch: false,
	}
)
</script>

<template>
	<div
		class="relative w-[500px] h-[600px] outline outline-1 outline-input rounded-md p-[30px] *:w-full bg-white flex flex-col items-center justify-between"
	>
		<button
			class="absolute left-[30px] size-fit"
			type="button"
			@click="navigateTo($localePath({ name: 'index-step2' }))"
		>
			<img
				alt="arrow-left"
				class="size-5"
				src="~@/assets/icons/arrow-back.svg"
			/>
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
				<a class="w-full" :href="bot_link">
					<UiButton>
						{{ $t("continue") }}
					</UiButton>
				</a>

				<button
					class="flex-1 w-full flex flex-row justify-center items-center gap-[10px]"
					type="button"
					@click="() => send()"
				>
					<div class="text-submit font-medium text-base">
						{{ $t("tgCheckStatus") }}
					</div>
				</button>
			</div>
		</div>
	</div>
</template>
