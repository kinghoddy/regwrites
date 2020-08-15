import React from 'react';
import Head from 'next/head';
import Toolbar from './toolbar';
import Footer from './footer'
export default props => {
    return <div>
        <Head>
            <meta property="og:title" content={props.title ? props.title : 'Regwrites | poems , short stories and more'} />
            <meta property="og:description" content={props.body ? props.body : 'Get poems , short stories and more from regwrites'} />
            <meta property="og:image" content="/favicon.png" />
            <meta name="theme-color" content="#147" />
            <title>{props.title ? props.title : 'Regwrites | poems , short stories and more'} </title>
            <meta name="description" content={props.body ? props.body : 'get poems , short stories and more from regwrites'} />
        </Head>
        <Toolbar noBg={props.noBg} />
        {props.children}
        <Footer />
    </div>
}