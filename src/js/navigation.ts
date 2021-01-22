import { checkIfInView } from './utils';

/**
 * Check if the navigation bar needs to change styling
 */
let navigationScrolling = false;
const sections = [
	'mission',
	// 'program',
	'conferences',
	'attendees',
	'team',
	'contact',
];
const handleNavigationUpdates = () => {
	const navigation = document.getElementById('navigation');
	const hero = document.getElementById('hero');
	if (!navigation || !hero) return;

	// Check inversion
	if (window.scrollY >= hero?.getBoundingClientRect().height) {
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
	if (window.location.pathname !== '/') {
		let lnk = a.getAttribute('id')?.split('-')[0];
		if (!lnk) lnk = '/';
		window.location.href = `/#${lnk}`;
	}

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
	let iterations = 0;
	const interval = setInterval(() => {
		if (
			el?.getBoundingClientRect().y === 0 ||
			document.body.scrollHeight - window.innerHeight ===
				window.scrollY ||
			iterations > 10
		) {
			navigationScrolling = false;
			clearInterval(interval);
		}
		iterations++;
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
