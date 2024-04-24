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

	import { type BfChar, isBfChar } from '$lib/bf';

	const { inputText } = $props<{ inputText: string }>();

	const catsBfMap = {
		'>': angryCat,
		'<': feelBlueCat,
		'+': dubidubidibuCat,
		'-': sleepingCat,
		'.': happyCat,
		',': girlfriendCat,
		']': haCat,
		'[': noisyGoat
	} as const satisfies Record<BfChar, string>;

	function replaceCat(input: string) {
		return input.split('').map((char) => (isBfChar(char) ? catsBfMap[char] : laughingDog));
	}
</script>

{#each inputText.split('\n') as line}
	<div class="flex flex-wrap">
		{#each replaceCat(line) as cat}
			<img src={cat} alt="cat-{cat}" class="h-12 flex-shrink-0" />
		{/each}
	</div>
{/each}
