import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'import.meta.vitest': false
	},
	test: {
		includeSource: ['src/**/*.{js,ts,svelte}']
	}
});
