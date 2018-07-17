import React from 'react';
import Link from 'gatsby-link';
import axios from 'axios';

import servers from '../data/servers.json';
import './index.css';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: []
    };
  }

  async componentDidMount() {
    let serverInfos = [];
    for (let server of servers) {
      let res = await axios.get(`https://cod4mw-serverinfo-api.glitch.me/${server.address}`)
      serverInfos.push(res.data);
      this.setState({
        servers: serverInfos
      });
    }
  }

  render() {
    return (
      <div className='IndexPage'>
        <h2>Servers</h2>
        <div id='servers'>
          {
            this.state.servers.map((server, i) => {
              let address = `${server.host}:${server.port}`;

              return(
                <a href={ `cod4://${address}` } className='server' key={ i }>
                  <div className='name'>
                    { server.data.name }
                  </div>
                  <div className='ip'>
                    { address }
                  </div>
                  <div className='map'>
                    <div className='label'>Map</div>
                    <div className='content'>
                      { server.data.map }
                    </div>
                  </div>
                  <div className='gametype'>
                    <div className='label'>Gametype</div>
                    <div className='content'>
                      { server.data.gametype }
                    </div>
                  </div>
                  <div className='footer'>
                    <div className='players'>
                      { server.data.currentPlayers + '/' + server.data.maxPlayers + ' Players' }
                    </div>
                    <div className='additionals'>
                      {
                        server.data.voice
                        ? <span title='Voice Enabled'>🔉</span>
                        : <span title='Voice Disabled'>🔇</span>
                      }
                      {
                        server.data.protected
                        ? <span title='Private Server'>🔒</span>
                        : <span title='Public Server'>🔓</span>
                      }
                    </div>
                  </div>
                </a>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default IndexPage;
