<script lang="ts">
	// export let overlayColor = 'rgba(0, 0, 0, 0.4)';

    let {
        buttonText,
        imageAlt,
        imageSrc,
        buttonLink,
		textColor,
    } : {
        buttonText: string,
        imageAlt: string,
        imageSrc: string,
        buttonLink: string,
		textColor: string,
    } = $props();

</script>

<a
	href={buttonLink}
	class="demo-button group relative overflow-hidden rounded-lg block w-full md:w-64 h-48 shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
>
	<img class="absolute inset-0 bg-cover bg-center transition-transform duration-500 fill" aria-hidden="true" src={imageSrc} alt={imageAlt} />

	<div class="absolute inset-0 flex items-center justify-center p-4">
		<span class={`font-bold text-xl text-center tracking-wider z-10 ${textColor} `}>
			{buttonText}
		</span>
	</div>
</a>

<style>
	img {
		background-size: cover;
		background-position: center;
		width: 100%;
		height: 100%;
	}

	.demo-button:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}
</style>
