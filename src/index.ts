import './styles/styles.scss';
import './js/navigation';
import './js/tabs';
import './js/animation';

const handleHeroScroll = () => {
	const hero = document.getElementById('hero');
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

particlesJS.load('hero', './assets/particlesjs-config.json', () => {});
