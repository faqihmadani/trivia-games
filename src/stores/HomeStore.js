import { writable } from "svelte/store";

export const category = writable("Any Category");
export const difficulty = writable("Any Difficulty");
export const page = writable("home");

//Loading untuk menunggu fetching pertanyaan
export const questionLoading = writable(false);

//Pertanyaan yang telah didapat
export const questionData = writable([]);

export const rightAnswer = writable("");
export const wrongAnswer = writable("");

//scrore
export const score = writable(0);
