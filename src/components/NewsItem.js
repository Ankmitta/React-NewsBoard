import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;


    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: 1 }}>
            {source}

          </span>
          <img src={imgUrl ? imgUrl : "https://images.hindustantimes.com/tech/img/2022/01/24/1600x900/dgyhkjl_1642996858675_1642996886478.JPG"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author.slice(0, 15) : "unknown"} on {new Date(date).toLocaleString("in") + " IST"} source={source}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-secondary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
