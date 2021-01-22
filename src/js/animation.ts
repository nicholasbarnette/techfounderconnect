import { checkIfInView } from './utils';

/**
 * Check if it is time to animate content
 */
window.addEventListener('scroll', () => {
	const animatedElements = Array.from(
		document.getElementsByClassName('will-animate-rise'),
	) as HTMLElement[];

	for (let el of animatedElements) {
		if (el) {
			const classes = el.getAttribute('class')?.split(' ') ?? [];
			if (classes.includes('animated-rise')) return;
			if (checkIfInView(el)) {
				el.classList.add('animated-rise');
				el.classList.remove('will-animate-rise');
			}
		}
	}
});

window.addEventListener('load', () => {
	const animatedElements = Array.from(
		document.getElementsByClassName('will-animate-rise-onload'),
	);

	for (let el of animatedElements) {
		if (el) {
			const classes = el.getAttribute('class')?.split(' ') ?? [];
			if (classes.includes('animated-rise')) return;
			el.classList.add('animated-rise');
			el.classList.remove('will-animate-rise-onload');
		}
	}
});
