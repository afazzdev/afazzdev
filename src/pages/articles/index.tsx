import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { fetcher } from "../../utils/fetcher";
import { ARTICLES } from "../../utils/fetcherConstant";
import useSWR from "swr";
import { InferGetStaticPropsType } from "next";
import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";

export async function getStaticProps() {
  const articles = await fetcher(ARTICLES);
  return {
    props: {
      articles,
    },
    revalidate: 1,
  };
}

const useHomeStyles = makeStyles(
  createStyles({
    home: {
      display: "-webkit-box",
      overflow: "hidden",
      wordWrap: "break-word",
      whiteSpace: "break-spaces",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 3,
    },
  }),
);

let easing = [0.6, -0.05, 0.01, 0.99];

// Custom variant
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 10,
    },
  },
};

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const classes = useHomeStyles();
  const { data: articles } = useSWR(ARTICLES, fetcher, {
    initialData: props.articles,
  });

  //   console.log({ articles });

  return (
    <Layout>
      <Head>
        <title>@afazzdev's personal blog</title>
      </Head>
      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
      >
        <motion.ul
          variants={stagger}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {articles?.map(({ id, title, slug, image, content }) => (
            <Link href="/articles/[slug]" as={`/articles/${slug}`} key={id}>
              <motion.a
                style={{
                  color: "unset",
                  textDecoration: "unset",
                }}
                variants={fadeInUp}
                whileHover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                <Grid
                  container
                  style={{
                    padding: "2rem",
                    margin: "1rem auto",
                    flexWrap: "nowrap",
                  }}
                  component={Paper}
                  elevation={0}
                >
                  <Grid item xs={5}>
                    <img
                      style={{
                        borderRadius: "2rem",
                        width: "100%",
                      }}
                      src={image.formats.thumbnail.url}
                      alt=""
                    />
                  </Grid>
                  <Grid item style={{ marginLeft: "1rem" }} xs={7}>
                    <Typography variant="subtitle1">
                      <Box fontWeight="700">{title}</Box>
                    </Typography>
                    <Typography variant="body2" className={classes.home}>
                      {content}
                    </Typography>
                  </Grid>
                </Grid>
              </motion.a>
            </Link>
          ))}
        </motion.ul>
      </motion.section>
    </Layout>
  );
}
