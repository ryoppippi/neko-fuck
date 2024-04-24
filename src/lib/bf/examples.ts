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
			expect(executeBrainfuck(hoge), 'hoge');
		});

		it('Hello World', () => {
			expect(executeBrainfuck(helloWorld), 'Hello World');
		});

		it('0x0a', () => {
			expect(executeBrainfuck(zero_z_zero_a), '\n');
		});
	});
}
