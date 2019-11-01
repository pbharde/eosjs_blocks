import React from 'react';
import {JsonRpc } from 'eosjs';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import './style.css'


const container= css`
     align-items:center
  `;


class BlockList extends React.Component {


    render(){
      return(
        <div>

        <Accordion defaultActiveKey="0">
        {
          this.props.blocks.map(((element, index)=>{
              return(
                <Card css={container} key={element.id}>
                  <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey={element.id}>
                           <Card.Text><span style={{float:'left'}}>Id:</span> {element.id}</Card.Text>
                           <Card.Text><span style={{float:'left'}}>Timestamp: </span> {element.timestamp}</Card.Text>
                           <Card.Text><span style={{float:'left'}}>Action Count: </span> {element.actionCount}</Card.Text>
                      </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={element.id}>
                      <Card.Body>{element.details}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            }))
          }
        </Accordion>
        </div>
      )
}
}
export default BlockList;
