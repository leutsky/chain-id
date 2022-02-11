import {
  render as originalRender,
  queries as originalQueries,
  RenderOptions,
  MatcherFunction,
  MatcherOptions,
} from '@testing-library/react';
import {createId, REACT_IGNORED_KEYS} from 'chain-id';
import {ReactElement} from 'react';

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

function getByTestId(
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions,
): ReturnType<typeof originalQueries.getByTestId> {
  const normalizedId =
    isMatcherFunction(id) || id instanceof RegExp ? id : String(id);
  return originalQueries.getByTestId(container, normalizedId, options);
}

function queryByTestId(
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions,
): ReturnType<typeof originalQueries.queryByTestId> {
  const normalizedId =
    isMatcherFunction(id) || id instanceof RegExp ? id : String(id);
  return originalQueries.queryByTestId(container, normalizedId, options);
}

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) {
  return originalRender(ui, {
    ...options,
    queries: {
      ...originalQueries,
      getByTestId,
      queryByTestId,
    },
  });
}

export function dummyFn() {
  return;
}
