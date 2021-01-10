import './styles/styles.scss';

const handleHeroScroll = () => {
	const hero = document.getElementById('particles-js');
	window.scrollTo({
		top: hero?.getBoundingClientRect().height,
		left: 0,
		behavior: 'smooth',
	});
};
window.addEventListener('load', () => {
	const i = document.getElementById('hero-continue-icon');
	if (!i) return;
	i.addEventListener('click', () => handleHeroScroll());
	i.addEventListener('keydown', (evt: KeyboardEvent) => {
		if (evt.code === 'Enter' || evt.code === 'Space') {
			evt.preventDefault();
			evt.stopPropagation();
			handleHeroScroll();
		}
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
const sections = [
	'mission',
	'program',
	'conferences',
	'attendees',
	'team',
	'contact',
];
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

const handleNavigationAction = (a: HTMLElement) => {
	navigationScrolling = true;
	const l = a.getAttribute('data-section');
	if (!l) return;
	const el = document.getElementById(l);
	if (!el) return;

	// Close the overlay if necessary
	const n = document.getElementById('navigation-container');
	if (n) {
		n.classList.remove('navigation-container-open');
	}
	const t = document.getElementById('navigation-toggle');
	if (t) {
		t.classList.remove('navigation-toggle-open');
	}
	if (n || t) {
		navigationOpen = false;
	}
	if (window.innerWidth < 768) {
		const lnks = Array.from(
			document.getElementsByClassName('navigation-link'),
		) as HTMLElement[];
		for (let l of lnks) {
			l.setAttribute('tabindex', '-1');
		}
	}

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
			document.body.scrollHeight - window.innerHeight === window.scrollY
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
};
window.addEventListener('load', () => {
	const lnks = Array.from(
		document.getElementsByClassName('navigation-link'),
	) as HTMLElement[];
	for (let a of lnks) {
		a.addEventListener('click', () => handleNavigationAction(a));
		a.addEventListener('keydown', (evt: KeyboardEvent) => {
			if (evt.code === 'Enter' || evt.code === 'Space') {
				evt.preventDefault();
				evt.stopPropagation();
				handleNavigationAction(a);
			}
		});
	}
});

/**
 * Handle taking menu items out of the tab flow on load
 */
window.addEventListener('load', () => {
	if (window.innerWidth < 768) {
		const lnks = Array.from(
			document.getElementsByClassName('navigation-link'),
		) as HTMLElement[];
		for (let l of lnks) {
			l.setAttribute('tabindex', '-1');
		}
	}
});

/**
 * Navigation on smaller devices
 */
let navigationOpen = false;
const navigationToggle = () => {
	const n = document.getElementById('navigation-container');
	const t = document.getElementById('navigation-toggle');
	if (!n || !t) return;
	if (!navigationOpen) {
		n.classList.add('navigation-container-open');
		t.classList.add('navigation-toggle-open');
	} else {
		n.classList.remove('navigation-container-open');
		t.classList.remove('navigation-toggle-open');
	}
	if (window.innerWidth <= 768) {
		const lnks = Array.from(
			document.getElementsByClassName('navigation-link'),
		) as HTMLElement[];
		for (let l of lnks) {
			l.setAttribute('tabindex', navigationOpen ? '-1' : '0');
		}
	}
	navigationOpen = !navigationOpen;
};
window.addEventListener('load', () => {
	const el = document.getElementById('navigation-toggle');
	if (!el) return;
	el.addEventListener('click', navigationToggle);
	el.addEventListener('keydown', (evt: KeyboardEvent) => {
		if (evt.code === 'Enter' || evt.code === 'Space') {
			evt.preventDefault();
			evt.stopPropagation();
			navigationToggle();
		}
	});
});

/**
 * Add tab click behavior
 */
const tabs = ['technology', 'business', 'entrepreneurship'];
const updateTab = (t: HTMLElement) => {
	for (let t1 of tabs) {
		document.getElementById(t1)?.setAttribute('data-selected', 'false');
		document
			.getElementById(`${t1}-tab`)
			?.setAttribute('data-selected', 'false');
	}
	t.setAttribute('data-selected', 'true');
	const id = t.getAttribute('id');
	document.getElementById(`${id}-tab`)?.setAttribute('data-selected', 'true');
};
window.addEventListener('load', () => {
	const tabArray = Array.from(
		document.getElementsByClassName('tabs-tab'),
	) as HTMLElement[];
	for (let t of tabArray) {
		t.addEventListener('click', () => updateTab(t));
		t.addEventListener('keydown', (evt: KeyboardEvent) => {
			if (evt.code === 'Enter' || evt.code === 'Space') {
				evt.preventDefault();
				evt.stopPropagation();
				updateTab(t);
			}
		});
	}
});
