import Head from 'next/head'
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import Hands from "../components/Hands";

export default function Rules() {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Resources</title>
                <meta name="description" content="Bucks Poker Resources" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main mb-10 container mx-auto flex-auto p-8">
                <div className="hero py-20 text-center">
                    <h1 className="text-5xl font-bold font-sans pb-5">Resources</h1>
                </div>

                <Breadcrumbs>Resources</Breadcrumbs>
                <Hands />
            </main>

            <div className="justify-self-end">
                <Footer />
            </div>
        </div>
    );
}
