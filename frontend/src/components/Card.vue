<template>
	<div :class="`flex ${flexType || '  '} snap justify-between items-center gap-12 flex-wrap py-10 border-x-[0px] border-[rgba(255,_255,_255,_0.15)] px-5 md:max-w-[80%] mx-auto rounded-lg mb-10 md:mb-12 border-b-[1px] md:border-b-0`">

		<!-- images from work cards -->
		<div class='glassyContainer md:p-10 rounded-xl relative md:max-w-[40%] flex justify-center items-center'>
			<div v-if='imageToDisplay' class='glassy'/>
			<img :src='imageToDisplay' :alt="alt"/>
		</div>

		<!-- images from about me section -->
		<div v-if='imageToDisplayAbout' class='md:p-10 relative w-full md:max-w-[40%] flex flex-row justify-center items-center imagedisplay md:gap-12 -mt-20'>
			<div class='glassy'></div>
			<img :src='imageToDisplayAbout[0]' alt='The developer himself, taking a picture at the mirror'
				class='md:!max-w-[230px] max-h-[407px] object-cover rounded-md' />
			<div class='flex-col gap-4 hidden md:flex'>
				<img :src='imageToDisplayAbout[1]' alt='beer on the top of a table, in a beach'
					class='rounded-md' />
				<img :src='imageToDisplayAbout[2]' alt='headphones' class='rounded-md' />
			</div>
		</div>

		<!-- text -->
		<div class='md:max-w-[45%] flex flex-col gap-8 items-center md:items-start'>
			<div class='flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-center md:text-left md:pr-4 max-w-[90%]'>
				<!-- title -->
				<h2 class='uppercase tracking-[.3em] font-semibold'>
					{{ title }}
				</h2>
				<img v-if='avatar' :src='avatar' alt='Repo Owner' height='60' width='60'
					class='rounded-full' />
			</div>

			<!-- body -->
			<p class='tracking-wider pbody font-semibold text-center md:text-left'>
				<span class='fade-text !font-extralight'>
					{{ fadeText }}
				</span>
				{{ body }}
			</p>

			<!-- category, live, href-->
			<div class='flex flex-col md:flex-row justify-start items-center gap-12 md:mt-10'>
				<p class='uppercase tracking-[.2em] text-xs font-light fade-text'>
					{{ category }}
				</p>

				<!-- href -->
				<div v-if='href' class='relative'>
					<a :href='href'
						class='transition-all flex flex-row items-center justify-center gap-4 border-[1px] max-w-max py-3 px-4 text-sm uppercase rounded-2xl hover:border-black hover:bg-white hover:text-black'
						target='_blank'>
						View work
						<svg class="chev" height="15px" width="15px" version="1.1" id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 185.343 185.343" xml:space="preserve" fill="#fff">
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
								stroke-linejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<g>
									<g>
										<path style="fill:#fff;"
											d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z">
										</path>
									</g>
								</g>
							</g>
						</svg>
					</a>
					<!-- live span -->
					<span v-if='live'
						class='text-[var(--bright-pink)] absolute -bottom-[80%] right-[0%] pointer-events-none font-medium z-10 tracking-wide -rotate-6 decoration-wavy underline decoration-[var(--bright-pink)] decoration-3'>
						live!
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue';

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
	});
</script>

<style scoped>
	h2 {
		margin: 0;
		font-size: clamp(1rem, 3vw, 1.6rem);
		transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	p.pbody {
		margin-bottom: 0;
		font-size: clamp(1rem, 2vw, 1.3rem);
		line-height: 170%;
	}
	.link-card:is(:hover, :focus-within) {
		background-position: 0;
		/* background-image: var(--accent-gradient); */
	}
	.link-card:is(:hover, :focus-within) h2 {
		color: rgb(var(--accent-light));
	}
	a:hover svg.chev path {
		fill: black !important;
	}
	.imagedisplay > div > img {
		width: 270px;
		height: 400px;
		object-fit: cover;
	}
	img {
		max-width: 570px;
		margin: 0;
	}
	.glassy {
		position: absolute;
		z-index: -2;
		top: 0;
		left: 0;
		border-radius: 16px;
		width: 100%;
		height: 100%;
		background-color: white;
		opacity: .7;
		backdrop-filter: blur(5px);
	}
</style>
