<script lang="ts">
	import DemoButton from "$lib/components/DemoButton.svelte";
	import DyLogo from "$lib/svg/Logo.svg";
    import { onMount } from "svelte";

	onMount(() => {
		console.log("Hello World!");
	});

</script>

<svelte:head>
	<title>Digital Yacht Svelte Demo</title>
</svelte:head>

<div class="p-8 bg-gray-100 h-full min-h-screen text-center">
	<div class="flex items-center justify-center">
		<img
			src={DyLogo}
			alt="Digital Yacht logo"
			class="w-50 h-auto object-contain"
		/>
	</div>
	<h1 class="text-4xl font-bold mb-8 pt-4 text-stone-900">
		Getting Started with Njord Cloud
	</h1>

	<div class="pt-4 grid grid-cols-3 gap-4">
		
		<div class="flex items-center justify-center">
			<DemoButton
				buttonText="VIAM Connect Example"
				imageAlt=" "
				buttonLink="/connect-sanity-check"
				textColor="text-stone-900"
			/>
		</div>
		
		<div class="flex items-center justify-center">
			<DemoButton
				buttonText="'all-pgn' data"
				imageAlt=" "
				buttonLink="/health-check"
				textColor="text-stone-900"
			/>
		</div>

		<div class="flex items-center justify-center">
			<DemoButton
				buttonText="Data query example"
				imageAlt=" "
				buttonLink="/data-query"
				textColor="text-stone-900"
			/>
		</div>

	</div>

</div>

<style>
	a {
		color: blue;
		text-decoration: underline;
	}
</style>
