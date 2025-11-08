<script setup>
import { ref, onMounted, computed } from 'vue';
import { apiWorks } from '../api/resources';
import Card from './Card.vue';
import ButtonContainer from './ButtonContainer.vue';

const repos = ref([]);
const filteredRepos = ref([]);
const cardContainer = ref(null);

const firstHalf = computed(() => 
  filteredRepos.value.slice(0, Math.ceil(filteredRepos.value.length/2))
);

const secondHalf = computed(() => 
  filteredRepos.value.slice(Math.ceil(filteredRepos.value.length/2))
);
onMounted(async () => {
	try {
		const data = await apiWorks();
		repos.value = data.works;
		filteredRepos.value = data.works;
		// Development only: Image data check
		if (import.meta.env.DEV) {
			console.log('Image data check:', data.works[0].image);
		}

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
								.map((t) => t.toLowerCase())
								.includes(type.toLowerCase())
						: work.type.toLowerCase().includes(type.toLowerCase())
			  );
}
</script>
<template>
  <div class="cardContainer" ref="cardContainer">
    <div class="filter-section">
      <ButtonContainer @filter="filterWorks" />
    </div>
    <div class="mosaic-container">
      <!-- First Row -->
      <TransitionGroup 
        name="works-transition"
        tag="div"
        class="works-mosaic row-1"
      >
        <Card
          v-for="work in firstHalf"
          :key="`first-row-1-${work.id}`"
          :imageToDisplay="work.image"
          :title="work.title"
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
        <Card
          v-for="work in firstHalf"
          :key="`first-row-2-${work.id}`"
          :imageToDisplay="work.image"
          :title="work.title"
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

      <!-- Second Row -->
      <TransitionGroup 
        name="works-transition"
        tag="div"
        class="works-mosaic row-2"
      >
        <Card
          v-for="work in secondHalf"
          :key="`second-row-1-${work.id}`"
          :imageToDisplay="work.image"
          :title="work.title"
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
        <Card
          v-for="work in secondHalf"
          :key="`second-row-2-${work.id}`"
          :imageToDisplay="work.image"
          :title="work.title"
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
  </div>
</template>
    <style scoped>
    .cardContainer {
      @apply relative p-8;
      background-image: radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 2px);
      background-position: 50% 50%;
      background-size: 2.5rem 2.5rem;
    }

    .filter-section {
      @apply static top-0 z-10 py-4 w-fit mx-auto mb-10 backdrop-blur-sm bg-black/30;
      display: flex;
      justify-content: center;
    }

	.mosaic-container {
	overflow: hidden;
	position: relative;
	min-height: 1000px;
	}

	.works-mosaic {
	display: flex;
	gap: 2rem;
	padding: 3rem;
	height: 500px;
	}

	.row-1 {
	animation: slideLeft 10s linear infinite;
	}

	.row-2 {
	animation: slideRight 10s linear infinite;
	margin-top: 2rem;
	}

    .works-transition-enter-active,
    .works-transition-leave-active {
      transition: all 0.5s ease;
    }

    .works-transition-enter-from,
    .works-transition-leave-to {
      opacity: 0;
      transform: scale(0.9);
    }

    .works-transition-move {
      transition: transform 0.5s ease;
    }

	@keyframes slideLeft {
	from { transform: translateX(0); }
	to { transform: translateX(-50%); }
	}

	@keyframes slideRight {
	from { transform: translateX(-50%); }
	to { transform: translateX(0); }
	}

	.works-mosaic:hover {
	animation-play-state: paused;
	}

	/* Respeitar preferências de movimento reduzido */
	@media (prefers-reduced-motion: reduce) {
		.row-1,
		.row-2 {
			animation: none;
		}

		.works-transition-enter-active,
		.works-transition-leave-active {
			transition: none;
		}
	}
    </style>
