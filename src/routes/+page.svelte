<script lang="ts">
	import { executeBrainfuck, isBfChar } from '$lib/bf';
	import * as bfEx from '$lib/bf/examples';

	import CatsView from './CatsView.svelte';
	import BfResultView from './BfResultView.svelte';
	import NavBar from './NavBar.svelte';

	import CatsAudio, { playAudio, stopAllAudio } from './CatsAudio.svelte';
	import { diffChars } from 'diff';
	import delay from 'delay';

	/** define states */
	let textareaValue = $state('');
	let textareaValuePrevious = $state('');
	let bfResult = $state('');

	$effect(() => {
		try {
			bfResult = executeBrainfuck(textareaValue);
		} catch (e) {
			bfResult = '';
		}

		const diff = diffChars(textareaValuePrevious, textareaValue);
		diff.forEach((part: any) => {
			if (part.added != null) {
				const c = part.value.at(0);
				if (c == null) {
					return;
				}
				if (c === '\n') {
					return;
				}
				if (isBfChar(c)) {
					playAudio(c);
				} else {
					playAudio('*');
				}
			}
			if (part.removed) {
				stopAllAudio();
			}
		});

		/** udpate textareaValuePrevious */
		textareaValuePrevious = textareaValue;
	});
	$inspect({ textareaValue, bfResult });

	let typingString = $state<string | undefined>();
	async function typing(input: string) {
		if (typingString != null) {
			return;
		}
		typingString = input;
		textareaValue = '';

		let previoutChar = '';
		await delay(1000);
		for (const c of input.split('')) {
			if (typingString == null) {
				return;
			}
			textareaValue += c;

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
	<NavBar />

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
				bind:value={textareaValue}>
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

		<div class="mx-3"><CatsView inputText={textareaValue} /></div>
	</div>
</main>

<div hidden><CatsAudio /></div>
