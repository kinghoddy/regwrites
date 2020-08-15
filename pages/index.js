import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link'
import Card from '../components/card';
import firebase from '../firebase';
import dateFormat from '../components/date'
import 'firebase/database';
import Router from 'next/router'

export default class Home extends React.Component {
  state = {
    noBg: true,
    posts: [{ body: '', category: '' }],
    backgrounds: ['/img/banner1.jpg', '/img/banner2.jpg', '/img/banner3.jpg', '/img/banner4.jpg', '/img/banner5.jpg'],
    current: 0,
    submitting: false,
    subscribed: false,
    emailExist: false,
    email: '',
    search: ''
  }
  componentDidMount() {
    const backgrounds = this.state.backgrounds;
    let i = 0;
    setInterval(() => {
      if (i < backgrounds.length - 1) i++
      else i = 0;
      this.setState({ current: i })
    }, 10000);

    this.getPosts()
  }

  getPosts = () => {
    this.setState({ loading: true })
    firebase.database().ref('posts/').on('value', s => {
      let posts = []
      for (let cat in s.val()) {
        for (let keys in s.val()[cat]) {
          posts.push({
            ...s.val()[cat][keys],
            category: cat,
            pid: 'posts/' + cat + '/' + keys,
            key: keys
          })
        }
      }
      posts = posts.sort((a, b) => a.date - b.date)
      this.setState({ posts: posts.reverse(), loading: false })
    })
  }
  subscribe = (e) => {
    e.preventDefault();
    this.setState({ submitting: true, emailExist: false, subscribed: false });
    const ref = firebase.database().ref('subscribers');
    ref.once('value', s => {
      let subscribed = false
      for (let keys in s.val()) {
        if (s.val()[keys] === this.state.email) {
          subscribed = true
        }
      }
      if (!subscribed) {
        ref.push(this.state.email).then(() => {
          this.setState({ subscribed: true, email: '' })
        }).catch(() => {
          this.setState({ submitting: false })
        })
      } else {
        this.setState({ emailExist: true, email: '' })
      }
    })
  }
  emailChanged = (e) => {
    this.setState({ email: e.target.value })
  }
  searchP = (e) => {
    e.preventDefault();
    Router.push('/search?s=' + this.state.search)
  }
  render() {
    const images = <div className="background">
      {this.state.backgrounds.map((cur, index) => <img src={cur} className={index === this.state.current && 'active'} alt="" />)}
      <style jsx>{`
      .background{
      position : absolute;
      left : 0;
      top : 0;
      height : 100%;
      filter : brightness(60%);
      width : 100%;
    }
    .background img {
      height : 100%;
      width : 100%;
      position : absolute;
      top:0;
      left:0;
      transition : 2s;
      object-fit : cover;
      z-index : -1;
      opacity : 0;
    }
    .background img.active{
      opacity : 1
    }
    `} </style>
    </div>
    return <Layout title="RegWrites | Poetry , short stories & more">
      <header className="text-light">
        {images}
        <div className="header text-center">
          <h1 className="text-uppercase my-3 fadeInDown wow " >Reg <span className="bg-warning px-2" > writes </span> </h1>
          <p className="fadeInLeft wow delay-1s">
            Welcome to Reg Writes. The home of poetry, short stories , and other inspiring posts in contemporary style. <br /> <i> With words we create our world </i>
          </p>
          <form className="fadeIn wow delay-2s" onSubmit={this.searchP} >
            <input type="search" required value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} placeholder="Search for a post.." />
            <button >
              <i className="fa fa-search"></i>
            </button>
          </form>
          <Link href="/#about">
            <a className="fadeInUp wow delay-3s btn btn-outline-warning btn-sm rounded-pill px-4" >Let's Go</a>
          </Link>
        </div>
      </header>
      <section id="about" className="bg-light ">
        <div className="container">

          <h1 className=" heading text-center text-lg-left py-3">About Me </h1>
          <p className="">
            Hello, I'm <strong className="text-primary"> Regina B. Sogbuyi. </strong> I write poems, short stories and memoirs. <br /> <br />
                Writing is my way of escape from the busyness of life and way of communicating my God-given message. I'm a Nigerian and die-hard follower of Christ.
            </p>
          <p>
            I also offer proofreading and ghost writing services.
              </p>
          <div className="d-flex buttons" >
            <a className="social " href="https://twitter.com/ReginaBSogbuyi" target="blank">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="social  " href="https://www.instagram.com/bee_tife" target="blank">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <Link href="/#blog">
            <a className="btn btn-outline-warning">
              <i className="fal fa-arrow-down"></i>
            </a>
          </Link>
          <img src="/img/reg.jpeg" className="reg" />
        </div>
      </section>
      <section id="blog" className="poem">
        <h1 className="heading text-light  text-center py-4"> My Blog  </h1>

        <div className="container">
          {this.state.loading ? <div className="spinner-border" ></div> : <div className="row align-items-center justify-content-center">
            <div className="col-md-3">
              <Card src={this.state.posts[0].src} title='' />
            </div>
            <div className="col py-5 py-md-3 pl-md-5">
              <h3>{this.state.posts[0].title}</h3>
              <p className="body" dangerouslySetInnerHTML={{ __html: this.state.posts[0].body.substring(0, 200) + '...' }}></p>

              <h5 className="" style={{ color: '#eee' }}>
                Category : <span className="text-capitalize" >{this.state.posts[0].category.replace('-', ' ')}</span> <br /> Published {dateFormat(this.state.posts[0].date)}
              </h5>
            </div>
          </div>}

