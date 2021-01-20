export const checkIfInView = (el: HTMLElement, offset?: number) => {
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
