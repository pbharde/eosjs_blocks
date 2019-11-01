import React from 'react';
import Button from 'react-bootstrap/Button';


class LoadButton extends React.Component {

  render(){
    const { reloadBlocks } = this.props
    return (
        <Button
          variant="primary"
          onClick={reloadBlocks}
          data-testid="loadBtn"
          size="md" block
          style={{width:'20%', margin:'0 auto', marginBottom:'2%', marginTop:'1%'}}
        >
        LOAD
        </Button>
    );
  }
}

export default LoadButton;
