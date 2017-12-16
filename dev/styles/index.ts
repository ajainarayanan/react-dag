import { css, hover, media } from "glamor";

const COLORS = {
  blueGreen: "#7EDAD4",
  mintCream: "#F9FFF9",
  salmonPink: "#FF9393",
  teal: "#588188",
  yellow: "#FFEC94",
};

export const theme = {
  main: {
    borderRadius: "4px",
    boxShadow: (color = COLORS.salmonPink) => `1px 1px 1px 1px ${color}`,
    colors: COLORS,
  },
};

export function setGlobal() {
  css.global("html, body", {
    backgroundColor: `${theme.main.colors.salmonPink}`,
    fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    fontSize: "1rem",
    height: "100vh",
    margin: 0,
    overflow: "auto",
    width: "100vw",
  });

  css.global(".jtk-endpoint.jtk-endpoint-anchor", {
    zIndex: 20001,
  });

  css.global("body > #app-dag", {
    height: "100%",
    overflow: "auto",
    width: "100%",
  });

  css.global("a", {
    ":hover": {
      textDecoration: "none",
    },
  });
  css.global("p", {
    marginBottom: "2rem",
  });
  css.global("ul", {
    "> li": {
      "> p": {
        margin: "0",
      },
      margin: "10px 0",
    },
    "> p": {
      margin: "0",
    },
  });
  css.global("h3, h4, h5", {
    borderBottom: "1px solid",
    fontWeight: "bold",
    paddingBottom: "10px",
  });
}
