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
	<div class="cardContainer">

		<div class="buttonContainer">

			<button class="uppercase tracking-[.2em] text-xs font-light border-[1px] border-white py-3 px-3 rounded-full"
				@click="filterWorks('personal')">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
				</svg>
				<p>personal</p>
			</button>

			<button class="uppercase tracking-[.2em] text-xs font-light border-[1px] border-white py-3 px-3 rounded-full"
				@click="filterWorks('professional')">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M6.59,3.41L2,8L6.59,12.6L8,11.18L4.82,8L8,4.82L6.59,3.41M12.41,3.41L11,4.82L14.18,8L11,11.18L12.41,12.6L17,8L12.41,3.41M21.59,11.59L13.5,19.68L9.83,16L8.42,17.41L13.5,22.5L23,13L21.59,11.59Z" />
				</svg>
				<p>professional</p>
			</button>

			<button class="uppercase tracking-[.2em] text-xs font-light border-[1px] border-white py-3 px-3 rounded-full"
				@click="filterWorks('all')">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z" />
				</svg>
				<p>all works</p>
			</button>

		</div>

		<TransitionGroup name="list">
			<Card client:load v-for="work in filteredRepos" :key="work.id" :title="work.title"
				:imageToDisplay="work.image" :body="work.body" :href="work.href.toString()"
				:alt="work.alt" :flexType="work.flexType" :category="work.category"
				:fadeText="work.fadeText" :live="work.live" :tags="work.tags" :type="work.type" />
		</TransitionGroup>
	</div>
</template>

<style scoped>
	div.cardContainer {
		@apply relative;
	}
	div.buttonContainer {
		@apply flex flex-col gap-4 absolute top-0 left-5 z-10 h-full;
	}
	button {
		@apply bg-transparent text-fade border-fade sticky top-[20%] flex;
	}
	div.buttonContainer button{ 
		@apply flex flex-row items-center justify-center gap-2 transition-all ease-in-out whitespace-nowrap min-w-[51px] max-w-[180px] w-14 hover:w-52 hover:justify-around;
	}
	div.buttonContainer button > p{ 
		@apply opacity-0 hidden absolute transition-all delay-0 ease-in-out;
		font-size: clamp(0.3rem, .3vw, 1rem);
	}
	div.buttonContainer button > svg {
		@apply w-[24px] h-[24px] fill-fade min-w-[24px] max-w-[24px];
	}
	div.buttonContainer button:first-of-type {
		@apply top-[20%];
	}
	div.buttonContainer button:nth-of-type(2) {
		@apply top-[27%];
	}
	div.buttonContainer button:nth-of-type(3) {
		@apply top-[34%];
	}

	svg {
		transition: all 0.01s;
	}

	button:hover, button:hover > svg {
		@apply bg-transparent text-white border-white !fill-white;
	}
	button:hover > p {
		@apply !opacity-100 !block !relative;
	}

	.list-move,
	/* apply transition to moving elements */
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}

	/* ensure leaving items are taken out of layout flow so that moving
	animations can be calculated correctly. */
	.list-leave-active {
		position: absolute;
	}
</style>