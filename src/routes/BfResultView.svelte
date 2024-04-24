<script lang="ts">
	const { bfResult } = $props<{ bfResult: string }>();

	function convertChar(s: string) {
		return s.replaceAll('\t', '▸▹┊').replaceAll('\n', '⤶\n');
	}
</script>

<div class="flex justify-center">
	<div>
		<p>Result👇</p>
		<p class="whitespace-pre-line text-2xl font-bold">
			{convertChar(bfResult)}
		</p>
	</div>
</div>
