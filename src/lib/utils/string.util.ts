export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmptyValue = (value: unknown): boolean =>
	value === null || value === undefined || value === '';
