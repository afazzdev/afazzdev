import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import useSWR from "swr";
import { ARTICLES } from "../../utils/fetcherConstant";
import { fetcher, fetcherWithSlug } from "../../utils/fetcher";
import { useRouter } from "next/dist/client/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetcher(ARTICLES);
  const paths = articles.map((article) => ({
    params: { slug: article.slug.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const ArticleBySlug = await fetcherWithSlug(
    ARTICLES,
    props.params.slug as string,
  );
  return {
    props: {
      article: ArticleBySlug,
    },
    revalidate: 1,
  };
};

function ArticleBySlug(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const { data: article } = useSWR(
    [ARTICLES, router.pathname],
    fetcherWithSlug,
    {
      initialData: props.article,
    },
  );

  return <div>{JSON.stringify(article)}</div>;
}

export default ArticleBySlug;
