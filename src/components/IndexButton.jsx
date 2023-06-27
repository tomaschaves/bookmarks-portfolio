import React, { Component } from 'react'
import objectFromJSON from '../app-Bookmarks.json';

export default class IndexButton extends Component {
  state = {
    clicked: false,
    names: [],
  }

  arrayOfEntries = Object.entries(objectFromJSON);
  
  componentDidMount() {
    const bookNames = [];
    
    this.arrayOfEntries.forEach((element) => {
      const path = element[1].path
      .replace('.epub', '')
      .replace('.pdf','')
      .replace(`internal-storage:/Livros/`,'');
      
      if(!bookNames.includes(path) || bookNames === undefined) {
        bookNames.push(path);
      }
      bookNames.sort();
      });

      this.setState({
        names: bookNames,
      })
  }

  clickMenu = () => {
    const { clicked } = this.state;
      this.setState({
        ...this.state,
        clicked: !clicked,
      })
  }

  clickItem = () => {
    const { clicked } = this.state;
    this.setState({
      ...this.state,
      clicked: false,
    })
  }

  render() {
    const { clicked, names } = this.state;
    return (
      <div>
        
          {
            names && (
              
              <button type='button' className='indexButton' onClick={this.clickMenu}>Índice</button>
              )
            }
      <div id='summary'>
      {
        clicked && names.map((element) => (
          <h3 className='indexTitle' key={ element }>
            <a href={`#${element.replace(/ /g,'_').replace(/'/g,'')}`} onClick={ this.clickItem }>{element}</a>
          </h3>
        ))
      }
      </div>
      </div>
    )
  }
}
