module.exports = {
	trailingComma: 'es5',
	semi: true,
	singleQuote: true,
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	endOfLine: 'auto',
	importOrder: [
		'use client',
		'^react$',
		'^next$',
		'^[a-z]',
		'^[@]',
		'^[../]',
		'^[./]',
		'^.+\\.s?css$',
		'<THIRD_PARTY_MODULES>',
	],
	importOrderBuiltinModulesToTop: true,
	importOrderCaseInsensitive: true,
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderMergeDuplicateImports: true,
	importOrderCombineTypeAndValueImports: true,
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
