import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";

const server = process.env.REACT_APP_API_URL || "http://127.0.0.1:9000";

interface Prop {
  onListingCompleted?: () => void;
}

type formDataType = {
  name: string;
  category: string;
  image: string | File;
};

export const Listing: React.FC<Prop> = (props) => {
  const { onListingCompleted } = props;
  const initialState = {
    name: "",
    category: "",
    image: "",
  };
  const [values, setValues] = useState<formDataType>(initialState);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.files![0],
    });
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", values.name);
    data.append("category", values.category);
    data.append("image", values.image);

    console.log(values);
    await fetch(server.concat("/items"), {
      method: "POST",
      mode: "cors",
      body: data,
    })
      .then((response) => {
        console.log("POST status:", response.statusText);
        onListingCompleted && onListingCompleted();
      })
      .catch((error) => {
        console.error("POST error:", error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Item>
          <TextField
            type="text"
            required
            name="name"
            id="name"
            label="name"
            variant="outlined"
            onChange={onValueChange}
            size="small"
          />
        </Item>
        <Item>
          <TextField
            type="text"
            required
            name="category"
            id="category"
            label="category"
            variant="outlined"
            onChange={onValueChange}
            size="small"
          />
        </Item>
        <Item>
          <Button variant="outlined" component="label">
            Choose jpeg file
            <input
              type="file"
              name="image"
              id="image"
              onChange={onFileChange}
              hidden={true}
            />
          </Button>
        </Item>
        <Item>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Item>
      </Stack>
    </form>
  );
};
