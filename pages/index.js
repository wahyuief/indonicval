import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Indonesian National Identity Card Validator</title>
        <meta name="description" content="Indonesian NIC Validator and Detail Finder API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello World!
        </h1>
        <span>
          <Image src="/babyyoda.png" alt="Baby Yoda" width={250} height={250} />
        </span>
      </main>

      <footer className={styles.footer}>
        Indonesian National Identity Card Validator
      </footer>
    </div>
  )
}
