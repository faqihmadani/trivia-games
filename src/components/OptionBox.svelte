<script>
	export let yourAnswer;
	export let answer;
</script>

<div
	on:click
	class={yourAnswer == answer
		? "px-7 font-medium max-w-2xl py-5 text-center bg-white cursor-pointer rounded-lg transform transition duration-500 ease-in-out hover:scale-105 text-xl ring-4 ring-pink-500"
		: "px-7 font-medium max-w-2xl py-5 text-center bg-white cursor-pointer rounded-lg transform transition duration-500 ease-in-out hover:scale-105 text-xl"}
>
	<slot />
</div>
