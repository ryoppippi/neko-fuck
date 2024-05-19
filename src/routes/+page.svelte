<script lang="ts">
	import { executeBrainfuck } from '$lib/bf';
	import * as bfEx from '$lib/bf/examples';

	import CatsView from './CatsView.svelte';
	import BfResultView from './BfResultView.svelte';
	import CatsAudio, { playAudio, stopAllAudio } from './CatsAudio.svelte';

	import { CurrentAndPreviousRune } from '$lib/rune.svelte.js';

	import * as u from '@core/unknownutil';
	import { Try } from '@qnighy/metaflow/exception';
	import { diffChars } from 'diff';
	import delay from 'delay';

	/** define states */
	let textareaValue = new CurrentAndPreviousRune('');

	/** parsed result by brainf**k compiler */
	let bfResult = $derived.by(() => {
		return Try(() => {
			const { current } = textareaValue;
			u.assert(current, u.isString);
			return executeBrainfuck(current);
		}).done(() => '');
	});

	$effect(() => {
		const previousText = textareaValue.previous ?? '';
		const currentText = textareaValue.current;

		u.assert(previousText, u.isString);
		u.assert(currentText, u.isString);

		const diff = diffChars(previousText, currentText);

		diff.forEach((part: any) => {
			if (part.added != null) {
				const c = part.value.at(0);

				if (c == null) {
					return;
				}

				u.assert(c, u.isString);

				if (c === '\n') {
					return;
				}
				playAudio(c);
			}
			if (part.removed != null) {
				stopAllAudio();
			}
		});
	});
	$inspect({ textareaValue, bfResult });

	let typingString = $state<string | undefined>();
	async function typing(input: string) {
		if (!u.isNullish(typingString)) {
			return;
		}
		typingString = input;
		textareaValue.reset('');

		let previoutChar = '';
		await delay(1000);
		for (const c of input.split('')) {
			if (u.isNullish(typingString)) {
				return;
			}
			textareaValue.current += c;

			const randomTime = previoutChar !== c ? 1500 : (Math.round(Math.random() * 5) + 1) * 100;
			await delay(randomTime);
			previoutChar = c;
		}
		typingString = undefined;
	}
</script>

{#snippet exampleButton(typingText: string, tagText: string)}
	<button class="btn join-item" class:btn-disabled={typingString != null} onclick={() => typing(typingText)}>
		{#if typingString === typingText}
			<span class="loading loading-spinner"></span>
		{/if}
		{tagText}</button>
{/snippet}
<main>
	<div>
		<div class="grid place-items-center">
			<h1>write your brainf**k code here👇</h1>
			<h2>
				you can use the following characters:
				{#each ['>', '<', '+', '-', '.', ',', '[', ']'] as c}
					<span class="mx-1 font-bold">{c}</span>
				{/each}
			</h2>
			<textarea
				class="textarea textarea-bordered h-32 w-3/4"
				placeholder="Type your bf code here"
				bind:value={textareaValue.current}>
			</textarea>
		</div>

		<div>
			<BfResultView {bfResult} />
		</div>

		<article class="grid place-items-center pt-3">
			<p class="join">You can see some examples here👇</p>
			<button
				class="btn btn-error btn-sm"
				class:hidden={typingString == null}
				onclick={() => (typingString = undefined)}>Stop</button>

			<div class="join">
				{@render exampleButton(bfEx.zero_z_zero_a, '0x0a')}
				{@render exampleButton(bfEx.hoge, 'hoge')}
				{@render exampleButton(bfEx.helloWorld, 'Hello World')}
			</div>
		</article>
	</div>

	<div class="divider"></div>
	<div>
		<p class="flex justify-center pb-5 text-2xl font-bold">Cats</p>

		<div class="mx-3"><CatsView inputText={textareaValue.current ?? ''} /></div>
	</div>
</main>

<div hidden><CatsAudio /></div>
