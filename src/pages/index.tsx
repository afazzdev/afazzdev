import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { fetcher } from "../utils/fetcher";
import { ARTICLES } from "../utils/fetcherConstant";
import useSWR from "swr";
import { InferGetStaticPropsType } from "next";

export async function getStaticProps() {
  const articles = await fetcher(ARTICLES);
  return {
    props: {
      articles,
    },
    revalidate: 1,
  };
}

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <Layout home>
      <Head>
        <title>@afazzdev's personal blog</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          <Link href="/articles">
            <a className="link">Articles</a>
          </Link>
        </ul>
      </section>
    </Layout>
  );
}
