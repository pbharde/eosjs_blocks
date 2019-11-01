import React from 'react';
import './App.css';
import BlockList from './components/blockList';
import LoadButton from './components/loadButton';
import {JsonRpc } from 'eosjs';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
`;


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      blocks:[],
      load:false,
      loading:true
    }
  }


  componentDidMount(){


    let url = 'https://api.eosnewyork.io';
    let options = {
                      "mode": "cors",
                      "headers": {
                      "Content-type": "application/json"
                    }
                };
    this.rpc = new JsonRpc(url, { fetch:this.fetchApi });

    function fetchApi(url,options){
        return fetch(url,options)
      }
      this.getBlocks();
  }


  reloadBlocks = (e) => {
    e.preventDefault();

    this.getBlocks();
    this.setState({
      blocks:[]
    })
  }


  async getBlocks() {
      let blockchainInfo;
      let currentBlock;
      let blocks = [];
      if(this.state.blocks.length < 1){
        this.setState({
          load:true
        })
      }
      try {
        blockchainInfo = await this.rpc.get_info();
        currentBlock = await this.rpc.get_block(blockchainInfo.last_irreversible_block_num);
        blocks.push(this.getBlockDetails(currentBlock));
      }
      catch (e) {
      }

      let i=0;
      while(i<9){
        try {
          currentBlock = await this.rpc.get_block(currentBlock.previous)
          blocks.push(this.getBlockDetails(currentBlock));
          i++;
          if(!currentBlock){
            break;
            }
        }
        catch (e) {}
      }

      this.setState({blocks});
}

    getBlockDetails(block){
      let blockDetails = {
        id:block.id,
        timestamp:block.timestamp,
        actionCount:block.transactions.length,
        details:JSON.stringify(block)
      }
      return blockDetails;
  }


  render(){
    if(this.state.blocks.length < 1){
          return(
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={'#123abc'}
              loading={this.state.loading}
            />
          )
  }else {
    return (
      <div>
        <LoadButton reloadBlocks={this.reloadBlocks}/>
        <BlockList getBlocks={this.getBlocks} blocks={this.state.blocks}/>
      </div>
    );
  }
  }
}

export default App;
