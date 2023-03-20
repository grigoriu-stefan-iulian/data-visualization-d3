import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Counter />, div);
  ReactDOM.unmountComponentAtNode(div);
});