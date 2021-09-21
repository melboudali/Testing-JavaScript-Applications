module.exports = {
	stories: ["../**/*.stories.@(jsx|mdx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		{
			name: "@storybook/addon-docs",
			options: { configureJSX: true }
		}
	]
};
