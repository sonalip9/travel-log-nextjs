module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  overrides: [
    { files: ['*.js', '*.jsx'] },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
      plugins: ['@typescript-eslint', 'import-alias'],
    },
  ],
  rules: {
    // General
    'array-callback-return': 'warn',
    'capitalized-comments': ['error', 'always', { line: { ignoreConsecutiveComments: true } }],
    'default-param-last': 'error',
    'id-length': ['warn', { properties: 'never', exceptionPatterns: ['^_'] }],
    'max-lines': ['error', { max: 250, skipBlankLines: true, skipComments: true }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-multi-assign': 'error',
    'no-multi-spaces': 'warn',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'no-prototype-builtins': 'warn',
    'no-restricted-imports': 'warn',
    'no-shadow': 'off',
    'no-underscore-dangle': ['warn', { allow: ['_id'] }],
    'no-var': 'error',
    'object-shorthand': 'warn',
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-object-spread': 'warn',

    // React Plugin - rules available via `eslint-plugin-react`.
    'react/jsx-boolean-value': 'warn',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-spacing': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-pascal-case': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/jsx-wrap-multilines': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-unescaped-entities': 'off',
    'react/style-prop-object': 'off',

    // React Hooks Plugin - rules available via `eslint-plugin-react-hooks`.
    'react-hooks/exhaustive-deps': 'warn',

    // Import Plugin - rules available via `eslint-plugin-import`.
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Typescript Plugin - rules available via `@typescript-eslint`.
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        name: 'react-redux',
        importNames: ['useSelector', 'useDispatch'],
        message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
      },
    ],
    '@typescript-eslint/no-shadow': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['functions', 'arrowFunctions', 'methods'] },
    ],

    // Import alias Plugin - rules available via `eslint-plugin-import-alias`.
    'import-alias/import-alias': [
      'error',
      {
        relativeDepth: 2,
        aliases: [
          { alias: '@styles', matcher: './src/styles' },
          { alias: '@components', matcher: './src/components' },
          { alias: '@templates', matcher: './src/components/templates' },
          { alias: '@pages', matcher: './src/pages' },
          { alias: '@hooks', matcher: './src/hooks' },
          { alias: '@utils', matcher: './src/utils' },
          { alias: '@types', matcher: './src/types' },
          { alias: '@defs', matcher: './src/defs' },
          { alias: '@', matcher: './src' },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
    'import/external-module-folders': ['node_modules'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
