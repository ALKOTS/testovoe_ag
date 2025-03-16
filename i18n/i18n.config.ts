export default defineI18nConfig(() => ({
	legacy: false,
	locale: "en",
	messages: {
		en: {
			hintCountry: "Country",
			hintPhone: "Phone number",
			loginFooterConfidentiality: "Confidentiality",
			loginFooterContidions: "Conditions",
			loginHeader: "Enter phone number",
			loginSubHeader: "To log in or register",
			submitContinue: "Continue",
			valErrorPhone: "Invalid phone number",
		},
		ru: {
			hintCountry: "Страна",
			hintPhone: "Номер телефона",
			loginFooterConfidentiality: "Конфиденциальность",
			loginFooterContidions: "Условия",
			loginHeader: "Введите номер телефона",
			loginSubHeader: "Чтобы войти или зарегистрироваться",
			submitContinue: "Продолжить",
			valErrorPhone: "Неверный формат номера",
		},
	},
}))
