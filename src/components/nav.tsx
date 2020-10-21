import React from "react";
import Link from "next/link";
import useSWR from "swr";

const Nav = () => {
  const { data: categories } = useSWR("/categories");
  console.log("categories", categories);
  return (
    <div>
      <div>
        <nav className="uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <Link href="/">
                  <a>Strapi Blog</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              {categories?.map((category, i) => {
                return (
                  <li key={category.id}>
                    <Link
                      href={{
                        pathname: "categories",
                        query: { id: category.id },
                      }}
                    >
                      <a className="uk-link-reset">{category.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
