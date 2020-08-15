import React, { Component } from 'react';
import Layout from '../../components/layout/backend';
import firebase from '../../firebase';
import 'firebase/database'
import Link from 'next/link'
import 'firebase/storage';
import PlaceHolder from '../../components/placeHolder/placeholder'

export default class Category extends Component {
    static async getInitialProps({ query }) {
        console.log(query);
        return {}
    }
    state = {
        category: 'poems',
        post: []
    }

    getPost = (category) => {
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/' + category)
        ref.on('value', s => {
            const posts = []
            for (let keys in s.val()) {
                let post = { ...s.val()[keys] }
                post.id = 'posts/' + category + '/' + keys
                post.category = category
                posts.push(post)
            }
            this.setState({ loading: false, post: posts })
        })
    }
    deletePost = (id, src) => {
        var shouldDelete = window.confirm("Do you want to delete this post ?");
        console.log(id, src, 'clicked');
        if (shouldDelete) {

            if (src) {
                var desertRef = firebase.storage().ref(src);
                desertRef.delete()
                firebase.database().ref(id).set(null)
            } else {
                firebase.database().ref(id).set(null)
            }
        }
    }
    componentDidMount() {
        this.getPost('poems')
    }
    inputChanged = e => {
        this.getPost(e.target.value)
        this.setState({ category: e.target.value })
    }

    render() {
        let Posts = this.state.post.map(cur => (
            <div className='post p-3'>
                <img src={cur.src} alt="" />
                <div>
                    <h4>{window.innerWidth < 760 ? cur.title.split("<br/>")
                        .join(" ")
                        .substring(0, 20) +
                        (Array.from(cur.title).length > 20 ? "..." : "") : cur.title.split("<br/>")
                            .join(" ")
                            .substring(0, 35) +
                        (Array.from(cur.title).length > 35 ? "..." : "")} </h4>
                    <p>{window.innerWidth < 760 ? cur.body.split("<br/>")
                        .join(" ")
                        .substring(0, 15) +
                        (Array.from(cur.body).length > 15 ? "..." : "") : cur.body.split("<br/>")
                            .join(" ")
                            .substring(0, 150) +
                        (Array.from(cur.body).length > 150 ? "..." : "")}</p>
                </div>
                <div className="ml-auto">
                    <Link href={'/admin/edit-post?postLink=' + cur.id + '&category=' + cur.category} >
                        <a className="btn btn-primary btn-sm">
                            <i className="material-icons">edit</i>
                        </a>
                    </Link>
                    <button onClick={() => { this.deletePost(cur.id) }} className="btn btn-sm btn-danger ">
                        <i className="material-icons">delete</i>
                    </button>
                </div>
                <style jsx>{`
          .post {
  display: flex;
  height: 6rem;
  margin-bottom: 0.5rem;
}
.post img {
  height: 100%;
  background: #ddd;
  width: 20%;
  object-fit: cover;
}
.post > div {
  margin-left: 1rem;
}

@media only screen and (min-width: 760px) {
  .post {
    height: 8rem;
  }
  .post > div {
    margin-left: 2rem;
  }
}


`} </style>

            </div>

        ));
        return <Layout route={this.state.category}>
            <div className="d-flex px-3 align -items-center py-3 justify-content-between">
                <select className="wow bounce  w-50 form-control"
                    onChange={(event) => {
                        this.inputChanged(event, 'select')
                    }}
                >
                    <option value="poems">Poems</option>
                    <option value="short-stories">short Stories</option>
                    <option value="others">Others</option>

                </select>

                <Link href="/admin/new-post?category=video" as="/admin/new-post">
                    <button className="btn btn-sm px-4  rounded-pill btn-outline-dark">
                        Add new post
                        </button>
                </Link>
            </div>
            {this.state.loading ? <PlaceHolder amount="6" /> : Posts}
        </Layout>

    }
}