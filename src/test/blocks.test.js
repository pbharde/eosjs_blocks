import React from 'react';
import ReactDOM from 'react-dom';
import BlockList from '../components/blockList';
import LoadButton from '../components/loadButton';

const blocks = [];

it("renders blocks without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<BlockList getBlocks={()=>{}} blocks={blocks}/>,div)
})

it("renders button without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<LoadButton reloadBlocks={()=>{}}/>,div)
})
