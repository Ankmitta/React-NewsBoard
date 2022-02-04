import React, { Component } from 'react'
import NewsItem from "./NewsItem.js";
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capital_letter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("this is constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }

    document.title = `${this.capital_letter(this.props.category)}- NewsBoard`;
  }
  async updateNews() {
    this.props.setProgress(10);                   //for top-bar
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);                   //for top-bar
    let parsedData = await data.json()
    this.props.setProgress(50);                             //for top-bar
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();

  }

  // handlePrevClick = async () => {

  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews();
  // }

  // handleNextClick = async () => {

  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }
   fetchMoreData=async ()=>{
    this.setState({page:this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  }


  render() {
    return (
     <>
        <h2 className="text-center my-4"><b>NewsBoard - Top {this.capital_letter(this.props.category)} Headlines</b></h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          <div className='row' >
            {this.state.articles.map((element) => {
              return <div className='col md-4' key={element.url}>
                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}

          </div>
          </div>
        </InfiniteScroll>

        {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </>
    )
  }
}

export default News;


// News API: 3280dcf1442b4962920fee9dd9c6ef9f