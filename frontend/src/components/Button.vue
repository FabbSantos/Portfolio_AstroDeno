<template>
	<button class="button" @click="handleClick">
		<slot></slot>
		<p>{{ label }}</p>
	</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	label: String,
	type: String
});

const emit = defineEmits(['click']);

function handleClick() {
	emit('click', props.type);
}
</script>

<style scoped>
.button {
	@apply bg-transparent border-fade sticky top-[20%] px-4 flex;
	@apply flex flex-row items-center justify-center gap-2 transition-all !ease-in-out whitespace-nowrap min-w-[51px] max-w-[150px] w-14 hover:w-52 hover:justify-around hover:border-2 rounded-3xl;
}
.button > p {
	@apply opacity-0 hidden absolute transition-all  ease-in-out tracking-wider text-fade;
	font-size: clamp(.7rem, .5vw, 2rem);
}
.button:hover, .button:hover > * {
	@apply bg-transparent text-white border-white !fill-white;
}
.button:hover > p {
	@apply !opacity-100 !block !relative;
}
</style>
