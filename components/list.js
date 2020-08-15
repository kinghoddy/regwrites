import React from "react";
import Link from "next/link";
import dateFormat from './date'
export default props => {
  return (
    <div className={"fadeIn wrapper"} >
      <img src={props.src} alt="" />
      <div className='pl-3' >
        <Link href={props.href} as={props.as}>
          <a className="title">
            {props.title}
          </a>
        </Link>
        <br />
        <small>{dateFormat(props.date)}</small>
        <p className="body" dangerouslySetInnerHTML={{ __html: props.body.split('<br />').join(' ').substring(0, 150) }} ></p>
      </div>

      <style jsx global >{`
            .wrapper {
              display : flex;
              margin  : 10px 0;
            }
            .wrapper img {
              height : 8rem;
              width : 5rem;
              object-fit : cover ;
            }
            .title {
              font-size : 20px;
              text-transform : capitalize;
            }
            .body {
              margin-bottom : 0;
            }
            .body * {
              display : inline;
              margin : 0;
              padding : 0;
            }
       `}</style>
    </div>

  );
};
