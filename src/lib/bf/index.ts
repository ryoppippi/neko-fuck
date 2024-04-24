import * as u from '@core/unknownutil';

export const bfChars = ['>', '<', '+', '-', '.', ',', '[', ']'] as const satisfies readonly string[];
export const isBfChar = u.isLiteralOneOf(bfChars);
export type BfChar = u.PredicateType<typeof isBfChar>;

function generateJumpMap(code: string[]) {
	const jumpStack: number[] = [];
	const jumpMap = new Map<number, number>();

	/** Generate jumpMap */
	code.forEach((c, index) => {
		if (c === '[') {
			jumpStack.push(index);
		}
		if (c === ']') {
			let start = jumpStack.pop();
			if (start == null) {
				throw new Error('Syntax Error: `]` with no matching `[');
			}
			jumpMap.set(start, index);
			jumpMap.set(index, start);
		}
	});

	if (jumpStack.length > 0) {
		throw new Error('Syntax Error: `[` with no matching `]');
	}

	return jumpMap;
}

export function executeBrainfuck(code: string, input: () => number | null = () => null) {
	const trimedCode = code.trim();
	const codeArray = Array.from(trimedCode);

	const memory: number[] = [];
	let pointer: number = 0;
	let output: string = '';

	const jumpMap = generateJumpMap(codeArray);

	let i = 0;
	while (i < codeArray.length) {
		const command = codeArray.at(i);
		if (command == null) {
			break;
		}

		switch (command) {
			case '>':
				pointer += 1;
				memory[pointer] = memory.at(pointer) ?? 0;
				break;
			case '<':
				pointer -= 1;
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
				const nextInput = input();
				memory[pointer] = nextInput ?? memory.at(pointer) ?? 0;
				break;
			case '[':
				if ((memory.at(pointer) ?? 0) === 0) {
					i = u.ensure(jumpMap.get(i), u.isNumber);
				}
				break;
			case ']':
				if ((memory.at(pointer) ?? 0) !== 0) {
					i = u.ensure(jumpMap.get(i), u.isNumber);
				}
				break;
			default:
				break;
		}
		i += 1;
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

		it('0123456789', () => {
			const code = '++++++[>++++++++<-]++++++++++[>.+<-]' as const;
			expect(executeBrainfuck(code), '0123456789');
		});
	});
}
