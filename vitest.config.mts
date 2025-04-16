/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		sequence: {
			hooks: 'list'
		},
		fileParallelism: false,
		globals: true,
		testTimeout: 15_000
	},
	envDir: './tests'
});
