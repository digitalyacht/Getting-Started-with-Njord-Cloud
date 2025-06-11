<script lang="ts">
    import { onMount, untrack } from 'svelte';
	import '../app.css';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	
	let { children } = $props();

	let showLayout : boolean = $state(browser ? location.pathname != "/": true);

	onMount(() => {
		if(browser) showLayout = location.pathname != "/";
	});
	
	$effect(() => {
		if($page.url.pathname) untrack(() => {showLayout = location.pathname != "/"})
	});

	function backButtonClicked(){
		goto("..");
	}

</script>

{#if showLayout}
<div class="w-screen h-screen text-stone-900">
	<div class="border-b border-gray-300 p-2 grid place-items-center grid-cols-5">
		<button class="bg-blue-50 hover:bg-blue-100 rounded px-4 py-2 flex justify-between" onclick={backButtonClicked}>
			Back
		</button>
		<h1 class="font-bold text-2xl col-span-3">Getting Started with Njord Cloud</h1>
	</div>
	<div class="h-full overflow-y-auto">
		{@render children()}
	</div>
</div>
{:else}
	{@render children()}
{/if}