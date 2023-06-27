import React, { Component } from 'react'
import Covers from '../data.json';
import Quote from './Quote';
import objectFromJSON from '../app-Bookmarks.json';

export default class Quotes extends Component {
  homeComing = () => {
    const { history } = this.props;
    history.push('/');
    this.topFunction();
  }

  state = {
    entries: [],
    entriesFilter: [],
    src: '',
  }

  arrayOfEntries = Object.entries(objectFromJSON);
  
  componentDidMount() {
    const allEntries = [];
    
    this.arrayOfEntries.forEach((element) => {
      const path = element[1].path
      .replace('.pdf.pdf','')
      .replace('.pdf','')
      .replace('.epub','')
      .replace(`internal-storage:/Livros/`,'');
      
      allEntries.push({book: path,
        text: element[1].text, key: element[1].t, image: `./covers/${path}.jpg`});
      this.setState({
        entries: allEntries,
      }, () => this.filterQuotes())
      });
      this.topFunction();
      window.addEventListener('scroll', this.scrollFunction);
    }
    
  findImage = (element) => {
    let path = '';
    Object.values(Covers).forEach((book) => {
      if(element.toLowerCase() === book.name.toLowerCase()) {
        path = book.image;
      }
    })
    return path;
  }

  filterQuotes = () => {
    const { entries } = this.state;
    const { location: { pathname } } = this.props;
    
    const name = pathname.replace('/', '');
    const filteredEntries = entries.filter((stateEntries) => stateEntries.book.toLowerCase() === name.toLowerCase());
      this.setState({
        entriesFilter: filteredEntries,
        src: filteredEntries[0].book,
      })
  }

  topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  // When the user scrolls down 20px from the top of the document, show the button

  scrollFunction = () =>  {
    let mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  render() {
    const { src, entriesFilter } = this.state;
    document.title = src;
    return (
      <div className='book'>
        <div className='book selected'>
          <img src={ this.findImage(src) } alt={ src } onClick={ this.homeComing } />
        </div>
        <h4 className='quoteTitle'>{ src }</h4>
        {
          entriesFilter.map((entrie) => (
            <Quote key={ entrie.text } text={ entrie.text } />
          ))
        }
        <button type='button' id='myBtn' onClick={this.homeComing}>Home</button>
      </div>
    )
  }
}
