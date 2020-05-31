# Sharing URL

## Discussion

**Topics to discuss:**

- Routers
- Link vs NavLink
- Route Parameters

## Step 0: Previous Challenge

Our search bar is case sensitive. Let's fix that

1. By using `toLowerCase` or `toUpperCase` on both `cookie.name` and `query`. This guarantees that there is no issue with the case:

```javascript
const cookieList = props.cookies
  .filter((cookie) => cookie.name.toLowerCase().includes(query.toLowerCase()))
  .map((cookie) => (
    <CookieItem
      cookie={cookie}
      key={cookie.id}
      deleteCookie={props.deleteCookie}
      selectCookie={props.selectCookie}
    />
  ));
```

## Step 1: Setup

1. Start with installing the following packages:

```shell
  $ yarn add react-router react-router-dom
```

2. To use React Router, first we will wrap `App` in `index.js` with `BrowserRouter` which we import from `react-router-dom`.

```javascript
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

3. Open your React Dev Tools, you'll see that at the top of the hierarchy we have new components all related to React Router.

## Step 2: Home Component

1. Let's create a `Home` component:

```javascript
import React from "react";
import { Description, ShopImage, Title } from "../styles";

const Home = () => {
  return (
    <>
      <Title>Cookies and Beyond</Title>
      <Description>Where cookie maniacs gather</Description>
      <ShopImage
        alt="cookie shop"
        src="https://i.pinimg.com/originals/8f/cf/71/8fcf719bce331fe39d7e31ebf07349f3.jpg"
      />
    </>
  );
};

export default Home;
```

2. Import and render it in `App`:

```javascript
import Home from "./components/Home";

