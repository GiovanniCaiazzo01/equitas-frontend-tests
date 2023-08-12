# Webpage link
you can look at webPage [here](https://giovannicaiazzo01.github.io/equitas-frontend-tests/)

# 1 - How did I approach code refactoring?

First, I conducted a dependency analysis of the project, checking the technologies used and their versions. Next, I entered the project folder structure to get a preliminary idea of ​​how to navigate within it. After getting an initial insight into how the project worked, I launched it.

# 2 - The first design draft

Once the project started, I grabbed a pen and paper and started sketching out the first drafts of the design, simple and rough, without going into detail, but enough to have a mental idea of ​​the final desired design.

# 3 - Approach to refactoring:

In the track, it was required to finish the refactoring within a maximum of three hours. I have tried to meet this deadline and have made refactoring decisions within the time available to me.

The first thing I did was split the App.js components into two new sub-components, namely Header and Footer. The header briefly contains the SpaceX company name and launch count. The central body contains the cards, while the footer contains the buttons for navigating forward and backwards and counting the pages. Also, I've added a load element to cover the whole page while retrieving data from the first query call.

The App.js component is a combination of old and new code. I've kept the queries and pagination functions as they were implemented but made changes to the UI components, which I'll list shortly.

While the Material UI offers all the tools needed to complete the layout without having to write too much custom CSS, I still wanted to use both my handwritten custom CSS and MUI components. I did this to demonstrate my skills both in the field of CSS and in adapting to libraries with which I had no experience, such as MUI in this case.

# 3.1 - how i refactored `App.js` 

From the beginning, I decided to split the App.js code into various sections because it initially contained the entire page. I approached code refactoring trying to make the project more robust and easily refactorable by other developers in the future. To start, I created two components, `<Header/>` and `<Footer/>`, in order to better separate and organize the code.

OLD CODE: 
```js
 return (
        <div>

            <Container>
                <p>Total Launches: {data["totalDocs"]}</p>
                {data["docs"] ? (
                    <div>
                        <Launches launches={data["docs"]}/>
                        <p>Page {data["page"]} / {data["totalPages"]} </p>
                        <Button variant="outlined" onClick={prevPage} disabled={currentPage === 1}>Prev Page</Button>
                        <Button variant="outlined" onClick={nextPage} disabled={currentPage === data["totalPages"]}>Next
                           Page</Button>

                   </div>
                ) : (
                    <div>Loading...</div>
                )}

            </Container>

        </div>
    );
export default App;
```

REFACTORED ONE:
```js
  return (
    <Container maxWidth="xl">
      <Header launches={data} />
      {data["docs"] ? (
        <div>
          <Launches launches={data["docs"]} />
          <Footer
            launches={data}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
export default App;

```

# 3.2 how `<Header />` works.

in this refactoring, the header was structured using the `Box` component provided by `Material-UI`. The `Box` component is used as a layout element with some properties specified via the left props. These properties include `display: flex`, `flex-wrap: wrap`, and `justifyContent: space-between`, which allow you to position the elements within the `Box` in a desired configuration.

Inside the `Box`,  Text component are imported from a custom layout module called `Text`. This custom layout module was created to simplify and standardize text style settings throughout the application.

OLD CODE: 
```js
  <p>Total Launches: {data["totalDocs"]}</p>
```


REFACTORED ONE:
```js
import { Box } from "@mui/material";
import React from "react";
import { Text } from "../../layouts";
import style from "./style.module.css";
const Header = ({ launches: data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
      className={style.header_container}
    >
      <Text fontSize="3rem" color="#ffffff" marginRight="10px">
        SpaceX 🚀
      </Text>
      <Text
        fontSize="3rem"
        color="#ffffff"
        marginRight="10px"
        marginLeft="10px"
      >
        Total Launches: {data["totalDocs"]} 🧑‍💻
      </Text>
    </Box>
  );
};

export default Header;
```


# 3.3 how `<Launches/>` works.

The new Launches component code differs in many ways from the old one. First of all, I eliminated the use of <Grid /> by replacing it with a simple <Box/> with flex property, which will be the parent container of all cards. As you can see, I pass all the information about the throws via props from the parent and iterate through a map. The map then returns a launch component representing the card itself with all the necessary information.

OLD CODE: 
```js
import {Grid, Paper} from "@mui/material";
import Launch from "../Launch";
import styles from './launches.module.css';

const Launches = ({launches}) =>  {
    return (
        <Grid container spacing={2}>
            {launches.map((launch) => (
                <Grid key={launch.id} item xs={4}>
                    <Paper className={styles.page}>
                        <Launch props={launch}/>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}


export default Launches
```


REFACTORED ONE:
```js
import { Box } from "@mui/material";
import Launch from "../Launch";

const Launches = ({ launches }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "start",
      }}
    >
      {launches.map((launch) => (
        <Launch props={launch} key={launch.id} />
      ))}
    </Box>
  );
};

export default Launches;
```


# 3.4 how `<Launch/>` works.

The Launch component is a component that displays information about a launch, such as an image, name, height, mass, launch location, flight number, and launch date. The layout of the component is managed by MUI components and by CSS rules for the <Card /> and <Box/> components. The information is displayed within the <Card /> component and is formatted using components such as <Text /> and <Avatar />. The component also uses a utility function called truncateWords to truncate the launch name text if it is too long.


OLD CODE: 
```js
import styles from './launch.module.css'
import moment from 'moment'

const Launch = ({props}) => {

    return (
        <div>
            <div className={styles.launchTitle}>{props.name}</div>
            <div>Id: {props.id}</div>
            <div>Flight Number: {props.flight_number}</div>
            <div>Launch Date: {moment(props.date_utc).format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
    )

}

export default Launch
```


REFACTORED ONE:
```js
import { Card, Box, Avatar } from "@mui/material";
import moment from "moment";
import { Text } from "../../layouts";
import style from "./style.module.css";

const truncateWords = (string, limit) => {
  const words = string ? string.split(" ") : "";
  return words
    ? words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "")
    : "";
};

const Launch = ({ props }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#1d1e22",
        width: "500px",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderColor: "rgb(65, 63, 63)",
        borderWidth: "thin",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px 6px",
        boxShadow: "0 5px 8px rgba(0, 0, 0, 1)",
        color: "#ffffff",
      }}
      className={style.launch}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Avatar src={props.links.patch.small} sx={{ marginRight: "10px" }} />
        <Text fontWeight="bold" fontSize="large" marginBottom="10px"></Text>

        <Text fontWeight="bold" fontSize="large" marginBottom="10px">
          {truncateWords(props.name, 3)}
          {props.rocket.type === "rocket" ? " 🚀" : " 🛰️"}
        </Text>
      </Box>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Height:</strong> {props.rocket.height.meters} meters(
        {props.rocket.height.feet} feet)
      </Text>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Mass:</strong> {props.rocket.mass.kg} kg(
        {props.rocket.mass.lb} lb)
      </Text>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Launched from:</strong> {props.launchpad.region}
      </Text>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Launchpad full name:</strong> {props.launchpad.full_name}
      </Text>

      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Flight Number:</strong> {props.flight_number}
      </Text>

      <Text fontWeight="100" fontSize="large">
        <strong>Launch Date:</strong>
        {moment(props.date_utc).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
    </Card>
  );
};

export default Launch;
```

# 3.5 how exporting components

all the components exports in this way 

```js
export default Launches;
```

then under the level of Components dir, I've crated a file that export all the components, in this way I can have a centralized file for exporting components

```js
export { default as Footer } from "./Footer";
export { default as Launch } from "./Launch";
export { default as Launches } from "./Launches";
export { default as Header } from "./Header";
```

# 4 Why Layouts


In the layout section, you can find a small component that takes care of displaying text formatted according to the sent props. The current implementation uses React:

```js
import React from "react";
const Text = ({
  children,
  fontWeight,
  fontSize,
  color,
  marginBottom,
  marginRight,
  marginLeft,
  textAlign,
}) => {
  // Note: the suggested way to do this is using styled-component and prop validation
  return (
    <div
      style={{
        fontWeight: `${fontWeight}`,
        fontSize: `${fontSize}`,
        color: `${color}`,
        textAlign: `${textAlign}`,
        marginBottom: `${marginBottom}`,
        marginRight: `${marginRight}`,
        marginLeft: `${marginLeft}`,
      }}
    >
      {children}
    </div>
  );
};

export default Text;
```


It is important to point out that this is a very basic, if not insufficient way to manage a layout. There are many things that could be considered to improve this component. However, as specified at the beginning, I tried to keep within the established time and therefore I wanted to give an at least initial idea of the component for the layout.
To improve this component, I would definitely suggest using styled-components as a styling method. Also, I would expand the props that can be received and add a props validation. Also, it might be helpful to create an overarching theme that all layout components can relate to.
You can find an example of my implementation in this public repo: [link](https://github.com/GiovanniCaiazzo01/Elastic-Team-OpenAI---Powered-Text-Generator-Challenge/tree/main/client/src/layouts)



