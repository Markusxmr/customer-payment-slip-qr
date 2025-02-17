export function arraysEqual<T>(a: T[] | undefined, b: T[] | undefined): boolean {
	if (!a && !b) return true; // both are undefined/null
	if (!a || !b) return false; // one is undefined/null, the other is not
	if (a.length !== b.length) return false;
	return a.every((val, index) => val === b[index]);
}
