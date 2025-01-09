<script setup>
import { ref, onMounted } from 'vue';
import { apiWorks } from '../api/resources';
import Card from './Card.vue';
import ButtonContainer from './ButtonContainer.vue';
import type { Work } from '../../types/types';

const repos = ref<Work[] | null>(null);
const filteredRepos = ref<Work[]>([]);
const cardContainer = ref(null);

onMounted(async () => {
	try {
		const data = await apiWorks();
		repos.value = data.works;
		filteredRepos.value = data.works;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.target === cardContainer.value) {
					const menuLink = document.querySelector(
						'.menu-item a[href="#work"]'
					).parentElement;
					menuLink.classList.toggle('active', entry.isIntersecting);
				}
			});
		});
		observer.observe(cardContainer.value);
	} catch (error) {
		console.error('Failed to fetch works:', error);
	}
});

function filterWorks(type) {
	if (!repos.value) {
		console.error('repos is undefined');
		return;
	}
	filteredRepos.value =
		type === 'all'
			? repos.value
			: repos.value.filter((work) =>
					Array.isArray(work.type)
						? work.type
								.map((type) => type.toLowerCase())
								.includes(type)
						: work.type.toLowerCase().includes(type)
			  );
}
</script>

<template>
	<div
		class="cardContainer"
		ref="cardContainer"
	>
		<ButtonContainer @filter="filterWorks" />
		<TransitionGroup name="list">
			<Card
				client:load
				v-for="work in filteredRepos"
				:key="work.id"
				:title="work.title"
				:imageToDisplay="work.image"
				:body="work.body"
				:href="work.href.toString()"
				:alt="work.alt"
				:flexType="work.flexType"
				:category="work.category"
				:fadeText="work.fadeText"
				:live="work.live"
				:tags="work.tags"
				:type="work.type"
			/>
		</TransitionGroup>
	</div>
</template>

<style scoped>
div.cardContainer {
	@apply relative;
}
</style>
