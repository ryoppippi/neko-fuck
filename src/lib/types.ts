import typia from 'typia';
import type { BFChar } from './bf/index.js';

export const ghostChar = `👻`;
export type GhostChar = typeof ghostChar;

export type CatsBfMapKey = BFChar | GhostChar;
export const isCatsBfMapKey = typia.createEquals<CatsBfMapKey>();