return (
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      <ThemeButton onClick={toggleTheme}>
        {currentTheme === "light" ? "Dark" : "Light"} Mode
      </ThemeButton>
      <Home />
```

## Step 3: Routes and Switch

1. Let's create our first route that takes us to the home page. First we will import `Route` from `react-router`:

```javascript
import { Route } from "react-router";
```

2. Then, wrap your `Home` component with `Route`:

```jsx
<Route>
  <Home />
</Route>
```

3. Give your route a path:. Now whenever `/` is called, the component `Home` will be rendered.

```jsx
<Route path="/">
  <Home />
</Route>
```

4. Let's create another route for our list of cookies, but first let's remove `setView`:

```jsx
<Route path="/">
  <Home />
</Route>
<Route path="/cookies">
  <CookieList
    cookies={_cookies}
    deleteCookie={deleteCookie}
    selectCookie={selectCookie}
  />
</Route>
```

5. But both routes are being rendered. We need some condition that renders one route exclusively, fortunately React Router provides a component called `Switch` that renders the first route that matches the path, so we will import it:

```javascript
import { Route, Switch } from "react-router";
```

6. Now, we will wrap our routes with `Switch`:

```jsx
<Switch>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/cookies">
    <CookieList cookies={_cookies} deleteCookie={deleteCookie} />
  </Route>
</Switch>
```

7. But note that both `/` and `/cookies` are rendering `Home`! In fact, whatever route we type takes us to `Home`! That's because it's matching the URL to the path `/` and rendering `Home`, to fix that we will make our route `exact`:

```jsx
<Route exact path="/">
  <Home />
</Route>
```

8. Also, a rule of thumb, keep your longer paths above. So, we'll rearrange them:

```jsx
<Switch>
  <Route path="/cookies">
    <CookieList cookies={_cookies} deleteCookie={deleteCookie} />
  </Route>
  <Route exact path="/">
    <Home />
  </Route>
</Switch>
```

## Step 4: Links

1. Now how can we move from `Home` to `Cookies` without changing the URL? In HTML, we used an `a` tag right? Let's try it out:

```jsx
<a href="/cookies">
  Cookies
</a>
<ThemeButton onClick={toggleTheme}>
  {currentTheme === "light" ? "Dark" : "Light"} Mode
</ThemeButton>
```

2. It worked! But note that the page is being refreshed! That's because `href` refreshes the page, and this is something that we want to avoid, because in React we don't reload our page.

3. To fix this issue, we will use `Link` from React Router which changes the path without refreshing our app. Let's import it:

```javascript
import { Link } from "react-router-dom";
```

4. We give it a `to` which will change the path:

```jsx
<Link to="/cookies" style={{ margin: 10, float: "right" }}>
  Cookies
</Link>
```

5. Voila! We rendered `Cookies` without refreshing our page!

## Step 5: Cookie Detail and Route Params

1. We'll change the way `CookieDetail` gets its cookie. We will pass `_cookies` as a prop:

```jsx
<CookieDetail cookies={_cookies} deleteCookie={deleteCookie} />
```

2. In `CookieDetail`, we will `find` the cookie according to the ID of the cookie we clicked on. For now we're only looking for the cookie with ID 1.

```javascript
const cookie = props.cookies.find((cookie) => cookie.id === 1);
```

3. Now, let's create a route for `CookieDetail` for the cookie with ID #1. As agreed, we'll put it above `/cookies`.

```jsx
<Route path="/cookies/1">
  <CookieDetail cookies={_cookies} deleteCookie={deleteCookie} />
</Route>
```

4. In `CookieItem`, we'll add a `Link` around `CookieWrapper` that takes us to `/cookies/1`:

```jsx
<Link to="/cookies/1">
  <CookieWrapper>..</CookieWrapper>
</Link>
```

5. It's working! But the problem is we need to create a route for every cookie and that's just ridiculous. So we will add a route parameter to our path. A route parameter is defined with a `:` followed by the name of our route parameter. The value of `cookieId` can be captured from the URL.

```jsx
<Route path="/cookies/:cookieId">
  <CookieDetail cookies={_cookies} deleteCookie={deleteCookie} />
</Route>
```

6. So now, in `CookieItem` we will pass the cookie's ID instead of hard-coding it:

```jsx
<Link to={`/cookies/${cookie.id}`}>
  <CookieWrapper>..</CookieWrapper>
</Link>
```

7. But now how can we capture the ID in `CookieDetail`? We will use a hook called `useParams`. Let's import it:

```javascript
import { useParams } from "react-router-dom";
```

8. `useParams` is a method that returns an object. `cookieId` is saved inside it:

```javascript
const CookieDetail = (props) => {
  const cookieId = useParams().cookieId;
  console.log("CookieDetail -> cookieId", cookieId)

```

9. Let's de-structure it:

```javascript
const { cookieId } = useParams();
```

10. Let's use `cookieId` to `find` our cookie:

```javascript
const { cookieId } = useParams();
const cookie = props.cookies.find((cookie) => cookie.id === +cookieId);
```

11. It's working! Now we can delete `selectCookie` from all our components.

## Step 7: History

1. We have an issue, in `CookieItem` the delete button stopped working, it now navigates us the cookie's detail page! That's because we wrapped the whole component with `Link`.

2. We need to disable that, to do that we will use a method that `prevents` the default action when clicking on the delete button, which in this case is navigating to detail.

3. This method comes in the `event` object of `onClick`, so we will pass it as an argument to `deleteCookie`:

```jsx
<DeleteButton onClick={(event) => props.deleteCookie(event, cookie.id)}>
  Delete
</DeleteButton>
```

4. In `App`, we will pass `event`, and call `preventDefault` method at the beginning of the function:

```javascript
const deleteCookie = (event, cookieId) => {
  event.preventDefault();
  const updatedCookies = _cookies.filter((cookie) => cookie.id !== +cookieId);
  setCookies(updatedCookies);
};
```

5. Voila! It's working!

6. Let's fix it in `CookieDetail` too:

```jsx
<DeleteButton onClick={(event) => props.deleteCookie(event, cookie.id)}>
  Delete
</DeleteButton>
```

7. We still have a problem, when we delete a cookie in the detail page we need to move back to `/cookies`. To do that we need to fix `deleteCookie`.

8. In `deleteCookie`, we need to go to `/` after deleting the cookie. We need some kind of routing method. We can find many different methods in the hook `useHistory`. Let's import it:

```javascript
import { useHistory } from "react-router-dom";
```

9. `useHistory` returns an object that has different methods:

```javascript
function App() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [_cookies, setCookies] = useState(cookies);
  const history = useHistory();
```

10. The method that takes us from one route to another is called `push`, and you pass the route that you want to render:

```javascript
const deleteCookie = (event, cookieId) => {
  event.preventDefault();
  const updatedCookies = _cookies.filter((cookie) => cookie.id !== +cookieId);
  setCookies(updatedCookies);
  history.push("/cookies");
};
```

11. Let's try it again.

## Step 8: UI

1. Let's add our shop's logo:

```jsx
<Link to="/">
  <img src={logo} width="50" />
</Link>
<Link to="/cookies" style={{ margin: 10 }}>
  Cookies
</Link>
```

2. Hmmm.. there are too many elements. Let's create a new component called `NavBar.js`:

```javascript
import React from "react";

const NavBar = (props) => {
  return (

  );
};

export default NavBar;
```

3. Import `Link` and `ThemeButton`, and move your `Home` and `Cookies` links and the dark mode button:

```javascript
import React from "react";
import { Link } from "react-router-dom";

// Styling
import { ThemeButton } from "../styles";

const NavBar = (props) => {
  return (
    <div>
      <Link to="/">
        <img src={logo} width="50" />
      </Link>
      <Link to="/cookies" style={{ margin: 10 }}>
        Cookies
      </Link>
      <ThemeButton onClick={toggleTheme}>
        {currentTheme === "light" ? "Dark" : "Light"} Mode
      </ThemeButton>
    </div>
  );
};

export default NavBar;
```

4. `ThemeButton` needs `toggleTheme` and `currentTheme`, so we will pass them as props from `App`:

```jsx
<NavBar currentTheme={currentTheme} toggleTheme={toggleTheme} />
```

5. Let's pass `props` to `ThemeButton`:

```jsx
<ThemeButton onClick={props.toggleTheme}>
  {props.currentTheme === "light" ? "Dark" : "Light"} Mode
</ThemeButton>
```

6. Let's turn the parent `div` into a styled component. In `styles`:

```javascript
const Nav = styled.div`
  margin: 1.25em;
`;
```

7. Import it and wrap your JSX in `NavBar` with it:

```jsx
<Nav>
  <Link to="/" style={{ padding: 10, textDecoration: "none" }}>
    <img src={logo} width="50" />
  </Link>
  <Link to="/cookies" style={{ padding: 10, textDecoration: "none" }}>
    Cookies
  </Link>
  <ThemeButton onClick={props.toggleTheme}>
    {props.currentTheme === "light" ? "Dark" : "Light"} Mode
  </ThemeButton>
</Nav>
```

8. Remove the `margin` from `ThemeButton`:

```javascript
const ThemeButton = styled.button`
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.backgroundColor};
`;
```

9. Let's move the cookies and dark mode to the right side, I'll wrap them with a `div` tag first:

```jsx
<div>
  <Link to="/cookies" style={{ padding: 10 }}>
    Cookies
  </Link>
  <ThemeButton onClick={props.toggleTheme}>
    {props.currentTheme === "light" ? "Dark" : "Light"} Mode
  </ThemeButton>
</div>
```

10. Then we'll style `div` to be on the right side within `Nav`:

```javascript
const Nav = styled.div`
  margin: 1.25em;

  div {
    float: right;
  }
`;
```

11. Now, let's style our image `Link`. But `Link` is a component, styling it is a bit different. In `styles`, we will import `Link`:

```javascript
import { Link } from "react-router-dom";
```

12. Let's style our logo. To turn a component to a styled component we will wrap it in parentheses:

```javascript
export const Logo = styled(Link)`
  padding: 0.75em;

  img {
    width: 50px;
  }
`;
```

## Step 9: UI - NavLink

1. Now, when the user clicks on `Cookies`, we need some indication that `Cookies` is active. To do that, we will replace `Link` with `NavLink`. Let's import it:

```javascript
import { Link, NavLink } from "react-router-dom";
```

2. In `NavBar`, replace `Link` with `NavLink`.

```jsx
<NavLink to="/cookies" style={{ padding: 10 }}>
  Cookies
</NavLink>
```

3. The only difference between them is that we can give `NavLink` a style when it's active. Let's move the styling to `styles`. Import `NavLink` in `styles`:

```javascript
import { Link, NavLink } from "react-router-dom";
```

4. We'll create a styled component called `NavItem`. As you can see, the links' styling is ruined, so we will give it a `color` and remove the `text-decoration`:

```javascript
export const NavItem = styled(NavLink)`
  padding: 0.25em 1em;
  text-decoration: none;
  color: ${(props) => props.theme.mainColor};
`;
```

5. Now we add a class called `active`, which is the style we want to implement:

```javascript
export const NavItem = styled(NavLink)`
  padding: 0.25em 1em;
  text-decoration: none;
  color: ${(props) => props.theme.mainColor};

  &.active {
    color: ${(props) => props.theme.pink};
    background-color: fuchsia;
  }
`;
```

6. Now whenever, we go to `/cookies` you'll see that the `cookies` button is glowing with the `fuchsia`. Let's remove the fuchsia background color, it's killing me.

## Step 10 - Cookie Item

1. Let's cleanup `CookieItem` a bit. Since `Link` has no styling, why not just turn `CookieWrapper` to a `Link` instead of a `div` in `styles`?

```javascript
export const CookieWrapper = styled(Link)``;
```

2. Let's remove the ugly lines and give the cookie name the main color:

```javascript
export const CookieWrapper = styled(Link)`
  margin: 20px;
  color: ${(props) => props.theme.mainColor};
  text-decoration: none;

```
