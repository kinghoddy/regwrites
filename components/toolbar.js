import React from 'react';
import Link from './UI/Link/link';
import firebase from '../firebase';
import 'firebase/auth';


export default props => {
    const [userExists, setUserExists] = React.useState(false);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setUserExists(true)
        }
    })
    return < React.Fragment >
        <nav className="  navTop py-2 navbar-dark navbar navbar-expand "  >
            <div className="collapse navbar-collapse ">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/blog/[cat]" as="/blog/poems">
                            <a className="nav-link"> Poems  </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/blog/[cat]" as="/blog/short-stories">
                            <a className="nav-link"> Short Stories  </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/blog/[cat]" as="/blog/others" >
                            <a className="nav-link"> Others  </a>
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
        <nav className={"toolbar sticky-top navbar-expand-lg navbar navbar-light py-2 py-lg-0 px-3 px-md-5"}>
            <Link href="/">
                <a className="py-0 navbar-brand">
                    <img alt="" src='/logo_dark.png' />
                </a>
            </Link>
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-toggle="collapse"
                data-target="#navBar"
                aria-controls="navBar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navBar">
                <ul className="navbar-nav mr-auto  mt-2 mt-lg-0">
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/">
                            <a className="nav-link"> Home</a>
                        </Link>
                    </li>
                    <li className="nav-item ">

                        <Link activeClassName="active" href="/#about">
                            <a className="nav-link">About</a>
                        </Link>
                    </li>
                    <li className="nav-item ">

                        <Link activeClassName="active" href="/#newsLetter">
                            <a className="nav-link">Subscribe</a>
                        </Link>
                    </li>
                </ul>

                <Link href="/blog">
                    <a className=" px-3 btn btn-primary">
                        <i className="fal fa-desktop mr-3"></i>
                        Blog</a>
                </Link>
            </div>

        </nav>
        <style jsx>{`
        .navTop {
  background-color : #111818;
        }
        .navTop .text {
            font-size : .8rem;
            display : block;
            width : 40%;
        }
        .toolbar{
            background : #ffffff;
            backdrop-filter :blur(2rem);
            box-shadow : 0 0px 8px rgba(0,0,0,.1)
        }
        .toolbar ul a {
            font-size : .9rem;
            padding : 1rem 1.5rem;
        }
        .toolbar ul a:hover,
        .active {
            color : blue;
            border-bottom : 2px solid blue;
        }
        .toolbar img {
            height : ${props.noBg ? '6rem' : '3rem'};
            transition : .3s;
        }
        @media only screen and (min-width : 1200px){
        .toolbar ul a {
            padding : 1.4rem 1.5rem
        }
        }
    `} </style>
    </React.Fragment >
}