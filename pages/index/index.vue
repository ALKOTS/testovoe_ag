<script setup lang="ts">
import { Form } from "vee-validate"
import * as yup from "yup"

const { data: phones } = useFetch(
	"https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json",
	{
		method: "GET",

		transform: (response: string) => {
			return JSON.parse(response) as SelectItem[]
		},
	}
)

const country = ref<SelectItem | undefined>()
const phone = ref<string>("")

onMounted(() => {
	country.value = phones.value?.find((phone) => phone.code == "RU")
})

const { t } = useI18n()
const phoneValidationSchema = yup.object({
	phone: yup
		.string()
		.matches(/^\d{10}$/, t("valErrorPhone"))
		.required(),
})
const localePath = useLocalePath()

const customError = ref<Record<string, string | undefined>>({})

const ls = useLocalStorage("data_create", {})

const { execute: create } = useFetch<CreateData>(
	"https://api.kod.mobi/api/v1/message/create",
	{
		headers: {
			"x-api-key": "09459085-5327-4ae9-85a8-214b7755fc2a",
		},
		immediate: true,
		method: "GET",

		onResponse: (response) => {
			if (response.response.ok) {
				ls.value = response.response._data
				navigateTo(
					localePath({
						name: "index-step2",
						query: {
							phone: `${country.value?.dial_code}${phone.value}`,
						},
					})
				)
			} else {
				customError.value = {
					phone: t("valErrorPhone"),
				}
			}
		},
		query: {
			phone: computed(() => `${country.value?.dial_code}${phone.value}`),
			type: "sms",
		},

		watch: false,
	}
)

// const errors = ref<Record<string, string | undefined>>({})
</script>

<template>
	<Form
		v-slot="{ errors }"
		class="flex flex-col items-center bg-inherit *:w-full"
		:validation-schema="phoneValidationSchema"
		@invalid-submit="
			() => {
				console.log('invalid-submit')
			}
		"
		@submit="
			(values) => {
				phone = values.phone
				create()
			}
		"
	>
		<div
			class="flex flex-col items-center justify-center gap-7 bg-inherit h-full"
		>
			<LoginHeader :main="t('loginHeader')" :sub="t('loginSubHeader')" />
			<div
				class="flex flex-col items-center justify-center gap-10 w-full bg-inherit"
			>
				<UiSelect
					v-model:value="country"
					:hint="$t('hintCountry')"
					:options="phones"
				>
					<template #option="{ option }">
						<div class="flex flex-row justify-between text-left">
							<div class="flex flex-row gap-[10px]">
								<div class="leading-none">
									{{ option.flag }}
								</div>
								<div class="font-normal leading-none">
									{{ option.name }}
								</div>
							</div>

							<div class="leading-none">
								{{ option.dial_code }}
							</div>
						</div>
					</template>
				</UiSelect>

				<UiInput
					:errors
					:extra-errors="customError"
					:hint="$t('hintPhone')"
					:name="'phone'"
					:prefix="country?.dial_code"
					type="text"
				/>

				<button
					class="w-full bg-submit text-white rounded-md p-input"
					type="submit"
				>
					{{ $t("submitContinue") }}
				</button>
			</div>
		</div>
	</Form>
</template>
