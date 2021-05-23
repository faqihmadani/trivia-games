<script>
	import { page } from "./stores/HomeStore";
	import Home from "./pages/Home.svelte";
	import Tailwindcss from "./Tailwindcss.svelte";
	import Question from "./pages/Question.svelte";
	import ScorePage from "./pages/ScorePage.svelte";
</script>

<Tailwindcss />
{#if $page == "home"}
	<Home />
{:else if $page == "question"}
	<Question />
{:else if $page == "score"}
	<ScorePage />
{/if}

<style>
</style>
