<script lang="ts">
	import PgnMetaDataDisplay from './PgnMetaDataDisplay.svelte';

    let {
        value,
    } : {
        value: any,
    } = $props();

    const ignoredFields = [
        "description",
        // "pgn",
        "pgnClean",
        "pgnRaw",
        "src",
        "timestamp",
    ];

    let uniqueFields = $derived( Object.keys(value).filter((key) => {return !!! ignoredFields.includes(key)}).sort((a, b) => a.localeCompare(b)) );

</script>

<script module lang="ts">
    export interface DataCardFormat {
		title: string | null,
		label: Array<string | number>,
		value: Array<string | number>,
		unit: Array<string | null>,
		src: number | null,
        instance: string | null,
        rawPGN: string,
        cleanPgn: string,
	}
</script>

<div class="my-2">

    {#if value.description}
        <h2 class="text-lg mb-2 font-bold">{value.description}</h2>
    {/if}

    <div class="bg-white rounded-lg shadow-sm pb-4 px-4">
        
        <div class="flex justify-between items-center py-2">
            <div class="pt-4"></div>
        </div>

        <!-- each for data of card -->
        {#each uniqueFields as field, index}        
            <div class="flex justify-between items-center
                { (index != uniqueFields.length - 1 ? 'pb-4 border-b border-gray-200 ' : '') + (index > 0 ? 'pt-4 ' : '') }"
            >
                <div class="text-left w-1/2">
                    <p class="text-lg">{field}</p>
                </div>
                <div class="text-right w-1/2">
                    <p class="text-xl font-bold overflow-hidden">
                        {value[field]}
                    </p>
                </div>
            </div>
        {/each}

        <PgnMetaDataDisplay value={value} />

    </div>
</div>
