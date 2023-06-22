module.exports = {
    root: true,
    env: {
        browser: true,
        amd: true,
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue', 'html', '@typescript-eslint', 'prettier'],
    rules: {
        // 'prettier-vue/prettier': [
        //     'error',
        //     {
        //         printWidth: 500,
        //         singleQuote: true,
        //         semi: true,
        //         trailingComma: 'es5',
        //         vueIndentScriptAndStyle: true,
        //         arrowParens: 'avoid',
        //     },
        // ],
        // 'prettier/prettier': [
        //     'error',
        //     {},
        //     {
        //         usePrettierrc: true,
        //     },
        // ],
        'prettier/prettier': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 1,
                switchCase: 1,
                ignores: [],
            },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 3,
                maxEOF: 1,
                maxBOF: 0,
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 6,
                },
                multiline: {
                    max: 1,
                },
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                closeBracket: 0,
                ignores: [],
            },
        ],
        'no-param-reassign': ['error', { props: false }],
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_vm'],
                allowAfterThis: true,
            },
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'no-return-assign': ['error', 'except-parens'],
        curly: 'off',
        'max-len': [
            'error',
            {
                code: 500,
                ignoreStrings: true,
                ignoreUrls: true,
                ignorePattern: 'data:image',
            },
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'linebreak-style': ['error', 'unix'],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
            },
        ],
        semi: ['error', 'always'],
        'no-plusplus': 'off',
        'prefer-destructuring': 'off',
        radix: 'off',
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
        'vue/this-in-template': ['error', 'never'],
        'vue/attributes-order': [
            'error',
            {
                order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT'],
                alphabetical: false,
            },
        ],
        'vue/order-in-components': [
            'error',
            {
                order: ['name', 'el', 'inheritAttrs', 'functional', 'comments', 'delimiters', 'template', 'parent', 'extends', 'model', 'directives', 'filters', 'mixins', 'components', 'props', 'propsData', 'data', 'asyncData', 'computed', 'watch', 'methods', 'render', 'LIFECYCLE_HOOKS', 'renderError'],
            },
        ],
        'vue/require-default-prop': 'off',
        'no-loop-func': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'func-names': ['error', 'as-needed'],
        'no-unused-expressions': ['error', { allowTernary: true }],
        'vue/no-unused-vars': 'off',
        'no-mixed-operators': ['error', { allowSamePrecedence: true }],
        'no-case-declarations': 'off',
        'prefer-promise-reject-errors': 'off',
        'object-curly-newline': ['error', { consistent: true }],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'prefer-exponentiation-operator': 'off',
        'no-restricted-properties': 'off',
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 5 }],
        'vue/multiline-html-element-content-newline': ['error', { allowEmptyLines: true }],
        'padded-blocks': 'off',
        'no-prototype-builtins': 'off',
        'vue/no-multiple-template-root': 'off',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
};
