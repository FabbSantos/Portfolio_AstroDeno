<template>
	<div class="buttonContainer">
		<Button
			label="personal"
			type="personal"
			@click="handleClick"
		>
			<PersonalIcon />
		</Button>
		<Button
			label="professional"
			type="professional"
			@click="handleClick"
		>
			<ProfessionalIcon />
		</Button>
		<Button
			label="all works"
			type="all"
			@click="handleClick"
		>
			<AllWorksIcon />
		</Button>
	</div>
</template>

<script setup>
import Button from './ButtonDefault.vue';
import PersonalIcon from './icons/PersonalIcon.vue';
import ProfessionalIcon from './icons/ProfessionalIcon.vue';
import AllWorksIcon from './icons/AllWorksIcon.vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['filter']);

function handleClick(type) {
	emit('filter', type);
}
</script>

<style scoped>
.buttonContainer {
	@apply flex flex-row gap-8 absolute top-0 left-1/2 -translate-x-1/2 z-10 h-full;
}
.buttonContainer button:first-of-type {
	@apply top-[20%];
}
.buttonContainer button:nth-of-type(2) {
	@apply top-[27%];
}
.buttonContainer button:nth-of-type(3) {
	@apply top-[34%];
}
@media (max-width: 768px) {
	.buttonContainer {
		@apply !left-2;
	}
	.buttonContainer button {
		@apply !w-auto;
	}
}
</style>
