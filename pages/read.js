import React, { Component } from 'react';
import Layout from '../components/layout';
import firebase from '../firebase';
import dateFormat from '../components/date'
import Side from '../components/sideWidjet';
import 'firebase/database';
import Spinner from '../components/UI/Spinner/Spinner'

export default class Read extends Component {
    static async getInitialProps({ query }) {
        const post = await firebase.database().ref(query.ref).once('value')
        return { post, query }
    }
    state = {
        post: {
            comments: []
        },
        formData: {
            name: '',
            comment: ''
        }
    }
    addComment = e => {
        e.preventDefault()
        const comment = {
            name: this.state.formData.name,
            comment: this.state.formData.comment,
            date: Date.now()
        }
        firebase.database().ref(this.props.query.ref).child('comments').push(comment)
    }
    inputChanged = (e, type) => {
        const fd = { ...this.state.formData }
        fd[type] = e.target.value
        this.setState({ formData: fd })

    }
    componentDidMount() {
        const post = { ...this.props.post, comments: [] }
        if (post.title) {
            if (this.props.post.comments) {
                for (let keys in this.props.post.comments) {
                    post.comments.push(this.props.post.comments[keys])
                }
                post.comments = post.comments.reverse()
            }
            this.setState({
                post: post,
                loading: false
            })
        }
        this.getPosts()
    }
    getPosts = () => {
        // this.setState({ loading: true })
        firebase.database().ref(this.props.query.ref).on('value', s => {
            const post = { ...s.val(), comments: [] }
            if (s.val().comments) {
                for (let keys in s.val().comments) {
                    post.comments.push(s.val().comments[keys])
                }
                post.comments = post.comments.reverse()
            }

            this.setState({
                post: post,
                loading: false
            })
        })
    }
    render() {
        return (
            <Layout {...this.state.post}>

                <div className="main">

                    <img className="banner" alt="" src={this.state.post.src} />
                    <div className="container page py-5">
                        <div className='row py-2 justify-content-center '>

                            {this.state.loading ? <div className='col-12' style={{ height: '50vh' }}>
                                <Spinner message="Loading Post.." />
                            </div> : null}
                            <div className='col-md-5 order-md-2' >
                                <h4 className="text-uppercase"> {this.state.post.title}  </h4>
                                <p dangerouslySetInnerHTML={{ __html: this.state.post.body }}></p>
                                <span className='text-muted pb-3 d-block'>Uploaded on  {dateFormat(this.state.post.date)} </span>
                                <h6>Kindly share this post</h6>
                                <div class="a2a_kit pb-3 a2a_kit_size_32 a2a_default_style">
                                    <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                                    <a class="a2a_button_facebook"></a>
                                    <a class="a2a_button_twitter"></a>
                                    <a class="a2a_button_email"></a>
                                    <a class="a2a_button_whatsapp"></a>
                                </div>
                                <img className="img " src={this.state.post.src} alt="" />
                            </div>

                            <div className="pt-3 pt-md-3 col-md-3 order-md-3 ">
                                <div className="sticky-top">

                                    <h5>Comments <span className="text-muted pl-3">{this.state.post.comments.length} </span></h5>
                                    {this.state.post.comments.map(cur => <div className="comment">
                                        <h6 className="text-capitalize text-info">{cur.name}</h6>
                                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: cur.comment }}></p>
                                    </div>)}
                                    <form onSubmit={this.addComment}>
                                        <input onChange={e => this.inputChanged(e, 'name')} value={this.state.formData.name} className="form-control" type="text" placeholder="Your Name" />
                                        <textarea onChange={e => this.inputChanged(e, 'comment')} value={this.state.formData.comment} className=" my-2 form-control" placeholder="Comment..." />
                                        <button className="btn btn-block btn-info">   Send </button>
                                    </form>
                                </div>
                            </div>
                            <div className="pt-3 pt-md-0 col-md-4 order-md-1">
                                <Side />
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx >{`
                .main {
                    position : relative;
                    margin-top : 3.6rem;
                    padding : 5rem 1rem;
                    background : #eee
                }
                  .banner {
                      display : flex;
                      position : absolute;
                      top : 0;
                      left : 0;
                      height : 40vh;
                      width : 100%;
                      object-fit : cover;
                    }
                  .page {
                      background : var(--white);
                      position : relative;
                      box-shadow : 0 10px 15px rgba(0,0,0,.1);
                      z-index : 100;
                      margin : 0 auto;
                  }
                  .img {
                      display : block;
                      width : 100%;
                      max-width : 19rem;
                  }
                  .comment {
                      box-shadow : 0 0px 10px rgba(0 ,0,0,.14);
                      margin-bottom : 1rem;
                      padding : .5rem; 
                  }
                
                `} </style>
            </Layout>
        )
    }
}