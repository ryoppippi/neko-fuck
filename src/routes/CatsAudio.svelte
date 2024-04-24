<script context="module" lang="ts">
	import * as u from '@core/unknownutil';

	const isCatsBfMapKey = u.isUnionOf([isBfChar, u.isLiteralOf('*')]);
	type CatsBfMapKey = u.PredicateType<typeof isCatsBfMapKey>;

	const elements = new Map<CatsBfMapKey, HTMLAudioElement>();

	/** play audio from beginning */
	export async function playAudio(bfchar: CatsBfMapKey) {
		console.log({ elements });
		u.assert(bfchar, isCatsBfMapKey);

		const audioElement = elements.get(bfchar) as HTMLAudioElement;

		/** stop other elements */
		for (const [_, element] of elements) {
			if (element !== audioElement) {
				element.pause();
				element.currentTime = 0;
			}
		}

		audioElement.currentTime = 0;

		audioElement.play();
	}

	export async function stopAllAudio() {
		for (const [_, element] of elements) {
			element.pause();
			element.currentTime = 0;
		}
	}
</script>

<script lang="ts">
	import girlfriendCat from '$lib/assets/cat_meme/Girlfriend猫.webm';
	import happyCat from '$lib/assets/cat_meme/happyhappy猫.webm';
	import noisyGoat from '$lib/assets/cat_meme/noisyGoat.webm';
	import haCat from '$lib/assets/cat_meme/ハァ猫.webm';
	import angryCat from '$lib/assets/cat_meme/叱る猫.webm';
	import feelBlueCat from '$lib/assets/cat_meme/叱られる猫.webm';
	import dubidubidibuCat from '$lib/assets/cat_meme/Dubidubidu猫.webm';
	import sleepingCat from '$lib/assets/cat_meme/爆睡猫.webm';
	import laughingDog from '$lib/assets/cat_meme/爆笑犬.webm';

	import type { Entries } from 'type-fest';
	import { isBfChar } from '$lib/bf';
	import { browser } from '$app/environment';

	const catsBfMap = {
		'>': angryCat,
		'<': feelBlueCat,
		'+': dubidubidibuCat,
		'-': sleepingCat,
		'.': happyCat,
		',': girlfriendCat,
		']': haCat,
		'[': noisyGoat,
		'*': laughingDog
	} as const satisfies Record<CatsBfMapKey, string>;
</script>

{#if browser}
	{#each Object.entries(catsBfMap) as Entries<typeof catsBfMap> as [key, cat]}
		<audio
			src={cat}
			controls
			oncanplay={({ currentTarget }) => elements.set(u.ensure(key, isCatsBfMapKey), currentTarget as HTMLAudioElement)}
		></audio>
	{/each}
{/if}
