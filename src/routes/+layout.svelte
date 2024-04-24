<script>
	import '../app.css';
	import NavBar from './NavBar.svelte';
	const { children } = $props();
</script>

<svelte:head>
	<title>Neko f**k</title>
</svelte:head>

<NavBar />
{@render children()}
