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

/**
 * Check if the navigation bar needs to change styling
 */
let navigationScrolling = false;
const sections = ['mission', 'program', 'attendees', 'team', 'contact'];
const handleNavigationUpdates = () => {
	const navigation = document.getElementById('navigation');
	const hero = document.getElementById('particles-js');
	if (!navigation || !hero) return;

	// Check inversion
	if (
		window.scrollY + navigation?.getBoundingClientRect().height >=
		hero?.getBoundingClientRect().height
	) {
		navigation.classList.add('navigation-inverted');
	} else {
		navigation.classList.remove('navigation-inverted');
	}

	if (navigationScrolling) return;

	// Check location
	let foundElement = false;
	for (let l of sections) {
		const el = document.getElementById(l);
		if (!el) continue;
		const lnk = document.getElementById(`${l}-link`);
		if (!lnk) continue;
		if (checkIfInView(el, 250) && !foundElement) {
			lnk.classList.add('navigation-link-active');
			foundElement = true;
		} else {
			lnk.classList.remove('navigation-link-active');
		}
	}
};
window.addEventListener('scroll', handleNavigationUpdates);
window.addEventListener('load', handleNavigationUpdates);
window.addEventListener('load', () => {
	const lnks = Array.from(
		document.getElementsByClassName('navigation-link'),
	) as HTMLElement[];
	for (let a of lnks) {
		a.addEventListener('click', () => {
			navigationScrolling = true;
			const l = a.getAttribute('data-section');
			if (!l) return;
			const el = document.getElementById(l);
			if (!el) return;

			// Start scroll
			window.scrollTo({
				top: window.scrollY + el?.getBoundingClientRect().y,
				left: 0,
				behavior: 'smooth',
			});

			// Reset scrolling
			const interval = setInterval(() => {
				if (
					el?.getBoundingClientRect().y === 0 ||
					document.body.scrollHeight - window.innerHeight ===
						window.scrollY
				) {
					navigationScrolling = false;
					clearInterval(interval);
				}
			}, 100);

			// Update the active link
			for (let s of sections) {
				const lnk = document.getElementById(`${s}-link`);
				if (!lnk) continue;
				if (s === l) {
					lnk.classList.add('navigation-link-active');
				} else {
					lnk.classList.remove('navigation-link-active');
				}
			}
		});
	}
});
