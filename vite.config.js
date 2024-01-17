// vite.config.js
import React from 'react';
import { resolve } from 'path';

export default {
  alias: {
    'react': resolve(__dirname, 'node_modules/react'),
    'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    'react-router-dom': resolve(__dirname, 'node_modules/react-router-dom'),
  },
};
