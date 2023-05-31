import React, { useState, useEffect } from 'react';
import { fetchAPI } from './tools/api';
import './App.css';

const getDataApi = async () => {
  let data = 'nao definido';
  data = await fetchAPI();
  console.log(data);
};

function App() {
  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <span>Hello, App!</span>
  );
}

export default App;
