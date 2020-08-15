import React from 'react';
import Layout from '../components/layout';
import 'firebase/database'
import firebase from '../firebase';
import Result from '../components/list'

class Search extends React.Component {
    static async getInitialProps({ query }) {
        return { query }
    }
    state = {
        search: '',
        results: []
    }
    searchP = (e) => {
        if (e) e.preventDefault();
        this.setState({ loading: true })
        firebase.database().ref('posts/').on('value', s => {
            const posts = []
            for (let cat in s.val()) {
                for (let keys in s.val()[cat]) {
                    posts.push({
                        ...s.val()[cat][keys],
                        category: cat,
                        href: 'blog/' + cat + '/' + keys,
                        as: 'blog/' + cat + '/' + keys,
                        key: keys
                    })
                }
            }
            const results = [];
            posts.forEach((cur, i) => {
                let t = cur.title.toLowerCase()
                let search = this.props.query.s.toLowerCase();
                if (this.state.search) {
                    search = this.state.search.toLowerCase()
                }
                if (t.indexOf(search) > -1) {
                    console.log(t, this.state.search)
                    results.push(cur)
                }
            })
            this.setState({ loading: false, results: results })

        })
    }
    componentDidMount() {
        const s = this.props.query.s.toLowerCase()
        this.setState({ search: s })
        this.searchP();
    }

    render() {
        const r = this.state.results.sort((a, b) => b.date - a.date)
        return (
            <Layout>
                <header>
                    <div className="container header">
                        <form className="" onSubmit={this.searchP} >
                            <input type="search" required value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} placeholder="Search for a post.." />
                            <button >
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                    </div>
                </header>
                <section>
                    <div className="container">
                        <div className="row py-3">
                            <div className="col-md-8 col-lg-9" >
                                {r.map(cur => <Result key={cur.title} {...cur} />)}
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx>{`
                header {
                    padding : 3rem 0;
                    background : #379;
                }
                    header form {
      width : 90%;
      background : #ffffffaa;
      box-shadow : 0 10px 20px rgba(0,0,0,.3);
      margin : 0 auto;
      height : 3rem;
      display : flex;
      border-radius : 30px;
      overflow : hidden;
    }
    header form > * {
      background : none;
      transition : all .3s ;
      align-self : stretch;
      border : 0;
    }
    header form > *:focus {
      outline : 0;
      background : #fff;
    }
    .header form input {
      width : calc(100% - 2.5rem);
      padding : 0 10px 0 20px;
    }
    .header form button {
      width : 2.5rem;
      padding : 0;
      display : flex;
      align-items :center;
      flex-shrink : 0;
      justify-content : center;
    }
    .header form button:hover {
      background : linear-gradient(to right bottom , #229 , #a0a) ;
      color : white;
    }


                `}</style>
            </Layout>
        )
    }
}

export default Search;