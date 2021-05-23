<script>
	export let yourAnswer;
	export let correctAnswer;
	export let answer;
</script>

<div
	on:click
	class={yourAnswer == correctAnswer && yourAnswer == answer
		? "px-7 font-medium max-w-2xl py-5 text-center bg-green-200  rounded-lg  text-xl ring-4 ring-blue-900"
		: "px-7 font-medium max-w-2xl py-5 text-center bg-white  rounded-lg  text-xl"}
>
	<slot />
</div>
