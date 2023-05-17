import { useState } from "react";
import "./App.css";
import { ItemList } from "./components/ItemList";
import { Listing } from "./components/Listing";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

function App() {
  // reload ItemList after Listing complete
  const [reload, setReload] = useState(true);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Simple Mercari
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 3 }}>
        <Stack
          spacing={5}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Item>
            <Listing onListingCompleted={() => setReload(true)} />
          </Item>
          <Item>
            <ItemList
              reload={reload}
              onLoadCompleted={() => setReload(false)}
            />
          </Item>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
