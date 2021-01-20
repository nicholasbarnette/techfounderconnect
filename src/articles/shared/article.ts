import '../../js/navigation';
import './article.scss';

const calculateScrollPosition = (el: HTMLElement) => {
	const body = document.body;
	const html = document.documentElement;
	const pageHeight = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight,
	);
	el.style.width = `${Math.ceil(
		((window.scrollY + window.innerHeight) / pageHeight) * 100,
	)}%`;
};

window.addEventListener('load', () => {
	const i = document.getElementById('article-progress');
	if (!i) return;
	calculateScrollPosition(i);
});
window.addEventListener('scroll', () => {
	const i = document.getElementById('article-progress');
	if (!i) return;
	calculateScrollPosition(i);
});
