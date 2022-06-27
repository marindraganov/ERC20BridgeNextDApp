import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import ERC20Bridge from "../components/ERC20Bridge";
import NetworkInfo from "../components/NetworkInfo";
import { BRIDGE_ADDRESS } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";

function Home() {
  const { account, library, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>ERC20BridgeDAapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>ERC20 Token Bridge</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          <a href="">
            ERC20 TokenBridgeDApp
          </a>
        </h1>

        {isConnected && (
          <section>
            <NetworkInfo chainID={chainId}/>
            <NativeCurrencyBalance />
            <ERC20Bridge contractAddress={BRIDGE_ADDRESS} />
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
