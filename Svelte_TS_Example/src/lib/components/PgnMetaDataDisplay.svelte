<script lang="ts">
    let {
        value,
    } : {
        value: any,
    } = $props();
</script>

<div title={value.cleanPgn}>
    <p class="text-sm text-gray-500">Src: {value.src}</p>
    {#if value.instance}
        <p class="text-sm text-gray-500">Instance: {value.instance}</p>
    {/if}
</div>