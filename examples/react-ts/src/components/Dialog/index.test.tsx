import React from 'react';
import {createTestId, render} from 'lib/testing';
import userEvent from '@testing-library/user-event';

import {Dialog, DialogTitle, DialogContent, DialogActions} from './index';
import {DialogProps, DialogTestId} from './types';

const testId = createTestId<DialogTestId>();

type RenderProps = Partial<Omit<DialogProps, 'testId'>>;

function renderDialog({children = 'Content', ...restProps}: RenderProps) {
  return (
    <Dialog {...restProps} testId={testId}>
      {children}
    </Dialog>
  );
}

describe('Dialog', () => {
  test('onClose', () => {
    const onClose = jest.fn();
    const {getByTestId} = render(renderDialog({onClose}));

    userEvent.click(getByTestId(testId.scrim));

    expect(onClose).toBeCalledTimes(1);
  });

  describe('content without wrap', () => {
    test('is text', () => {
      const content = 'Content';
      const {getByTestId} = render(renderDialog({children: content}));

      expect(getByTestId(testId)).toHaveTextContent(content);
    });

    test('is html', () => {
      const content = <span>Content</span>;
      const {getByTestId} = render(renderDialog({children: content}));

      expect(getByTestId(testId)).toContainHTML('<span>Content</span>');
    });
  });

  test('testId availability', () => {
    const {getByTestId} = render(
      <Dialog testId={testId}>
        <DialogTitle>Title</DialogTitle>
        <DialogContent>Content</DialogContent>
        <DialogActions>Actions</DialogActions>
      </Dialog>,
    );

    expect(getByTestId(testId.title)).toBeInTheDocument();
    expect(getByTestId(testId.content)).toBeInTheDocument();
    expect(getByTestId(testId.actions)).toBeInTheDocument();
  });
});
