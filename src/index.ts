import './styles/styles.scss';

type Tab = 'tab-1' | 'tab-2' | 'tab-3';
const tabs: Tab[] = ['tab-1', 'tab-2', 'tab-3'];
const updateTabs = (selectedTab: Tab) => {
	for (let t of tabs) {
		if (selectedTab === t) {
			document.getElementById(t)?.setAttribute('aria-selected', 'true');
			document.getElementById(t)?.setAttribute('aria-expanded', 'true');
			document
				.getElementById(`${t}-content`)
				?.setAttribute('aria-hidden', 'false');
		} else {
			document.getElementById(t)?.setAttribute('aria-selected', 'false');
			document.getElementById(t)?.setAttribute('aria-expanded', 'false');
			document
				.getElementById(`${t}-content`)
				?.setAttribute('aria-hidden', 'true');
		}
	}
};

window.addEventListener('load', () => {
	for (let t of tabs) {
		const tab = document.getElementById(t);
		if (!tab) continue;
		tab.addEventListener('click', () => updateTabs(t));
		tab.addEventListener('keypress', (evt) => {
			if (evt.code === 'Space' || evt.code === 'Enter') {
				updateTabs(t);
				evt.stopPropagation();
			}
		});
	}

	const hero = document.getElementById('particles-js');
	document
		.getElementById('hero-continue-icon')
		?.addEventListener('click', () => {
			window.scrollTo({
				top: hero?.getBoundingClientRect().height,
				left: 0,
				behavior: 'smooth',
			});
		});
});

particlesJS.load('particles-js', './assets/particlesjs-config.json', () => {});

const checkIfInView = (el: HTMLElement, offset?: number) => {
	const elParams = el.getBoundingClientRect();
	const scrollPos = window.scrollY;
	const screenHeight = window.innerHeight;
	const overrideOffset = offset ?? 200;
	// Scrolled into view && not above the current screen position
	const inView =
		scrollPos + screenHeight - overrideOffset > el.offsetTop &&
		elParams.top > 0;

	return inView;
};

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
