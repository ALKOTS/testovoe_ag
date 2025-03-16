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

const phoneValidationSchema = yup.object({
	phone: yup
		.string()
		.matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
		.required("Phone number is required"),
})
</script>

<template>
	<Form
		v-slot="{ isSubmitting }"
		class="w-[500px] h-[600px] outline outline-1 outline-input rounded-md flex flex-col items-center justify-between p-[30px] bg-white *:w-full"
		:validation-schema="phoneValidationSchema"
		@invalid-submit="
			() => {
				console.log('invalid-submit')
			}
		"
		@submit="
			(values) => {
				console.log(values)
			}
		"
	>
		<div
			class="flex flex-col items-center justify-center gap-7 bg-inherit h-full"
		>
			<LoginHeader />
			<div
				class="flex flex-col items-center justify-center gap-10 w-full bg-inherit"
			>
				<UiSelect
					:hint="'Страна'"
					:options="phones"
					:value="phones?.find((phone) => phone.code == 'RU')"
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

				<UiInput :hint="'Номер телефона'" :name="'phone'" type="text" />

				<button
					class="w-full bg-[#007AFF] text-white rounded-md p-input"
					type="button"
				>
					Продолжить
				</button>
			</div>
		</div>
		<LoginFooter />
	</Form>
</template>
