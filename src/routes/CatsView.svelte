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

	import { isBfChar } from '$lib/bf';
	import { ghostChar, type CatsBfMapKey } from '$lib/types';

	type Props = { inputText: string };
	const { inputText = $bindable('') }: Props = $props();

	const catsBfMap = {
		'>': angryCat,
		'<': feelBlueCat,
		'+': dubidubidibuCat,
		'-': sleepingCat,
		'.': happyCat,
		',': girlfriendCat,
		']': haCat,
		'[': noisyGoat,
		'👻': laughingDog
	} as const satisfies Record<CatsBfMapKey, string>;

	function replaceCat(input: string) {
		return input.split('').map((char) => {
			const bfchar = (isBfChar(char) ? char : ghostChar) satisfies CatsBfMapKey;
			return [bfchar, catsBfMap[bfchar]];
		});
	}
</script>

{#each inputText.split('\n') as line}
	<div class="flex flex-wrap">
		{#each replaceCat(line) as [key, cat]}
			<div class="tooltip lg:tooltip-info" data-tip={key}>
				<img src={cat} alt="cat-{key}" class="h-12 flex-shrink-0" />
			</div>
		{/each}
	</div>
{/each}
