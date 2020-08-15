import Link from 'next/link'
import React from 'react';

export default props => {
  return (
    <React.Fragment>
      <div className="clip">
        <nav className="px-2 px-lg-5 py-3">
          <Link href="/">
            <a>
              <img className="logo" alt="" src="/logo.png" />
            </a>
          </Link>
          <span className="mb-0 ml-2">  {props.route === "signup" ? "Regwrites signup " : "Regwrites Login"}</span>
          <button className="animated bounceIn delay-1s ">
            <i className="fa fa-bars"></i>
          </button>
        </nav>
      </div>

      <div className="user ">
        <div className=" con animated fadeInUp mx-auto  px-md-5 px-3 pt-3 pb-5">
          <div className="d-flex align-items-center justify-content-center">
            <i className="fa fa-user"></i>
            <h1 className="header">
              {props.route === "signup" ? "Join Us Today" : "Welcome back !!"}
            </h1>
          </div>
          {props.children}
        </div>
      </div>
      <style jsx>{`
                  .logo { 
            height : 8rem
        }
        nav{
            height : 3rem ;
            position : absolute;
         top :4rem;
            width : 100%;
            display : flex;
            align-items: center;
            z-index : 2000 ;
        }
        nav span{
            font-family : cursive;
            color : white;
        }
        nav button {
            position : fixed ;
            right : 2rem ;
            top : 10px;
            height : 3rem;
            transition : .3s;
            background : rgba(255,255,255,.7);
            width : 3rem;
            border-radius : 50%;
            border : 1px solid #eef;
            box-shadow : 0 10px 15px rgba(0,0,0,.1)
        }
        nav button:hover{
            background : white;

        }
            .user {
              margin: 0;
  height: 100vh;
  overflow: auto;
}
.clip {
  background: linear-gradient(to right bottom , #2aa  , #25a);
  background-size: cover;
  clip-path : polygon(0 0 ,0 90%  ,100% 70% , 100% 0);
  position : absolute;
  height : 100vh;
  z-index : -1;
  width : 100vw;
}
.header {
  font-size : 1.3rem;
  margin-left : 1rem;
  margin-bottom : 0;
}
.con { 
  margin-top: 15vh;
  max-width : 30rem;
  z-index : 1000;
  margin-bottom : 9vh;
  width : 90%;
  box-shadow : 0 10px 25px rgba(0,0,0,.25);
  background: rgba(255, 255, 255, 0.7);
}
.user i {
  color : #777;
  font-size : 3rem
}

@media only screen and (min-width: 1200px) {
  .con {
  }
}

`} </style>

    </React.Fragment>
  )
}