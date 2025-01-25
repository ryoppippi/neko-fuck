import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import UnpluginTypia from '@ryoppippi/unplugin-typia/vite';

export default defineConfig({
	plugins: [
		UnpluginTypia({
			cache: false
		}),
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	],
	define: {
		'import.meta.vitest': false
	},
	test: {
		includeSource: ['src/**/*.{js,ts,svelte}']
	}
});
