import React, { Component } from 'react';

import SkyLight from 'react-skylight';

import Table from '../elements/table/table';
import axios from 'axios';

class Images extends Component {

  constructor(props) {
    super(props);
    this.state = {
      img: [],
      curentImage: 0,
      already: false,
    };
  }

  componentDidMount() {
      axios.get('https://jsonplaceholder.typicode.com/photos').then((resp) => {
        let img = [];
        for (let i = 0; i < 12; i++) {
          img.push(resp.data[i]);
        }
        this.setState({img});
      });
  }

showPopup(number) {
  this.setState({already: true});
  this.setState({curentImage: number});
  this.refs.simpleDialog.show();
}

  render() {
    let popupStyles = {
      height: '600px',
      marginTop: '-300px'
    }
    let popup = null;
    if (this.state.already) {
      let i = this.state.curentImage;
        popup =
          <div>
            <img src={this.state.img[i]['url']}
              className='image'/>
              <p>{this.state.img[i]['title']}</p>
          </div>
    } else {
      popup = 'none';
    }
    return (
      <div className="g-section">
        <div className='images'>
          {
            this.state.img.map((item, key) => {
              return (
                <div className='images__item' key={key}>
                  <img src={item['thumbnailUrl']}
                    className='image image--small'
                    onClick={() => this.showPopup(key)}/>
                    <p className='images__title'>albom #{item['id']}</p>
                </div>
              )
            })
          }
        </div>
        <SkyLight hideOnOverlayClicked dialogStyles={popupStyles} ref="simpleDialog" title='Title image'>
            {popup}
        </SkyLight>
      </div>
    );
  }

}

export default Images;
