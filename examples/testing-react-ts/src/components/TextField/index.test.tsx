import React from 'react';
import {
  createTestId,
  dummyFn,
  render,
  getElementByTestId,
  queryElementByTestId,
} from 'lib/testing';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';

import {
  TextField,
  TextFieldProps,
  TextFieldTestId,
  TextFieldType,
  TextFieldChangeEvent,
} from './index';

const testId = createTestId<TextFieldTestId>();

type RenderProps = Partial<TextFieldProps>;

function renderTextField({
  label = 'Label',
  name = 'field',
  onChange = dummyFn,
  value = '',
  ...restProps
}: RenderProps = {}) {
  return (
    <TextField
      label={label}
      name={name}
      onChange={onChange}
      testId={testId}
      value={value}
      {...restProps}
    />
  );
}

describe('TextField', () => {
  describe('label', () => {
    test('is text', () => {
      const labelText = 'Label text';
      render(renderTextField({label: labelText}));

      expect(getElementByTestId(testId.label)).toHaveTextContent(labelText);
    });

    test('is html', () => {
      render(renderTextField({label: <span className="class">Label</span>}));

      expect(getElementByTestId(testId.label)).toContainHTML(
        '<span class="class">Label</span>',
      );
    });
  });

  describe('state', () => {
    test('filled', () => {
      const {rerender} = render(renderTextField({value: 'value'}));

      expect(getElementByTestId(testId.input)).not.toHaveFocus();
      expect(getElementByTestId(testId.input)).toHaveValue();
      expect(getElementByTestId(testId.label)).toHaveClass(
        'mdc-floating-label--float-above',
      );

      rerender(renderTextField({value: ''}));

      expect(getElementByTestId(testId.input)).not.toHaveFocus();
      expect(getElementByTestId(testId.input)).not.toHaveValue();
      expect(getElementByTestId(testId.label)).not.toHaveClass(
        'mdc-floating-label--float-above',
      );
    });

    test('disabled', () => {
      const {rerender} = render(renderTextField({disabled: true}));

      expect(getElementByTestId(testId)).toHaveClass(
        'mdc-text-field--disabled',
      );
      expect(getElementByTestId(testId.input)).toBeDisabled();

      rerender(renderTextField({disabled: false}));

      expect(getElementByTestId(testId)).not.toHaveClass(
        'mdc-text-field--disabled',
      );
      expect(getElementByTestId(testId.input)).not.toBeDisabled();
    });

    test('focus', async () => {
      render(renderTextField());
      const fieldElement = getElementByTestId(testId);

      await userEvent.click(fieldElement);

      expect(fieldElement).toHaveClass('mdc-text-field--focused');
      expect(getElementByTestId(testId.input)).toHaveFocus();
      expect(getElementByTestId(testId.label)).toHaveClass(
        'mdc-floating-label--float-above',
      );

      await userEvent.tab();

      expect(getElementByTestId(testId)).not.toHaveClass(
        'mdc-text-field--focused',
      );
      expect(getElementByTestId(testId.input)).not.toHaveFocus();
      expect(getElementByTestId(testId.label)).not.toHaveClass(
        'mdc-floating-label--float-above',
      );
    });

    test('error', () => {
      const {rerender} = render(renderTextField({error: 'Error'}));

      expect(getElementByTestId(testId)).toHaveClass('mdc-text-field--invalid');
      expect(getElementByTestId(testId.error)).toBeInTheDocument();

      rerender(renderTextField({error: undefined}));

      expect(getElementByTestId(testId)).not.toHaveClass(
        'mdc-text-field--invalid',
      );
      expect(queryElementByTestId(testId.error)).not.toBeInTheDocument();
    });
  });

  describe('error', () => {
    test('is text', () => {
      const errorText = 'Error text';
      render(renderTextField({error: errorText}));

      expect(getElementByTestId(testId.error)).toHaveTextContent(errorText);
    });

    test('is html', () => {
      render(renderTextField({error: <span className="class">Error</span>}));

      expect(getElementByTestId(testId.error)).toContainHTML(
        '<span class="class">Error</span>',
      );
    });
  });

  describe('type', () => {
    test('default', () => {
      render(renderTextField());

      expect(getElementByTestId(testId.input)).toHaveAttribute('type', 'text');
    });

    test.each<TextFieldType[]>([
      ['text', 'text'],
      ['password', 'password'],
    ])('%s', (type, expected) => {
      render(renderTextField({type}));

      expect(getElementByTestId(testId.input)).toHaveAttribute(
        'type',
        expected,
      );
    });
  });

  test('name', () => {
    const fieldName = 'fieldName';
    render(renderTextField({name: fieldName}));

    expect(getElementByTestId(testId.input)).toHaveAttribute('name', fieldName);
  });

  test('value', () => {
    const {rerender} = render(renderTextField({value: ''}));

    expect(getElementByTestId(testId.input)).toHaveValue('');

    [
      ['value1', 'value1'],
      ['value2', 'value2'],
      ['', ''],
      ['value3', 'value3'],
    ].forEach(([value, expected]) => {
      rerender(renderTextField({value}));

      expect(getElementByTestId(testId.input)).toHaveValue(expected);
    });
  });

  describe('onChange', () => {
    test('keyboard', async () => {
      const name = 'fieldName';
      const value = 'hello';
      const onChange = jest.fn<TextFieldChangeEvent, [TextFieldChangeEvent]>();
      render(renderTextField({name, onChange}));

      await userEvent.type(getElementByTestId(testId.input), value);

      expect(onChange).toBeCalledTimes(value.length);
      for (let i = 0; i < value.length; i++) {
        expect(onChange).nthCalledWith(i + 1, {name, value: value[i]});
      }
    });

    test('clipboard', async () => {
      const name = 'fieldName';
      const value = 'clipboard value';
      const handleChange = jest.fn<
        TextFieldChangeEvent,
        [TextFieldChangeEvent]
      >();
      render(renderTextField({name, onChange: handleChange}));

      await act(() => getElementByTestId(testId.input).focus());

      await userEvent.paste(value);

      expect(handleChange).lastCalledWith({name, value});
    });
  });
});
