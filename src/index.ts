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
});
