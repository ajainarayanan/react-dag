import {DAG} from '../dag';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {data} from './data';

ReactDOM.render(
  <DAG data={data}/>,
  document.getElementById('app-dag')
);
