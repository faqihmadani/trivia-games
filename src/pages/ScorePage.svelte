<script>
	import { page, score } from "../stores/HomeStore";

	const handleBackToHome = () => {
		page.update(() => {
			return "home";
		});
		score.update(() => {
			return 0;
		});
	};
</script>

<div
	class="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 w-full h h-screen"
>
	<div class="h-screen w-full flex flex-col justify-center items-center">
		<div class="max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto">
			<div class="py-4 px-8 mt-3">
				<div class="flex flex-col mb-8">
					<h2
						class="text-gray-700 font-bold text-center text-2xl uppercase tracking-wide mb-2"
					>
						Your Score :
					</h2>
					<h2
						class="text-gray-700 font-bold text-center text-6xl uppercase tracking-wide mb-2"
					>
						{$score}
					</h2>
				</div>

				<div class="py-2 cursor-pointer" on:click={handleBackToHome}>
					<p
						class="block tracking-widest uppercase font-semibold text-center shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-md py-3 px-10 rounded"
					>
						Back to home
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
