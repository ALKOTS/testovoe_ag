import exer7umConfig from "@exer7um/eslint-config"

// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
	// Your custom configs here
	exer7umConfig,
	{
		rules: {
			"jsdoc/require-jsdoc": "off",
			"unicorn/expiring-todo-comments": "off",
			"vue/prefer-use-template-ref": "off",
			"vue/require-prop-comment": "off",
			"vuejs-accessibility/click-events-have-key-events": "off",
			"vuejs-accessibility/form-control-has-label": "off",
			"vuejs-accessibility/no-autofocus": "off",
		},
	}
)
