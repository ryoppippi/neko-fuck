export function executeBrainfuck(code: string, input: () => number | null = () => null): string {
	let memory: number[] = [];
	let pointer: number = 0;
	let output: string = '';

	let jumpStack: number[] = [];
	let jumpMap: Record<number, number> = {};

	// ジャンプマップの構築
	Array.from(code).forEach((c, index) => {
		if (c === '[') {
			jumpStack.push(index);
		} else if (c === ']') {
			let start = jumpStack.pop();
			if (start == null) {
				throw new Error('Syntax Error: `]` with no matching `[');
			}
			jumpMap[start] = index;
			jumpMap[index] = start;
		}
	});

	if (jumpStack.length > 0) {
		throw new Error('Syntax Error: `[` with no matching `]');
	}

	let i = 0;
	while (i < code.length) {
		let command = code.at(i);
		if (command == null) {
			break;
		}

		switch (command) {
			case '>':
				pointer++;
				memory[pointer] = memory.at(pointer) ?? 0;
				break;
			case '<':
				pointer--;
				if (pointer < 0 || memory.at(pointer) == null) {
					throw new Error('Memory Error: Pointer moved out of valid range.');
				}
				break;
			case '+':
				memory[pointer] = (memory.at(pointer) ?? 0) + 1;
				break;
			case '-':
				memory[pointer] = (memory.at(pointer) ?? 0) - 1;
				break;
			case '.':
				output += String.fromCharCode(memory.at(pointer) ?? 0);
				break;
			case ',':
				let nextInput = input();
				memory[pointer] = nextInput ?? memory.at(pointer) ?? 0;
				break;
			case '[':
				if ((memory.at(pointer) ?? 0) === 0) {
					i = jumpMap[i];
				}
				break;
			case ']':
				if ((memory.at(pointer) ?? 0) !== 0) {
					i = jumpMap[i];
				}
				break;
		}
		i++;
	}

	return output;
}

if (import.meta.vitest) {
	const { describe, it, expect } = import.meta.vitest;
	describe('bf', () => {
		it('abc', () => {
			const code = '++++++++[>++++++++<-]>+.+.+.' as const;
			expect(executeBrainfuck(code), 'abc');
		});

		it('hello world', () => {
			const code =
				'+++++++++[>++++++++<-]>.<+++++++++[>+++<-]>++.+++++++..+++.<+++++++++[>--------<-]>-------.<+++++++++[>++++++<-]>+.<+++++++++[>++<-]>++++++.+++.------.--------.<+++++++++[>-------<-]>----.<+++++++++[>++++++<-]>+++++.<+++++++++[>++<-]>.' as const;
			expect(executeBrainfuck(code), 'hello world');
		});

		it('3', () => {
			const code = '+++++++++[>+++++<-]>++++++.' as const;
			expect(executeBrainfuck(code), '3');
		});

		it('8', () => {
			const code = '+++++++++[>++++++<-]>++.' as const;
			expect(executeBrainfuck(code), '8');
		});
	});
}
