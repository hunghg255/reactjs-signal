import { basic } from '@hunghg255/eslint-config';

export default [
  ...basic(),
  {
    rules: {
      indent: 'warn',
    },
  },
  {
    ignores: [
      'dist/**/*.ts',
      'dist/**',
      'scripts/genColorCss.ts',
      'tailwind.config.ts',
      'src/styles/color/color.tailwind.ts',
    ],
  },
];
