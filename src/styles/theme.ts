import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          background: "#fff",
        },
      },
    },
  },
});
