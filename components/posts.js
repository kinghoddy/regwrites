import React from 'react';
import dateformat from './date';
import Link from 'next/link'

export default props => {
    return (
        <div className="con mb-4">
            <span className="badge" >{props.category} </span>
            <div className="photo">
                <img src={props.src} alt="" />
            </div>
            <h4 className="title">{props.title}</h4>

            <p className="body" dangerouslySetInnerHTML={{ __html: props.body.substring(0, 130) + '...' }} ></p>
            <div className="d-flex justify-content-between px-2 m-2 border-top pt-2 align-items-center">

                <Link href={"/blog/" + props.pid}>
                    <a className="btn-outline-primary px-2 btn btn-sm " >Read more {'-->'}</a>
                </Link>
                <small className="text-muted">
                    {dateformat(props.date)}
                </small>
            </div>
            {style}
        </div>
    )
}

const style = <style jsx > {`
.con {
    width : 100%;
    box-shadow : 0 8px 15px rgba(0,0,0,.15);
    overflow : hidden;
    position : relative;
}
.photo {
    height : 14rem;
    width : 100%;
    overflow : hidden
}
.photo img {
    transition :all .3s;
    object-fit : cover;
    width : 100%;
height : 100%;
}
.badge {
    background : linear-gradient(to right bottom , #d20 , #d07 );
    color : #fff;
    position : absolute ;
    font-weight : 4 00;
    padding : 5px 10px;
    margin : 10px;
    top : 0px;
    right : 0px;
    text-transform : uppercase;
}
.title { 
   margin : -20px auto 10px;
   position : relative;
   padding : 1rem;
   font-size : .8rem;
   font-weight : light;
   box-shadow : 0 2px 5px #0002;
   background : #fff;
   color : var(--primary);
   z-index : 500;
   text-align : center;
   width : 80%;
   text-transform : uppercase;
}
.body {
    font-size : .8rem;
    padding : 1rem;
    margin-bottom : 0 !important;
    min-height : 8rem;
}
.body p{
    margin-bottom : 0;
}

`}</style>