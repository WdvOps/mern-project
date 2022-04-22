import React from "react";
import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://e-will-portifolio.vercel.app/"
        target="_blank"
        rel="nofollow, noreferrer, noopener"
      >
        e-W°ll Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
