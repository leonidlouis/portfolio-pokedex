import React from "react";
import { useRouter } from "next/router";

const Header = React.memo(({ showBackLink }) => {
  const router = useRouter();

  return (
    <header className="header">
      {showBackLink ? (
        <div
          onClick={() => {
            router.push(`/`);
          }}
          className="bold"
          id="header-backlink"
        >
          <i className="ai-left" />
          &nbsp;Go Back
        </div>
      ) : null}
      <img className="header__logo" src="/static/pokedex-logo.png"></img>
    </header>
  );
});

export default Header;
