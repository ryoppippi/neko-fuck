<script lang="ts">
	import { executeBrainfuck, isBfChar } from '$lib/bf';
	import * as bfEx from '$lib/bf/examples';

	import CatsView from './CatsView.svelte';
	import BfResultView from './BfResultView.svelte';
	import CatsAudio, { playAudio } from './CatsAudio.svelte';
	import { diffChars } from 'diff';
	import delay from 'delay';

	/** define states */
	let textareaValue = $state('');
	let textareaValuePrevious = $state('');
	let bfResult = $state('');

	/** initialize textareaValue */
	$effect(() => {
		textareaValue = bfEx.hoge;
		textareaValuePrevious = bfEx.hoge;
	});

	$effect(() => {
		try {
			bfResult = executeBrainfuck(textareaValue);
		} catch (e) {
			bfResult = '';
		}

		const diff = diffChars(textareaValuePrevious, textareaValue);
		console.log(diff);
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
	}
</script>

<main>
	<div hidden>
		<CatsAudio />
	</div>

	<div class="pb-16">
		<p>input brainfuck here👇</p>
		<textarea
			class="h-32 w-1/2 border-solid border-zinc-900"
			placeholder="Type your bf code here"
			bind:value={textareaValue}>
		</textarea>
		<div class="flex flex-row gap-3">
			Example:
			<button onclick={() => typing(bfEx.hoge)} disabled={typingString != null}>hoge</button>
			<button onclick={() => typing(bfEx.helloWorld)} disabled={typingString != null}>Hello World</button>
			<button onclick={() => (typingString = undefined)} hidden={typingString == null}>Stop</button>
			<!-- <button>Hello World</button> -->
		</div>
		<div>
			{#if bfResult != ''}
				<BfResultView {bfResult} />
			{/if}
		</div>
	</div>
	<div>
		<CatsView inputText={textareaValue} />
	</div>
</main>
