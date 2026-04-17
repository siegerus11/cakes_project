function createInitial<T, K>(
	array: T[],
	additional: K,
	newProp?: string
): ({ [key: string]: T } & K)[] | K[] {
	return array.map((item: T) => {
		return newProp
			? {
					[newProp]: item,
					...additional
			  }
			: { ...additional };
	});
}

// function createInitialObject<T, K extends keyof T, V>(
// 	source: T,
// 	keysToCopy: K[],
// 	newPropertyName: string,
// 	newValue: V
// ): Omit<T, K> & Record<string, V> {
// 	const result = {} as Partial<T>;

// 	for (const key of keysToCopy) {
// 		result[key] = source[key];
// 	}

// 	result[newPropertyName] = newValue;

// 	return result as unknown as Omit<T, K> & Record<string, V>;
// }

export { createInitial };
