import React from 'react';
import {createTestId, dummyFn, render} from 'lib/testing';
import userEvent from '@testing-library/user-event';

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
      const {getByTestId} = render(renderTextField({label: labelText}));

      expect(getByTestId(testId.label)).toHaveTextContent(labelText);
    });

    test('is html', () => {
      const {getByTestId} = render(
        renderTextField({label: <span className="class">Label</span>}),
      );

      expect(getByTestId(testId.label)).toContainHTML(
        '<span class="class">Label</span>',
      );
    });
  });

  describe('state', () => {
    test('filled', () => {
      const {getByTestId, rerender} = render(renderTextField({value: 'value'}));

      expect(getByTestId(testId.input)).not.toHaveFocus();
      expect(getByTestId(testId.input)).toHaveValue();
      expect(getByTestId(testId.label)).toHaveClass(
        'mdc-floating-label--float-above',
      );

      rerender(renderTextField({value: ''}));

      expect(getByTestId(testId.input)).not.toHaveFocus();
      expect(getByTestId(testId.input)).not.toHaveValue();
      expect(getByTestId(testId.label)).not.toHaveClass(
        'mdc-floating-label--float-above',
      );
    });

    test('disabled', () => {
      const {getByTestId, rerender} = render(renderTextField({disabled: true}));

      expect(getByTestId(testId)).toHaveClass('mdc-text-field--disabled');
      expect(getByTestId(testId.input)).toBeDisabled();

      rerender(renderTextField({disabled: false}));

      expect(getByTestId(testId)).not.toHaveClass('mdc-text-field--disabled');
      expect(getByTestId(testId.input)).not.toBeDisabled();
    });

    test('focus', () => {
      const {getByTestId} = render(renderTextField());
      const fieldElement = getByTestId(testId);

      userEvent.click(fieldElement);

      expect(fieldElement).toHaveClass('mdc-text-field--focused');
      expect(getByTestId(testId.input)).toHaveFocus();
      expect(getByTestId(testId.label)).toHaveClass(
        'mdc-floating-label--float-above',
      );

      userEvent.tab();

      expect(getByTestId(testId)).not.toHaveClass('mdc-text-field--focused');
      expect(getByTestId(testId.input)).not.toHaveFocus();
      expect(getByTestId(testId.label)).not.toHaveClass(
        'mdc-floating-label--float-above',
      );
    });

    test('error', () => {
      const {getByTestId, queryByTestId, rerender} = render(
        renderTextField({error: 'Error'}),
      );

      expect(getByTestId(testId)).toHaveClass('mdc-text-field--invalid');
      expect(getByTestId(testId.error)).toBeInTheDocument();

      rerender(renderTextField({error: undefined}));

      expect(getByTestId(testId)).not.toHaveClass('mdc-text-field--invalid');
      expect(queryByTestId(testId.error)).not.toBeInTheDocument();
    });
  });

  describe('error', () => {
    test('is text', () => {
      const errorText = 'Error text';
      const {getByTestId} = render(renderTextField({error: errorText}));

      expect(getByTestId(testId.error)).toHaveTextContent(errorText);
    });

    test('is html', () => {
      const {getByTestId} = render(
        renderTextField({error: <span className="class">Error</span>}),
      );

      expect(getByTestId(testId.error)).toContainHTML(
        '<span class="class">Error</span>',
      );
    });
  });

  describe('type', () => {
    test('default', () => {
      const {getByTestId} = render(renderTextField());

      expect(getByTestId(testId.input)).toHaveAttribute('type', 'text');
    });

    test.each<TextFieldType[]>([
      ['text', 'text'],
      ['password', 'password'],
    ])('%s', (type, expected) => {
      const {getByTestId} = render(renderTextField({type}));

      expect(getByTestId(testId.input)).toHaveAttribute('type', expected);
    });
  });

  test('name', () => {
    const fieldName = 'fieldName';
    const {getByTestId} = render(renderTextField({name: fieldName}));

    expect(getByTestId(testId.input)).toHaveAttribute('name', fieldName);
  });

  test('value', () => {
    const {getByTestId, rerender} = render(renderTextField({value: ''}));

    expect(getByTestId(testId.input)).toHaveValue('');

    [
      ['value1', 'value1'],
      ['value2', 'value2'],
      ['', ''],
      ['value3', 'value3'],
    ].forEach(([value, expected]) => {
      rerender(renderTextField({value}));

      expect(getByTestId(testId.input)).toHaveValue(expected);
    });
  });

  describe('onChange', () => {
    test('keyboard', () => {
      const name = 'fieldName';
      const value = 'hello';
      const onChange = jest.fn<TextFieldChangeEvent, [TextFieldChangeEvent]>();
      const {getByTestId} = render(renderTextField({name, onChange}));

      userEvent.type(getByTestId(testId.input), value);

      expect(onChange).toBeCalledTimes(value.length);
      for (let i = 0; i < value.length; i++) {
        expect(onChange).nthCalledWith(i + 1, {name, value: value[i]});
      }
    });

    test('clipboard', () => {
      const name = 'fieldName';
      const value = 'clipboard value';
      const handleChange = jest.fn<
        TextFieldChangeEvent,
        [TextFieldChangeEvent]
      >();
      const {getByTestId} = render(
        renderTextField({name, onChange: handleChange}),
      );

      userEvent.paste(getByTestId(testId.input), value);

      expect(handleChange).lastCalledWith({name, value});
    });
  });
});
