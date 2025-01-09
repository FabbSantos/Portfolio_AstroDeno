<template>
	<div class="mosaic-card">
		<div class="card-image">
			<img :src="imageToDisplay" :alt="alt" />
		</div>
		
		<div class="card-overlay">
			<div class="card-content">
				<h2 class="card-title">{{ title }}</h2>
				<p class="card-description">
					<span>{{ fadeText }}</span>
					{{ body }}
				</p>
				<div class="tags-wrapper">
					<span v-for="tag in tags" class="tag">{{ tag }}</span>
				</div>
				<a v-if="href" :href="href" class="explore-btn" target="_blank">
					explore project
					<svg class="chev" height="15" width="15" viewBox="0 0 185.343 185.343">
						<path d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: String,
		body: String,
		fadeText: String,
		category: String,
		href: String,
		alt: String,
		avatar: String,
		imageToDisplay: String,
		imageToDisplayAbout: Array,
		flexType: String,
		cardColor: String,
		live: Boolean,
		tags: Array,
		type: Array
	});
	console.log('Card received image:', props.imageToDisplay);

</script>
	<style scoped>
	.mosaic-card {
		position: relative;
		max-width: 400px;
		min-width: 400px;
		max-height: 400px;
		overflow: hidden;
		border-radius: 8px;
	}

	.card-image {
		width: 100%;
		height: 100%;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		padding: 1.5rem;
		opacity: 0;
		transition: opacity 0.3s ease;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.card-content {
		transform: translateY(20px);
		transition: transform 0.3s ease;
	}

	.mosaic-card:hover .card-overlay {
		opacity: 1;
	}

	.mosaic-card:hover .card-content {
		transform: translateY(0);
	}

	.mosaic-card:hover .card-image img {
		transform: scale(1.04);
	}

	.card-title {
			font-size: 1.2rem;
			font-weight: 600;
			line-height: 130%;
			letter-spacing: 1px;
			margin-bottom: 1rem;
			color: white;
	}

	.card-description {
			font-size: 1rem;
			margin-bottom: 1.5rem;
			line-height: 1.5;
			max-height: 200px;
			overflow-y: auto;
	}

	.tags-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.tag {
		font-size: 0.7rem;
		letter-spacing: 1px;
		padding: 0rem 0.8rem;
		border-radius: 99px;
		background: rgba(255, 255, 255, 0.1);
	}

	.explore-btn {
		display: inline-flex;
		align-items: center;
		margin: 0 auto;
		width: 100%;
		gap: 0.5rem;
		padding: 0.1rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		transition: all 0.3s ease;
	}

	.explore-btn:hover {
		background: white;
		color: black;
	}
	</style>
