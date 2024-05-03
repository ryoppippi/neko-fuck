<script lang="ts">
	type Props = { bfResult: string };
	let { bfResult }: Props = $props();

	function convertChar(s: string) {
		return s.replaceAll('\t', '▸▹┊').replaceAll('\n', '⤶\n');
	}
</script>

<div class="flex justify-center">
	<div class="card w-96 shadow-md">
		<div class="card-body">
			<h2 class="card-title">Result👇</h2>
			<p class="f whitespace-pre-line rounded-box text-2xl font-bold">
				{convertChar(bfResult)}
			</p>
		</div>
	</div>
</div>