        </div>
        <div className="py-4 justify-content-center d-flex">
          <Link href="/blog" >
            <a className="btn btn-primary">View more {'-->'} </a>
          </Link>
        </div>
      </section>

      <section id="newsLetter">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12 mb-5">
              <i className="fal text-primary fa-5x fa-mail-bulk"></i>
            </div>
            <div className="col">
              <h1 className="">subscribe to my blog</h1>
              <p>Get emails of new write-ups, releases and updates </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form onSubmit={this.subscribe}>

                <div className="input position-relative">
                  <i className="fal fa-envelope-open-text text-primary ">
                  </i>
                  <input required type="email" placeholder="Email address" value={this.state.email} onChange={this.emailChanged} />
                </div>
                <button className="btn btn-info">
                  <i className="fal fa-paper-plane mr-3"></i>
                  <span>SUBSCRIBE</span>
                </button>
                {this.state.submitting && <div className="submitting">
                  {this.state.emailExist ? <React.Fragment> <i className="text-danger fa-2x fal fa-exclamation-circle" ></i> <div className="px-2" >  <strong   >Subscriber already exits </strong> <br /> <button className="btn mx-auto btn-primary " onClick={() => this.setState({ submitting: false })} >Retry</button>
                  </div></React.Fragment> : this.state.subscribed ? <React.Fragment>
                    <i className="text-success fal fa-2x fa-check-circle" ></i>
                    <div className="px-2" ><strong >You have successfully subscribed </strong> <br /> <button className="btn mx-auto btn-primary " onClick={() => this.setState({ submitting: false })} >Ok</button>
                    </div>
                  </React.Fragment> : <React.Fragment> <div className="spinner-border text-primary"></div> <span className="pl-2 font-weight-bold" >Subscribing</span>
                      </React.Fragment>}
                </div>}
              </form>
            </div>
          </div>

        </div>
      </section>

      <style jsx global>{`
    header {
      background : #222;
      background-size : cover;
      min-height : 85vh;
      display : flex;
      justify-content : center;
      position : relative;
      align-items : center;
    }
  
    header .header {
      font-weight : 500;
      padding : 0 1rem;
      z-index : 100;
    }
    .header h1 {
      font=size : 2rem;
      font-weight : 500 !important;
    }
    .header h4 {
      font-weight : 500;
      text-transform : uppercase;
    }
    header form {
      width : 90%;
      background : #ffffffaa;
      box-shadow : 0 10px 20px rgba(0,0,0,.3);
      margin : 0 auto 30px auto;
      height : 3rem;
      display : flex;
      border-radius : 30px;
      overflow : hidden;
    }
    header form > * {
      background : none;
      transition : all .3s ;
      align-self : stretch;
      border : 0;
    }
    header form > *:focus {
      outline : 0;
      background : #fff;
    }
    .header form input {
      width : calc(100% - 2.5rem);
      padding : 0 10px 0 20px;
    }
    .header form button {
      width : 2.5rem;
      padding : 0;
      display : flex;
      align-items :center;
      flex-shrink : 0;
      justify-content : center;
    }
    .header form button:hover {
      background : linear-gradient(to right bottom , #229 , #a0a) ;
      color : white;
    }

    section {
      padding : 4rem 0;
    }
    .heading {
      color : #000;
      font-weight : 500;
      text-transform : uppercase;
    }
    .buttons .social {
      color : #aaa;
      display : inline-block;
      margin : 0 20px;
      font-size : 40px;
    }
    .reg {
      height : 25rem ;
      width : 100%;
      object-fit : cover;
    }
    .poem {
      background : linear-gradient(to right bottom , #04ae , #07ae) , url(/img/banner2.jpg) ;
      background-size : cover;
      color : #fff;
    }
    .body {
      
    }
    .body p {
           margin-bottom : 0;
    }


    
    #newsLetter form {
      width : 90%;
      display : flex;
      flex-direction : column;
      position : relative;
      margin : 2rem auto;
    }

    #newsLetter form > *{
      outline : 0;
      height : 3rem;
      margin-bottom : 1rem
    }
        .submitting {
         position : absolute;
         top : 0;
         left : 0;
         background : #ffffffcc;
         z-index : 1000;
         width : 100%;
         height : 100% !important ;
         display : flex;
         align-items : center;
         justify-content : center;
    }
    .input > input{
      border : 1px solid #ddd;
      width : 100%;
      padding-left : 2.5rem;
      padding-right : 1rem;
      height : 100%;
      width : 100%;
    }
    .input input:focus {
      outline : 0;
    }
    .input i{
      position : absolute;
      left : 0;
      top : 0;
      display :flex;
      align-items : center;
      padding: 0 .7rem;
      height : 3rem;
    }
    #newsLetter form > button{
      width : 100%;
    }
    
    @media only screen and (min-width : 760px){
            .bg {
        min-height : 22rem
      }
        .profilePic {
height : 10rem;
    }
    }
    @media only screen and (min-width : 1200px){

      .bg h2 {
      font-size: 2.6rem;

      }
      .header h1 {
        font-size : 4rem;
      }
      .poem {
      background-attachment : fixed;
      }
    }
    `} </style>
    </Layout >
  }
}