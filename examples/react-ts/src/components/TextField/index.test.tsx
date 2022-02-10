import React from 'react';
import {createTestId, render} from 'lib/testing';

import {TextField, TextFieldTestId} from './index';

const testId = createTestId<TextFieldTestId>();

describe('TextField', () => {
  test('check label', () => {
    const labelText = 'Label text';
    const {getByTestId} = render(
      <TextField
        label={labelText}
        name="field"
        onChange={() => {}}
        testId={testId}
        value=""
      />,
    );
    const labelElement = getByTestId(testId.label);

    expect(labelElement).toHaveTextContent(labelText);
  });
});
