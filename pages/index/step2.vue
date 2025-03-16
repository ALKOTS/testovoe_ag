<script setup lang="ts">
import { UiCountdown } from "#components"
import { Form } from "vee-validate"
import * as yup from "yup"

const { t } = useI18n()

const phone = useRoute("index-step2___ru").query.phone

const codeValidationSchema = yup.object({
	code: yup
		.string()
		.matches(/^\d{4}$/, t("valErrorCode"))
		.required(),
})

const sm = ref<SelectItem>()

const data_create = useLocalStorage<CreateData | undefined>("data_create", {})

const localePath = useLocalePath()

const customError = ref<Record<string, string | undefined>>({})

watch(
	() => data_create.value,
	(newValue) => {
		if (Object.keys(newValue).length < 1) {
			navigateTo(localePath({ name: "index" }))
		} else {
			sm.value = newValue.data.client_channels.find(
				(channel) => channel.type == "sms"
			)
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
		query: {
			session_id: computed(() => data_create.value?.data.session_id),
			type: computed(() => sm.value?.code || "sms"),
		},
		watch: false,
	}
)
const code = ref("")
const { data_check, execute: check } = useFetch<CheckData>(
	"https://api.kod.mobi/api/v1/message/check",
	{
		headers: {
			"x-api-key": "09459085-5327-4ae9-85a8-214b7755fc2a",
		},
		immediate: false,
		method: "GET",
		onResponse: (response) => {
			if (response.response.ok) {
				console.log(response.response._data.data.verify_token)
			} else {
				customError.value = {
					code: t("valErrorCode"),
				}
			}
		},
		query: {
			code,
			session_id: computed(() => data_create.value?.data.session_id),
		},
		watch: false,
	}
)
const countdown = ref<InstanceType<typeof UiCountdown> | null>()
</script>

<template>
	<Form
		v-slot="{ errors }"
		class="flex flex-col items-center bg-inherit *:w-full"
		:validation-schema="codeValidationSchema"
		@invalid-submit="
			() => {
				console.log('invalid-submit')
			}
		"
		@submit="
			(values) => {
				code = values.code
				check()
			}
		"
	>
		<div
			class="flex flex-col items-center justify-center gap-7 bg-inherit h-full"
		>
			<LoginHeader
				:main="t('loginHeaderCode')"
				:sub="`${t('loginSubHeaderCode')} ${phone}`"
			/>

			<div
				class="flex flex-col items-center justify-center gap-10 w-full bg-inherit"
			>
				<UiSelect
					v-model:value="sm"
					:hint="$t('hintCodeMethod')"
					:options="
						data_create?.data.client_channels.map((channel) => ({
							code: channel.type,
							flag: channel.image_url,
							name: channel.name,
						}))
					"
				>
					<template #option="{ option }">
						<div class="flex flex-row gap-[10px] items-center">
							<img
								alt="flag"
								class="size-6 rounded-md"
								:src="option.flag"
							/>

							<div class="font-normal leading-none">
								{{ option.name }}
							</div>
						</div>
					</template>
				</UiSelect>

				<UiInput
					:errors
					:extra-errors="customError"
					:hint="$t('hintCode')"
					:name="'code'"
					type="text"
				>
					<template #postfix>
						<button
							v-show="!countdown?.isRunning"
							class="text-submit font-medium"
							type="button"
							@click="
								() => {
									send()
									countdown?.startTimer()
								}
							"
						>
							Отправить
						</button>
						<UiCountdown
							v-show="countdown?.isRunning"
							ref="countdown"
						/>
					</template>
				</UiInput>

				<div class="w-full flex flex-row gap-[10px]">
					<button
						class="flex-1 w-full flex flex-row justify-center items-center gap-[10px]"
						type="button"
						@click="navigateTo($localePath({ name: 'index' }))"
					>
						<img
							alt="arrow-left"
							class="size-3"
							src="~@/assets/icons/arrow-back.svg"
						/>
						<div class="text-submit font-medium text-base">
							{{ $t("backButton") }}
						</div>
					</button>
					<button
						class="w-full flex-1 bg-submit text-white rounded-md p-input"
						type="submit"
					>
						{{ $t("submitContinue") }}
					</button>
				</div>
			</div>
		</div>
	</Form>
</template>
