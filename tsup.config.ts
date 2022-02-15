import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: false,
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	keepNames: true,
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	target: 'es2021',
	tsconfig: 'src/tsconfig.json'
});
