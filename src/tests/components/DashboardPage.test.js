import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/Layout';

test('should render Layout correctly', () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
