/**
 * Add tab click behavior
 */
const tabs = ['technology', 'entrepreneurship' /*'business'*/];
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
