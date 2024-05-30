/**
 * @see https://github.com/microsoft/rushstack#readme
 */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * @type {import('eslint/lib/shared/types').Config}
 */
module.exports = {
  root: true,

  env: { node: true },

  plugins: [
    /**
     * @see {@link https://www.npmjs.com/package/eslint-plugin-import} npm
     */
    'import',

    /**
     * @see {@link https://www.npmjs.com/package/eslint-plugin-sort-keys-custom-order} npm
     */
    'sort-keys-custom-order',
  ],

  extends: [
    /**
     * @see {@link https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js} Config
     * @see {@link https://www.npmjs.com/package/eslint} npm
     */
    'eslint:recommended',

    /**
     * @see {@link https://github.com/prettier/eslint-config-prettier/blob/main/index.js} Config
     * @see {@link https://www.npmjs.com/package/eslint-config-prettier} npm
     */
    'prettier',
  ],

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    warnOnUnsupportedTypeScriptVersion: false,
  },

  rules: {
    /**
     * @see {@link https://eslint.org/docs/latest/rules} Documents
     */
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-console': 'off',
    'no-debugger': 'off',
    'func-style': ['error', 'declaration'],
    'require-await': 'warn',
    'no-else-return': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'no-inner-declarations': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'vuetify/components',
            message: 'Use `vuetify/components/<component>` instead.',
          },
        ],
        patterns: [
          {
            group: ['vuetify/lib/*'],
            message: 'Use `vuetify/<content>` instead.',
          },
        ],
      },
    ],

    /**
     * @see {@link https://github.com/import-js/eslint-plugin-import#rules} Documents
     */
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'error',
    'import/no-duplicates': ['warn', { considerQueryString: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          './.*',
          '**/*.sh.*',
          '**/db/docs/**/*',
          '**/db/migrations/**/*',
        ],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'internal',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: '#*/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~~/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '~~/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc' },
        'newlines-between': 'never',
      },
    ],

    /**
     * @see {@link https://github.com/hugoattal/eslint-plugin-sort-keys-custom-order#usage} Documents
     */
    'sort-keys-custom-order/import-object-keys': 'warn',
    'sort-keys-custom-order/export-object-keys': 'warn',
  },

  overrides: [
    {
      files: ['**/*.sh.*'],

      rules: {
        /**
         * @see {@link https://github.com/import-js/eslint-plugin-import#rules} Documents
         */
        'import/no-unresolved': 'off',
      },
    },

    {
      files: [`**/*.{ts,cts,mts,vue}`],

      extends: [
        /**
         * @see {@link https://github.com/vuejs/eslint-config-typescript/blob/main/recommended.js} Config
         * @see {@link https://www.npmjs.com/package/@vue/eslint-config-typescript} npm
         */
        '@vue/eslint-config-typescript/recommended',

        /**
         * @see {@link https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/configs/vue3-recommended.js} Config
         * @see {@link https://www.npmjs.com/package/eslint-plugin-vue} npm
         */
        'plugin:vue/vue3-recommended',

        /**
         * @see {@link https://github.com/future-architect/eslint-plugin-vue-scoped-css/blob/master/lib/configs/vue3-recommended.ts} Config
         * @see {@link https://www.npmjs.com/package/eslint-plugin-vue-scoped-css} npm
         */
        'plugin:vue-scoped-css/vue3-recommended',

        /**
         * @see {@link https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/src/configs/recommended.ts} Config
         * @see {@link https://www.npmjs.com/package/eslint-plugin-vuejs-accessibility} npm
         */
        'plugin:vuejs-accessibility/recommended',

        /**
         * NOTE: Added duplicate rules due to conflicts with Vue's settings.
         *
         * @see {@link https://github.com/prettier/eslint-config-prettier/blob/main/index.js} Config
         * @see {@link https://www.npmjs.com/package/eslint-config-prettier} npm
         */
        'prettier',
      ],

      settings: {
        /**
         * @see {@link https://github.com/import-js/eslint-import-resolver-typescript#configuration} Config
         */
        'import/resolver': { typescript: {} },
      },

      rules: {
        /**
         * @see {@link https://typescript-eslint.io/rules} Documents
         */
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { ignoreRestSiblings: true },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
            disallowTypeAnnotations: true,
          },
        ],

        /**
         * @see {@link https://github.com/import-js/eslint-plugin-import#rules} Documents
         */
        'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],

        /**
         * @see {@link https://eslint.vuejs.org/rules} Documents
         */
        'vue/no-v-html': 'off',
        'vue/valid-v-slot': ['error', { allowModifiers: true }],
        'vue/multi-word-component-names': 'off',
        'vue/block-lang': ['warn', { script: { lang: 'ts' } }],
        'vue/html-self-closing': ['warn', { html: { void: 'always' } }],
        'vue/no-undef-components': [
          'error',
          { ignorePatterns: ['Nuxt*', 'V*', 'Layout*'] },
        ],
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          { registeredComponentsOnly: false },
        ],
      },
    },
  ],
};
