<script setup>
import { ref, onMounted } from 'vue';
import { apiWorks } from '../api/resources';
import Card from './Card.vue';

let repos = ref(null);
let filteredRepos = ref([]);

onMounted(async () => {
	const data = await apiWorks();
	repos.value = data.works;
	filteredRepos.value = data.works;
});

function filterWorks(type) {
	if (repos.value) {
		filteredRepos.value = repos.value.filter(work =>
			Array.isArray(work.type)
				? work.type.map(type => type.toLowerCase()).includes(type)
				: work.type.toLowerCase().includes(type)
		);
	} else {
		console.error('repos is undefined');
	}
	filteredRepos.value = type === 'all' ? repos.value : filteredRepos.value;
}
</script>



<template>
	<button class="uppercase tracking-[.2em] text-xs font-light border-[1px] border-white max-w-full py-3 px-4 rounded-2xl"
		@click="filterWorks('personal')">
		show personal works
	</button>

	<button class="uppercase tracking-[.2em] text-xs font-light border-[1px] border-white max-w-full py-3 px-4 rounded-2xl"
		@click="filterWorks('professional')">
		show professional works
	</button>

	<button class="uppercase tracking-[.2em] text-xs font-light border-[1px] border-white max-w-full py-3 px-4 rounded-2xl"
		@click="filterWorks('all')">
		show all works
	</button>

	<Card client:load v-for="work in filteredRepos" :key="work.id" :title="work.title" :imageToDisplay="work.image"
		:body="work.body" :href="work.href.toString()" :alt="work.alt" :flexType="work.flexType"
		:category="work.category" :fadeText="work.fadeText" :live="work.live" :tags="work.tags" :type="work.type"/>
</template>