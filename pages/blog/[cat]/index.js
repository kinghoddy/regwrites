import React, { Component } from 'react';
import Layout from '../../../components/layout'
import firebase from '../../../firebase';
import 'firebase/database';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Post from '../../../components/posts';
import Sd from '../../../components/side'

class Artwork extends Component {
    static async getInitialProps({ query }) {
        return { query }
    }
    state = {
        posts: []
    }
    componentDidUpdate() {
        const cat = this.props.query.cat
        if (cat !== this.state.cat) {
            this.getPosts();
            this.setState({ cat: cat })
        }
    }
    componentDidMount() {
        this.getPosts();
    }
    getPosts = () => {
        const cat = this.props.query.cat
        this.setState({ loading: true })
        firebase.database().ref('posts/' + cat).on('value', s => {
            const posts = []
            for (let keys in s.val()) {
                posts.push({
                    ...s.val()[keys],
                    category: cat,
                    pid: cat + '/' + keys,
                    key: keys
                })
            }
            this.setState({ posts: posts, loading: false })
            console.log(posts);

        })
    }
    render() {
        let posts = this.state.posts.sort((a, b) => b.date - a.date);
        return (
            <Layout title="Poems ,stories and more | Regwrites">
                {this.state.loading && <div style={{ height: '90vh' }}>
                    <Spinner />
                </div>}
                <div className="container py-5"  >
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="text-primary font-weight-light " > {this.props.query.cat.split('-').join(' ')} </h1>
                                </div>
                                {posts.map(cur => (
                                    <div className="col-lg-6">
                                        <Post {...cur} />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <Sd />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Artwork
