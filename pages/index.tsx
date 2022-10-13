import { useAccount, useNetwork } from "wagmi";
import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/Nav'
import Body from '../components/Body'

const Home: NextPage = () => {
  const { isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();

  const right_connect = !isDisconnected && (chain?.id === chains[0].id) ;

  return (
    <div className="min-h-screen items-center justify-center py-2">
      <Head>
        <title>Toggle</title>
        <link rel="icon" href="/Ww.png" />
      </Head>

      <Nav/>
      <Body rightConnect={right_connect}/>

    </div>
  )
}

export default Home
