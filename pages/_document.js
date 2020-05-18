import Document, { Html, Head, Main, NextScript } from 'next/document'



class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="animate.css" />
                    <link rel="shortcut icon" href="/logo.png" />
                    <script src="jquery/dist/jquery.js"></script>
                    <script src="wow.js/dist/wow.js"></script>
                    <script src="/js/bootstrap.js"></script>
                    <script src="/js/bootstrap.bundle.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
   
            </Html>
        )
    }
}

export default MyDocument