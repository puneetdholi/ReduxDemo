import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from '../src/screens/SignIn';
import {TextInput} from 'react-native';
import {render, fireEvent, act} from '@testing-library/react-native';

test('test renders correctly', () => {
  const tree = renderer.create(<SignIn />).toJSON;
  expect(tree).toMatchSnapshot();
});

it('renders default elements', () => {
  const {getAllByText, getByPlaceholderText} = render(<SignIn />);

  expect(getAllByText('Login').length).toBe(2);
  getByPlaceholderText('example');
  getByPlaceholderText('***');
});

it('shows invalid text input messages', () => {
  const {getByTestId, getByText} = render(<SignIn />);

  fireEvent.press(getByTestId('SignIn.Button'));

  getByText('Invalid username.');
  getByText('Invalid password.');
});
