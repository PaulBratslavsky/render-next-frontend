import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  function showAllPosts(posts) {
    return posts.data.map((post) => {

      const { id, attributes } = post;

      console.log(attributes);

      const { title, published_date, content, cover } = attributes;

      return (
        <a key={id} href="https://nextjs.org/learn" className={styles.card}>
          <h2>{title} &rarr;</h2>
          <p>{content}</p>
          <p>{published_date}</p>
          <Image src={cover.data.attributes.url} alt={title} width={300} height={200} />
        </a>
      );
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>{showAllPosts(posts)}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(process.env.STRAPI_URL_BASE + "/api/posts?populate=*" || "http://localhost:1337/api/posts?populate=*");
  const posts = await res.json();

  console.log(posts);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}
