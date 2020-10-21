import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useSWR from "swr";
import { fetcherWithId } from "../../utils/fetcher";

const CategoryById = (props) => {
  const router = useRouter();

  const { data: category } = useSWR(
    ["/categories", router.query.id],
    fetcherWithId,
  );

  console.log(category);
  return <div></div>;
};

export default CategoryById;
