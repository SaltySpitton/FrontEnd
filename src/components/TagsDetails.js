import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  Box,
  Paper,
  Grid,
  styled
} from "@mui/material";
import arrayofTags from "./arrayofTags/arrayofTags";
import UserContext from './UserContext'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const TagsDetails = () => {
  const {setSearchTag} = useContext(UserContext)
  const [backgroundColor, setbackgroundColor] = useState("#d0e6ba");
  const [display, setDisplay] = useState("inline-block");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {arrayofTags.map(({ nameTag, descripTag }) => (
              <Grid item
                key={nameTag} 
                xs={12}
                sm={12} 
                md={4}
              >
                  <Box sx={{ border: 2 }}>
                      <Item 
                          item="auto"
                          sx={{
                              boxShadow: 0,
                              textAlign: "left",
                          }}
                      >
                        <div style={{
                            backgroundColor: backgroundColor,
                            display: display,
                        }}>
                            <Link to="/questions"
                                onClick={()=>{
                                    setSearchTag(nameTag)
                                }} 
                            >
                            <strong>{nameTag}</strong>
                            </Link>
                        </div>
                    </Item>

                    <Item sx={{
                        boxShadow: 0,
                        textAlign: "left",
                    }}>
                    {descripTag}
                    </Item>
                </Box>
              </Grid>
            ))}
          </Grid>
      </Box>
    </>
  );
};

export default TagsDetails;
