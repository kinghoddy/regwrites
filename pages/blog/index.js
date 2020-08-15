import React, { Component } from 'react';
import Layout from '../../components/layout'
import firebase from '../../firebase';
import 'firebase/database';
import Spinner from '../../components/UI/Spinner/Spinner';
import Post from '../../components/posts';
import Sd from '../../components/side'

class Artwork extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        this.getPosts();
    }
    getPosts = () => {
        this.setState({ loading: true })
        firebase.database().ref('posts/').on('value', s => {
            const posts = []
            for (let cat in s.val()) {
                for (let keys in s.val()[cat]) {
                    posts.push({
                        ...s.val()[cat][keys],
                        category: cat,
                        pid: cat + '/' + keys,
                        key: keys
                    })
                }
            }
            this.setState({ posts: posts.reverse(), loading: false })
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
