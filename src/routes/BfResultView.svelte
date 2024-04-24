<script lang="ts">
	const { bfResult } = $props<{ bfResult: string }>();

	function convertChar(s: string) {
		return s.replaceAll('\t', '▸▹┊').replaceAll('\n', '⤶\n');
	}
</script>

<p class="whitespace-pre-line text-4xl font-bold">
	Result: {convertChar(bfResult)}
</p>

