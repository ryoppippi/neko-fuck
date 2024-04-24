import * as u from '@core/unknownutil';
import { isBfChar } from './bf/index.js';

export const isCatsBfMapKey = u.isUnionOf([isBfChar, u.isLiteralOf('👻')]);
export type CatsBfMapKey = u.PredicateType<typeof isCatsBfMapKey>;
