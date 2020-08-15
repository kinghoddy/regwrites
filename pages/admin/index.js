import React, { Component } from 'react'
import Layout from '../../components/layout/backend';
import firebase from '../../firebase';
import 'firebase/database';
import Link from 'next/link'
import dateFormat from '../../components/date'
class index extends Component {
    state = {
        subscribers: [],
        comments: []
    }
    getComments = () => {
        firebase.database().ref('comments').on('value', s => {
            const c = []
            for (let key in s.val()) {
                let com = {
                    ...s.val()[key],
                    key
                }
                com.postId = com.postId.replace('posts', 'blog')
                console.log(com.postId)
                c.push(com)
            }
            this.setState({ comments: c.reverse() })
        })
    }
    componentDidMount() {
        firebase.database().ref('subscribers').on('value', s => {
            const sub = []

            for (let key in s.val()) {
                sub.push({
                    email: s.val()[key],
                    key
                })
            }
            this.setState({ subscribers: sub.reverse() });
        })
        this.getComments()
    }

    render() {
        return (
            <Layout route="Dashboard">
                <div className="container">
                    <div className="dash">
                        <div className="d-flex p-4 justify-content-between">
                            <h4 className="font-weight-light"> {this.state.subscribers.length}  Subscribers</h4>
                            <button className="btn-sm btn btn-primary" onClick={() => this.setState({ showEmails: !this.state.showEmails })}> Show All</button>
                        </div>
                        <table className="table table-striped table-borderless table-responsive-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.subscribers.map((cur, i) => this.state.showEmails ? <tr key={cur.key}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{cur.email}</td>
                                </tr> : i < 5 ? <tr key={cur.key}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{cur.email}</td>
                                </tr> : null)}
                            </tbody>
                        </table>
                    </div>
                    <div className="dash">
                        <div className="d-flex p-4 justify-content-between">
                            <h4 className="font-weight-light"> {this.state.comments.length}  Comments</h4>
                            <button className="btn-sm btn btn-primary" onClick={() => this.setState({ showEmails: !this.state.showEmails })}> Show All</button>
                        </div>
                        <table className="table table-striped table-borderless table-responsive-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Comment</th>
                                    <th>Post title</th>
                                    <th>Post Date</th>
                                    <th>Post Url</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.comments.map((cur, i) => this.state.showEmails ? <tr key={cur.key}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{cur.name}</td>
                                    <td>{cur.comment}</td>
                                    <td>{cur.title}</td>
                                    <td>{dateFormat(cur.date)}</td>
                                    <td>
                                        <Link href={cur.postId}>
                                            <a>Go to post</a>
                                        </Link>
                                    </td>
                                </tr> : i < 5 ? <tr key={cur.key}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{cur.name}</td>
                                    <td>{cur.comment}</td>
                                    <td>{cur.title}</td>
                                    <td> {dateFormat(cur.date)}</td>
                                    <td>
                                        <Link href={cur.postId}>
                                            <a>Go to post</a>
                                        </Link>
                                    </td>
                                </tr> : null)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <style jsx>{`
                  .dash {
                      box-shadow : 0 0 20px rgba(0 ,0 ,0 , .1);
                      margin-bottom : 2rem;
                  }
                  .dash h4 {
                      margin-bottom : 0;
                  }
                `}</style>
            </Layout>
        )
    }
}

export default index
