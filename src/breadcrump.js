import React from "react";
import { Card, Breadcrumbs, Typography, Box } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

function Breadcrump(props) {
  if (props.listing.length) {
    let new_list = props.listing.map((element) => (
      <Typography key={element} style={{ color: "white" }}>
        {element}
      </Typography>
    ));
    return (
      <Box
        className="smoothdrop"
        style={{ position: "absolute", left: "-20px" }}
      >
        <Card
          style={{
            width: "110vw",
            height: "10vh",
            backgroundColor: "#4e64d3",
            position: "sticky",
          }}
        >
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            className="breadcrump"
            aria-label="breadcrumb"
          >
            {new_list}
          </Breadcrumbs>
        </Card>
      </Box>
    );
  } else {
    return <span></span>;
  }
}

export default Breadcrump;
