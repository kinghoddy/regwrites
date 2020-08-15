import React from 'react';
import Layout from '../components/layout'
import firebase from '../firebase';
import Link from 'next/link'
import 'firebase/database';

export default class U extends React.Component {
    static async getInitialProps({ query }) {
        return { query }
    }
    state = {
        unsubscribed: false
    }
    unsubscribe = () => {
        const email = this.props.query.email
        firebase.database().ref('subscribers').once('value', s => {
            for (let key in s.val()) {
                if (s.val()[key] === email) {
                    firebase.database().ref('subscribers/' + key).remove().then(() => {
                        this.setState({ unsubscribed: true })
                    })
                }
            }
        });
    }
    render() {
        return (
            <Layout title="Unsubscribe from /regwrites">
                <div className="wrapper">
                    {this.state.unsubscribed ? <h1 className="font-weight-light" >You have unsubscribed from Reg Writes</h1> : <React.Fragment>

                        <i className="fal fa-sad-tear fa-5x text-primary mb-4"></i>
                        <h1 className="font-weight-light" > We are sad to see you leave</h1>
                        <p>Are you sure you want to unsubscribe? </p>
                        <div className="buttons">
                            <button onClick={this.unsubscribe} className="btn btn-light text-primary mx-2 px-4" >Yes</button>
                            <Link href="/">
                                <a className="btn btn-light text-danger mx-2 px-4 " >No</a>
                            </Link>
                        </div>
                    </React.Fragment>}
                </div>
                <style jsx>
                    {`
                    .wrapper {
                        min-height : 20rem;
                        width : 90%;
                        padding : 3rem 2rem;
                        text-align : center;
                        margin  5rem auto ;
                        box-shadow : 0 10px 20px rgba(0,0,0,.1);
                    }
                    @media only screen and (min-width : 760px) {
                      .wrapper {
                        padding : 3rem ;                      }
                    }
                    `}</style>
            </Layout>
        )
    }
}