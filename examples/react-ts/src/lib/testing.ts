import {
  render,
  MatcherFunction,
  MatcherOptions,
  screen,
} from '@testing-library/react';
import {createId, REACT_IGNORED_KEYS} from 'chain-id';

export {render, screen};

export type TestIdProp<TestId> = {
  testId?: TestId;
};

export function createTestId<T>(prefix: string = 'testId') {
  return createId<T>({ignoreKeys: REACT_IGNORED_KEYS, prefix});
}

type Matcher = MatcherFunction | RegExp | object | string | number;

function isMatcherFunction(fn: unknown): fn is MatcherFunction {
  return typeof fn === 'function';
}

function normalizeId(id: Matcher): MatcherFunction | RegExp | string {
  return isMatcherFunction(id) || id instanceof RegExp ? id : String(id);
}

export function getElementByTestId<T extends HTMLElement = HTMLElement>(
  id: Matcher,
  options?: MatcherOptions,
): ReturnType<typeof screen.getByTestId<T>> {
  return screen.getByTestId(normalizeId(id), options);
}

export function queryElementByTestId<T extends HTMLElement = HTMLElement>(
  id: Matcher,
  options?: MatcherOptions,
): ReturnType<typeof screen.queryByTestId<T>> {
  return screen.queryByTestId(normalizeId(id), options);
}

export function dummyFn() {
  return;
}
