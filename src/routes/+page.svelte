<script lang="ts">
	import { executeBrainfuck, isBfChar } from '$lib/bf';
	import * as bfEx from '$lib/bf/examples';

	import CatsView from './CatsView.svelte';
	import BfResultView from './BfResultView.svelte';
	import CatsAudio, { playAudio } from './CatsAudio.svelte';
	import { diffChars } from 'diff';

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
		bfResult = executeBrainfuck(textareaValue);

		const diff = diffChars(textareaValuePrevious, textareaValue);
		console.log(diff);
		diff.forEach((part: any) => {
			if (part.added != null) {
				const c = part.value.at(0);
				if (c == null) return;
				if (isBfChar(c)) playAudio(c);
				else playAudio('*');
			}
		});

		/** udpate textareaValuePrevious */
		textareaValuePrevious = textareaValue;
	});
	$inspect({ textareaValue, bfResult });
</script>

<main>
	<CatsAudio />
	<div class="pb-20">
		<p>input brainfuck here👇</p>
		<textarea
			class="h-32 w-1/2 border-solid border-zinc-900"
			placeholder="Type your bf code here"
			bind:value={textareaValue}>
		</textarea>
		<div class="pb-16">
			<BfResultView {bfResult} />
		</div>

		<CatsView inputText={textareaValue} />
	</div>
</main>
