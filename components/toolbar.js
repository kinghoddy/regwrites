import React from 'react';
import Link from 'next/link'


export default props => {
    return <React.Fragment> 
        <nav className="toolbar navbar-expand navbar sticky-top navbar-dark ">
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
background : #25a
        }
        .toolbar img {
            height : 5rem
        }
        `} </style>
    </React.Fragment>
}