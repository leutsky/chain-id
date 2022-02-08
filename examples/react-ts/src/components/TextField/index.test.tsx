import {createId} from 'chain-id';
import React from 'react';
import {render, configure} from '@testing-library/react';

import {TextField, TextFieldTestId} from './index';

configure({testIdAttribute: 'data-test-id'});
const testId = createId<TextFieldTestId>();

describe('TextField', () => {
  test('check label', () => {
    const labelText = 'Label text';
    const {getByTestId} = render(<TextField label={labelText} testId={testId} />);

    const label = getByTestId(String(testId.label));

    expect(label).toHaveTextContent(labelText);
  });
});
