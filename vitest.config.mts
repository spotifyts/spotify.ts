/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		globals: true,
		testTimeout: 15_000
	},
	envDir: './tests'
});
