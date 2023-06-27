import React, { Component } from 'react';
import Covers from '../data.json';
import IndexButton from './IndexButton';
// import vitePluginRequire from "vite-plugin-require";
import objectFromJSON from '../app-Bookmarks.json';

export default class Books extends Component {
  state = {
    entries: [],
    entriesFilter: [],
    bookTitles: [],
    clicked: '',
    search: '',
    entriesSearch:[],
    entriesSearchBooks:[],
  }

  arrayOfEntries = Object.entries(objectFromJSON);
  
  componentDidMount() {
    const allEntries = [];
    const bookNames = [];
    
    this.arrayOfEntries.forEach((element) => {
      const path = element[1].path
      .replace('.pdf.pdf','')
      .replace('.pdf','')
      .replace('.epub','')
      .replace(`internal-storage:/Livros/`,'');
      
      allEntries.push({book: path,
        text: element[1].text, key: element[1].t, image: `./covers/${path}.jpg`});
      
      if(!bookNames.includes(path) || bookNames === undefined) {
        bookNames.push(path);
      }
      bookNames.sort();
      });

      this.setState({
        entries: allEntries,
        bookTitles: bookNames,
      })
      this.scrollFunction();
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

  //usar essa função abaixo para filtrar as quotes do botão que clicarmos com base em seu nome e passar pro componente da frente como props 
  filterQuotes = (nameOfTheBook) => {
    const { entries } = this.state;
    const { history } = this.props;
    
    const filteredEntries = entries.filter((stateEntries) => stateEntries.book === nameOfTheBook);
    this.setState({
      entriesFilter: filteredEntries,
      clicked: nameOfTheBook,
    })

    history.push(`${nameOfTheBook}`);

  }

  topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  scrollFunction = () =>  {
    let mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  searchQuote = () => {
    const { entries, search } = this.state;
    const searchedTermBookContainer = entries.filter((element) => element.text.toLowerCase().includes(search.toLowerCase()));
      const searchedBooks = [];
      searchedTermBookContainer.forEach((element) => {

        if(!searchedBooks.includes(element.book) || searchedBooks === undefined) {
          searchedBooks.push(element.book);
        }
        });
      this.setState({
        entriesSearch: searchedTermBookContainer,
        entriesSearchBooks: searchedBooks,
      });
  }

  handleChange = ({ target }) => {
    this.setState({
      search: target.value,
    }, () => this.searchQuote());
  }
  
  render() {
    const { 
      bookTitles,
      search,
      entriesSearchBooks,
    } = this.state;
    document.title = 'Bookmarks';

    return (
      <div>
        <div className='menu'>
          <IndexButton />
          <textarea id='search'  onChange={this.handleChange}></textarea>
        </div>
      <div id='books'>
        {
          search ? entriesSearchBooks
          .sort()
          .map((elementMap) => {
            return(
              <h3 className='book' key={elementMap} id={elementMap.replace(/ /g,'_').replace(/'/g,'')}>
                <div className='container'>
                <img src={ this.findImage(elementMap) } className='image' alt={ elementMap } onClick={ () => this.filterQuotes(elementMap)}/>
                
                </div>
              </h3>
            )
          })
          : 
          bookTitles.map((element) => {
            return(
              <h3 className='book' key={element} id={element.replace(/ /g,'_').replace(/'/g,'')}>
                <div className='container'>
                <img src={ this.findImage(element) } className='image' alt={ element } onClick={ () => this.filterQuotes(element)}/>
                
                </div>
              </h3>
            )
          })
        }
      <button type='button' id='myBtn' onClick={this.topFunction}>Topo</button>
      </div>
      </div>
    )
  }
}
