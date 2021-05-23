<script>
	import { onMount } from "svelte";
	import Loading from "../components/Loading.svelte";
	import OptionBox from "../components/OptionBox.svelte";
	import QuestionBox from "../components/QuestionBox.svelte";
	import {
		questionLoading,
		questionData,
		category,
		difficulty,
		page,
	} from "../stores/HomeStore";

	//Array categories
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

	//Fungsi untuk shuffle options
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	let num = 0;
	let question;

	//Fetching Data
	onMount(async () => {
		questionLoading.update(() => {
			return true;
		});
		const categoryNum = categories.indexOf($category) + 8;
		const lowDifficulty = $difficulty.toLowerCase();
		let API_KEY;
		if ($category == "Any Category" && $difficulty == "Any Difficulty") {
			API_KEY = "https://opentdb.com/api.php?amount=10&type=multiple";
		} else if ($category == "Any Category" && $difficulty != "Any Difficulty") {
			API_KEY = `https://opentdb.com/api.php?amount=10&difficulty=${lowDifficulty}&type=multiple`;
		} else if ($category != "Any Category" && $difficulty == "Any Difficulty") {
			API_KEY = `https://opentdb.com/api.php?amount=10&category=${categoryNum}&type=multiple`;
		} else if ($category != "Any Category" && $difficulty != "Any Difficulty") {
			API_KEY = `https://opentdb.com/api.php?amount=10&category=${categoryNum}&difficulty=${lowDifficulty}&type=multiple`;
		}

		try {
			const data = await fetch(API_KEY);
			const result = await data.json();

			questionLoading.update(() => {
				return false;
			});
			question = result.results[num];
			questionData.update(() => {
				return result.results;
			});

			//Mengatur options pertama
			if (num == 0) {
				correctAnswer = question.correct_answer;
				let joinAnswer = question.incorrect_answers;
				joinAnswer.push(correctAnswer);
				let randomAnswer = shuffle(joinAnswer);
				answerObject = [
					{ string: randomAnswer[0], id: 1 },
					{ string: randomAnswer[1], id: 2 },
					{ string: randomAnswer[2], id: 3 },
					{ string: randomAnswer[3], id: 4 },
				];
			}
		} catch (err) {
			error = err;
		}
	});

	let error;
	let answerObject = [];
	let correctAnswer;

	//Reaktif terhadap perubahan num
	$: question = $questionData[num];
	$: {
		if (num > 0) {
			question = $questionData[num];
			let correctAnswer = question.correct_answer;
			let joinAnswer = question.incorrect_answers;
			joinAnswer.push(correctAnswer);
			let randomAnswer = shuffle(joinAnswer);
			answerObject = [
				{ string: randomAnswer[0], id: 1 },
				{ string: randomAnswer[1], id: 2 },
				{ string: randomAnswer[2], id: 3 },
				{ string: randomAnswer[3], id: 4 },
			];
		}
	}

	//Fungsi convert unicode string
	function convert(string) {
		return string.replace(/&#(?:x([\da-f]+)|(\d+));/gi, function (_, hex, dec) {
			return String.fromCharCode(dec || +("0x" + hex));
		});
	}

	const handleBackToHome = () => {
		page.update(() => {
			return "home";
		});
	};
</script>

<div class="bg-gradient-to-r from-blue-300 to-indigo-600 w-full min-h-screen">
	{#if $questionLoading}
		<div class="flex w-full h-screen justify-center items-center ">
			<Loading />
		</div>
	{:else if question}
		<div class="container mx-auto flex flex-col items-center">
			<div class="w-full px-1 my-5 sm:my-3">
				<h1 class="text-white font-medium text-lg">{question.category}</h1>
				<h1 class="capitalize text-white">{question.difficulty}</h1>
			</div>
			<h1 class="text-white font-semibold text-xl mb-5">
				Question Number {num + 1}
			</h1>
			<QuestionBox>
				{convert(
					question.question
						.replace(/&quot;/g, '"')
						.replace(/&ndash;/g, "–")
						.replace(/&eacute;/g, "é")
				)}
			</QuestionBox>
			<div
				class="grid grid-cols-1 sm:grid-cols-2 w-full max-w-md sm:max-w-xl md:max-w-2xl space-y-5 sm:space-y-0 sm:gap-5 mt-8"
			>
				{#each answerObject as answer}
					<OptionBox>{answer.string}</OptionBox>
				{/each}
			</div>
			<button on:click={() => num++}>Next</button>
		</div>
	{:else if error}
		<div class="flex flex-col w-full h-screen justify-center items-center ">
			<h1 class="text-white text-5xl font-bold">404</h1>
			<h1 class="text-white text-2xl font-semibold">Page Not Found</h1>
			<p
				class="underline mt-2 text-xl text-white cursor-pointer"
				on:click={handleBackToHome}
			>
				Back to Home
			</p>
		</div>
	{/if}
</div>
