import React from 'react';
import Link from 'next/link'


export default props => {
    return <React.Fragment>
        <nav className={"fixed-top toolbar navbar-expand-lg navbar navbar-dark "}>
            <Link href="/">
                <a className="navbar-brand">
                    <img alt="" src='/logo_text.png' />
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
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item ">
                        <Link href="/">
                            <a className="nav-link"> Home</a>
                        </Link>
                    </li>
                    <li className="nav-item ">

                        <Link href="/">
                            <a className="nav-link">Blog</a>
                        </Link>
                    </li>
                    <li className="nav-item ">

                        <Link href="/">
                            <a className="nav-link">Contact</a>
                        </Link>
                    </li>
                    <li className="nav-item ">

                        <Link href="/">
                            <a className="btn-outline-light btn nav-link">login </a>
                        </Link>
                    </li>
                </ul>
            </div>

        </nav>
        <style jsx>{`
        .toolbar{
            background : ${props.noBg ? 'none' : 'rgba(50 , 50 , 150 , .6)'}; 
            backdrop-filter :${props.noBg ? 'none' : 'blur(2rem)'};
        }
        .toolbar img {
            height : ${props.noBg ? '6rem' : '3rem'};
            transition : .3s;
        }
    `} </style>
    </React.Fragment>
}