<script lang="ts">
	import girlfriendCat from '$lib/assets/cat_meme/Girlfriend猫.gif';
	import happyCat from '$lib/assets/cat_meme/happyhappy猫.gif';
	import noisyGoat from '$lib/assets/cat_meme/noisyGoat.gif';
	import haCat from '$lib/assets/cat_meme/ハァ猫.gif';
	import angryCat from '$lib/assets/cat_meme/叱る猫.gif';
	import feelBlueCat from '$lib/assets/cat_meme/叱られる猫.gif';
	import dubidubidibuCat from '$lib/assets/cat_meme/Dubidubidu猫.gif';
	import sleepingCat from '$lib/assets/cat_meme/爆睡猫.gif';
	import laughingDog from '$lib/assets/cat_meme/爆笑犬.gif';

	import { executeBrainfuck } from '$lib/bf.js';

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

	let textareaValue = $state(
		'+++++++++[>++++++++<-]>.<+++++++++[>+++<-]>++.+++++++..+++.<+++++++++[>--------<-]>-------.<+++++++++[>++++++<-]>+.<+++++++++[>++<-]>++++++.+++.------.--------.<+++++++++[>-------<-]>----.<+++++++++[>++++++<-]>+++++.<+++++++++[>++<-]>.'
	);
	$inspect(textareaValue);

	let error = $state(null);

	function replaceCat(input: string) {
		return input.split('').map((char) => {
			const cat = catsBfMap[char];
			if (cat == null) {
				error = new Error(`Invalid character: ${char}`);
				return;
			}
			return cat;
		});
	}
</script>

<main>
	<div class="pb-20">
		<p>input brainfuck here👇</p>
		<textarea
			class="h-32 w-1/2 border-solid border-zinc-900"
			placeholder="Type your bf code here"
			bind:value={textareaValue} />
		{#if error != null}
			<p class="text-red">{error}</p>
		{:else}
			<p class="text-4xl font-bold">
				Result: {executeBrainfuck(textareaValue)}
			</p>
		{/if}
	</div>
	<div class="flex flex-wrap">
		{#each replaceCat(textareaValue) as cat}
			<img src={cat} alt="cat-{cat}" class="h-12 flex-shrink-0" />
		{/each}
	</div>
</main>
