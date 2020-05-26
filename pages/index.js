
import React from 'react';
import Layout from '../components/layout';
import Card from '../components/card';

export default class Home extends React.Component {
  state = {
    noBg: true,
    backgrounds: ['/img/banner1.jpg', '/img/banner2.jpg', '/img/banner3.jpg'],
    current: 0
  }
  componentDidMount() {
    const backgrounds = this.state.backgrounds;
    let i = 0;
    setInterval(() => {
      if (i < backgrounds.length - 1) i++
      else i = 0;
      this.setState({ current: i })
    }, 10000);

    const checkScrolled = () => {
      if (document.documentElement.scrollTop > 50) {
        this.setState({ noBg: false })
      } else {
        this.setState({ noBg: true })
      }
    }
    checkScrolled()
    window.addEventListener('scroll', checkScrolled)

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


    return <Layout noBg={this.state.noBg} title="RegWrites | Poetry , short stories & more">
      <header className="text-light">
        {images}
        <h1 className="text-uppercase text-center" >Poetry , short stores and more</h1>
      </header>
      <section className="bg-light">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6 order-lg-2">

              <h1 className="heading text-center text-lg-left py-3">About Me </h1>
              <p>
                My name is Regina Sogbuyi and I’m the writer of several widely known fictional book series. My goal is to create a brand new world for my readers  <br /> <br /> a story of real people. Since the beginning of my career, I’m writing books for various audiences that are looking for original
            </p>
            </div>
            <div className="col-md-6 order-lg-1">
              <img src="/img/banner2.jpg" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section className="poem text-dark">
        <h1 className="heading  text-center py-4"> My Artwork  </h1>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <Card src="/img/banner3.jpg" title="Regrose poem" />
            </div>
            <div className="col-md-9 py-5 py-md-3">
              <p>
                “Mark has a unique talent for storytelling. My teenage daughter loves his recent books and I am more profound of his earlier publications. Besides, he is a good journalist and his investigative articles ”
            </p>
              <p>
                profound of his earlier publications. Besides, he is a good journalist and his investigative articles ”
             </p>
              <h5 className="" style={{ color: '#aaa' }}>
                Category : poem. <br /> Published on jan 12 , 2020
             </h5>
            </div>
          </div>
        </div>



      </section>
      <section className="rev">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 bg" >
              <h2>What <br /> readers <br /> say </h2>
              <span>Reviews</span>
            </div>
            <div className="col-md-9 py-3">
              <div id="revCarousel" class="carousel slide" data-ride="carousel">

                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div className="container-fluid">
                      <div className="row align-items-center">
                        <div className="col-lg-3">
                          <div className="row align-items-center">
                            <div className="col-4 col-md-12">
                              <img className="profilePic" src="/img/banner3.jpg" alt="" />
                            </div>
                            <div className="col text-capitalize mt-md-3">

                              <h5>Noel odunmilade</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-9 p-3">
                          <p>
                            Mark has a unique talent for storytelling. My teenage daughter loves his recent books and I am more profound of his earlier publications. Besides, he is a good journalist
            </p>

                          <h5 className=" font-weight-bold" style={{ color: '#aaa' }}>
                            Category : poem. <br /> Published on jan 12 , 2020
             </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <a style={{ width: '5%' }} class="carousel-control-prev" href="#revCarousel" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a style={{ width: '5%' }} class="carousel-control-next" href="#revCarousel" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>

            </div>
          </div>
        </div>

      </section>



      <section id="newsLetter" className="bg-white ">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12 mb-5">
              <i className="fal text-primary fa-4x fa-mail-bulk"></i>
            </div>
            <div className="col">
              <h1 className="">Register to our news letter</h1>
              <p>Get emails of new writeup releases and updates </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form>
                <div className="input position-relative">
                  <i className="fal fa-envelope-open-text text-primary ">
                  </i>
                  <input type="email" placeholder="Email address" />
                </div>
                <button className="btn btn-info">
                  <i className="fal fa-paper-plane mr-3"></i>
                  <span>SEND</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
    header {
      background : #222;
      background-size : cover;
      height : 35rem;
      display : flex;
      justify-content : center;
      position : relative;
      align-items : center;
    }
  
    header h1 {
      font-weight : 500;
      font-size : 2.5rem;
      padding : 0 1rem;
      z-index : 100;
    }
    section {
      padding : 2rem 0;
    }
    .heading {
      color : #000;
      font-weight : 500;
      text-transform : uppercase;
    }
    .poem {
      background : var(--white);
    }
    .rev {
      background : #235;
      color : white;
      padding : 0;
    }
    .bg{
      min-height : 12rem;
      background : rgba(10 ,10 ,50 ,.5);
      display: flex;
      justify-content : center;
      flex-direction : column;
    }
    .bg span{
      font-family : cursive;
      color : rgba(2555,255,255,.7)
    }
    .bg h2{
      text-transform : uppercase;
      font-weight : 300;
      font-size: 2rem;
      color : white;
    }
    .profilePic {
width : 100%;
height : 6rem;
    }
    #newsLetter form {
      width : 90%;
      display : flex;
      flex-direction : column;
      margin : 2rem auto;
    }
    #newsLetter form > *{
      outline : 0;
      height : 3rem;
      margin-bottom : 1rem
    }
    .input > input{
      border : 1px solid #ddd;
      width : 100%;
      padding-left : 2.5rem;
      padding-right : 1rem;
      height : 100%;
      width : 100%;
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
    }
    `} </style>
    </Layout >
  }
}