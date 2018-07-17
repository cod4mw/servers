import React from 'react';

import './index.css';


class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <root>
        <main>
          { this.props.children() }
        </main>
      </root>
    );
  }
}


export default DefaultLayout;
