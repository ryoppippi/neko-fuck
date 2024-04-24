<script lang="ts">
	import * as u from '@core/unknownutil';
	import girlfriendCat from '$lib/assets/cat_meme/Girlfriend猫.gif';
	import happyCat from '$lib/assets/cat_meme/happyhappy猫.gif';
	import noisyGoat from '$lib/assets/cat_meme/noisyGoat.gif';
	import haCat from '$lib/assets/cat_meme/ハァ猫.gif';
	import angryCat from '$lib/assets/cat_meme/叱る猫.gif';
	import feelBlueCat from '$lib/assets/cat_meme/叱られる猫.gif';
	import dubidubidibuCat from '$lib/assets/cat_meme/Dubidubidu猫.gif';
	import sleepingCat from '$lib/assets/cat_meme/爆睡猫.gif';
	import laughingDog from '$lib/assets/cat_meme/爆笑犬.gif';

	import { executeBrainfuck, isBfChar } from '$lib/bf';
	import * as bfEx from '$lib/bf/examples';

	const catsBfMap = {
		'>': angryCat,
		'<': feelBlueCat,
		'+': dubidubidibuCat,
		'-': sleepingCat,
		'.': happyCat,
		',': girlfriendCat,
		']': haCat,
		'[': noisyGoat
	} as const;

	let textareaValue = $state(bfEx.helloWorld);
	let bfResult = $state('');
	$effect(() => {
		bfResult = executeBrainfuck(textareaValue);
	});
	$inspect({ textareaValue, bfResult });

	let error = $state(null);

	function replaceCat(input: string) {
		return input.split('').map((char) => (isBfChar(char) ? catsBfMap[char] : laughingDog));
	}
</script>

<main>
	<div class="pb-20">
		<p>input brainfuck here👇</p>
		<textarea
			class="h-32 w-1/2 border-solid border-zinc-900"
			placeholder="Type your bf code here"
			bind:value={textareaValue}>
		</textarea>
		{#if error != null}
			<p class="text-red">{error}</p>
		{:else}
			<p class="text-4xl font-bold">
				Result: {bfResult}
			</p>
		{/if}
	</div>
	{#each textareaValue.split('\n') as line}
		<div class="flex flex-wrap">
			{#each replaceCat(line) as cat}
				<img src={cat} alt="cat-{cat}" class="h-12 flex-shrink-0" />
			{/each}
		</div>
	{/each}
</main>
