<script setup>
import { apiWorks } from '../api/resources';
import Card from './Card.vue';

let repos = await apiWorks();
console.log(repos);

// interface Work {
// 	title: string;
// 	fadeText: string;
// 	body: string;
// 	image: string;
// 	category: string;
// 	live: boolean;
// 	href: URL;
// 	alt: string;
// 	flexType: string;
// 	tags: string[];
// 	type: string;
// }

let filteredRepos = repos.works;

</script>

<template>


	<Card v-for="work in filteredRepos" :key="work.id"
		:title="work.title"
		:imageToDisplay="work.image"
		:body="work.body"
		:href="work.href.toString()"
		:alt=work.alt
		:flexType="work.flexType"
		:category="work.category"
		:fadeText="work.fadeText"
	/>


</template>

<style>

</style>