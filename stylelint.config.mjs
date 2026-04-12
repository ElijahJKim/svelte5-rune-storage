const pos = [
	'grid-column',
	'position',
	'z-index',
	'object-position',
	'top',
	'right',
	'bottom',
	'left',
	'inset'
];

const otherPos = ['transform', 'transform-origin', 'translate'];

const display = [
	'display',
	'grid-template-columns',
	'grid-template-rows',
	'grid-auto-rows',
	'grid-gap',
	'flex-direction',
	'flex-wrap',
	'flex',
	'flex-grow',
	'flex-shrink',
	'justify-content',
	'justify-self',
	'align-items',
	'align-self',
	'place-items',
	'gap',
	'row-gap',
	'column-gap',
	'overflow',
	'overflow-x',
	'overflow-y'
];

const box = [
	'box-sizing',
	'width',
	'min-width',
	'max-width',
	'height',
	'min-height',
	'max-height',
	'margin',
	'margin-top',
	'margin-right',
	'margin-bottom',
	'margin-left',
	'margin-inline',
	'padding',
	'padding-top',
	'padding-right',
	'padding-bottom',
	'padding-left',
	'padding-inline'
];

const appearance = [
	'border',
	'border-color',
	'border-style',
	'border-width',
	'border-top',
	'border-right',
	'border-bottom',
	'border-left',
	'border-radius',
	'outline',
	'box-shadow',
	'background',
	'background-image',
	'background-repeat',
	'background-position',
	'background-position-x',
	'background-position-y',
	'background-clip',
	'background-origin',
	'background-size',
	'background-blend-mode',
	'background-color'
];

const type = [
	'color',
	'font',
	'font-family',
	'font-size',
	'font-weight',
	'line-height',
	'text-align',
	'vertical-align',
	'text-decoration',
	'text-transform',
	'letter-spacing'
];

const svg = ['stroke', 'stroke-width'];

// properties that modify the entire, completed appearance
const effects = ['opacity', 'filter'];

const interaction = [
	'pointer-events',
	'cursor',
	'scroll-margin',
	'scroll-margin-top',
	'scroll-margin-right',
	'scroll-margin-bottom',
	'scroll-margin-left'
];

const propertyGroups = [pos, otherPos, display, box, appearance, type, svg, effects, interaction];

const propertiesOrder = propertyGroups.map((properties) => ({
	properties
}));

export default {
	plugins: ['stylelint-order'],
	extends: ['stylelint-config-standard-scss', 'stylelint-config-css-modules'],
	rules: {
	'declaration-empty-line-before': [
      'never',
      {
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
		'scss/at-rule-no-unknown': true,
		'scss/function-no-unknown': null,
		'scss/operator-no-newline-after': null, // Conflicts with Prettier
		'scss/at-mixin-pattern': null, // Allow camelCase mixin names
		'at-rule-no-unknown': null,
		'order/properties-order': [
			propertiesOrder,
			{
				severity: 'warning'
			}
		]
	},
	overrides: [
		{
			files: ['*.svelte', '**/*.svelte'],
			customSyntax: 'postcss-html'
		}
	]
};
