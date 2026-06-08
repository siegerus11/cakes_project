/**
 * Прокручивает страницу к элементу с указанным id (hash).
 * Использует рекурсивные попытки с таймаутом, так как элемент может
 * появиться не сразу после навигации.
 */
const scrollToHash = (hash: string, maxAttempts = 20) => {
	let attempts = 0;

	const tryScroll = () => {
		const element = document.getElementById(hash);

		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		} else if (attempts < maxAttempts) {
			attempts += 1;
			setTimeout(tryScroll, 50);
		}
	};

	tryScroll();
};

export default scrollToHash;
