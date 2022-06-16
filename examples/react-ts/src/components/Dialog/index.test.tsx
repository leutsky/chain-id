import React from 'react';
import {createTestId, render, getElementByTestId} from 'lib/testing';
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
  test('onClose', async () => {
    const onClose = jest.fn();
    render(renderDialog({onClose}));

    await userEvent.click(getElementByTestId(testId.scrim));

    expect(onClose).toBeCalledTimes(1);
  });

  describe('content without wrap', () => {
    test('is text', () => {
      const content = 'Content';
      render(renderDialog({children: content}));

      expect(getElementByTestId(testId)).toHaveTextContent(content);
    });

    test('is html', () => {
      const content = <span>Content</span>;
      render(renderDialog({children: content}));

      expect(getElementByTestId(testId)).toContainHTML('<span>Content</span>');
    });
  });

  test('testId availability', () => {
    render(
      <Dialog testId={testId}>
        <DialogTitle>Title</DialogTitle>
        <DialogContent>Content</DialogContent>
        <DialogActions>Actions</DialogActions>
      </Dialog>,
    );

    expect(getElementByTestId(testId.title)).toBeInTheDocument();
    expect(getElementByTestId(testId.content)).toBeInTheDocument();
    expect(getElementByTestId(testId.actions)).toBeInTheDocument();
  });
});
