export type DocumentKeydownEvtType = {
	removeEventListener(
		type: 'keyup' | 'keydown',
		listener: (event: KeyboardEvent) => any,
		options?: boolean | EventListenerOptions
	): void;
	addEventListener(
		type: 'keyup' | 'keydown',
		listener: (event: KeyboardEvent) => any,
		options?: boolean | EventListenerOptions
	): void;
};
