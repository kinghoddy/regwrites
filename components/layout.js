import React from 'react';
import Head from 'next/head';
import Toolbar from './toolbar' 

export default props =>{
    return <div>
        <Head>
<title>{props.title} </title>
        </Head>
        <Toolbar />
        {props.children}
    </div>
}