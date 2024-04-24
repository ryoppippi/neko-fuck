export const hoge = `++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++++++ ++++++++. +++++++. --------. --.`;
export const helloWorld = `++++++++++
[
    >+++++++
    >++++++++++
    >+++++++++++
    >+++
    >+++++++++
    >+
    <<<<<<-
]
>++.
>+.
>--..
+++.
>++.
>---.
<<.
+++.
------.
<-.
>>+.
>>.`;

export const zero_z_zero_a = `++++++++++.`;

if (import.meta.vitest) {
	const { describe, it, expect } = import.meta.vitest;
	const { executeBrainfuck } = await import('./index');
	describe('bf examples test', () => {
		it('hobe', () => {
			expect(executeBrainfuck(hoge)).toBe('hoge');
		});

		it('Hello World', () => {
			expect(executeBrainfuck(helloWorld)).toBe('Hello World!\n');
		});

		it('0x0a', () => {
			expect(executeBrainfuck(zero_z_zero_a)).toBe('\n');
		});
	});
}
