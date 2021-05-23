<script>
	import SelectDropdown from "../components/SelectDropdown.svelte";
	import { category, difficulty, page } from "../stores/HomeStore";

	let difficulties = ["Any Difficulty", "Easy", "Medium", "Hard"];
	let categories = [
		"Any Category",
		"General Knowledge",
		"Entertainment: Books",
		"Entertainment: Film",
		"Entertainment: Music",
		"Entertainment: Musicals & Theatres",
		"Entertainment: Television",
		"Entertainment: Video Games",
		"Entertainment: Board Games",
		"Science & Nature",
		"Science: Computers",
		"Science: Mathematics",
		"Mythology",
		"Sports",
		"Geography",
		"History",
		"Politics",
		"Art",
		"Celebrities",
		"Animals",
		"Vehicles",
		"Entertainment: Comics",
		"Science: Gadgets",
		"Entertainment: Japanese Anime & Manga",
		"Entertainment: Cartoon & Animations",
	];
	const handleStart = () => {
		page.update(() => {
			return "question";
		});
	};
</script>

<div
	class="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 w-full h h-screen"
>
	<div class="h-screen w-full flex flex-col justify-center items-center">
		<div
			class="max-w-lg bg-white shadow-md rounded-lg transform scale-90 sm:scale-100 overflow-hidden mx-auto"
		>
			<div class="py-4 px-8 mt-3">
				<div class="flex flex-col mb-8">
					<h2
						class="text-gray-700 font-bold text-center text-3xl uppercase tracking-wide mb-2"
					>
						Trivia Games
					</h2>

					<SelectDropdown
						name="Category"
						options={categories}
						bind:value={$category}
					/>
					<SelectDropdown
						name="Difficulty"
						options={difficulties}
						bind:value={$difficulty}
					/>
				</div>

				<div class="py-4 cursor-pointer" on:click={handleStart}>
					<p
						class="block tracking-widest uppercase font-semibold text-center shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-md py-3 px-10 rounded"
					>
						Start
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
