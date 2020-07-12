# Sharing URL

## Discussion

**Topics to discuss:**

- Routers
- Link vs NavLink
- Route Parameters

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

2. In `CookieDetail`, we will `find` the cookie according to the ID of the cookie we clicked on. But, for now we're only looking for the cookie with ID 1 which is the first element in our `cookies` array.

```javascript
const cookie = props.cookies[0];
```

3. Now, let's create a route for `CookieDetail` for the cookie with ID #1. As agreed, we'll put it above `/cookies`.

```jsx
<Route path="/cookies/1">
  <CookieDetail cookies={_cookies} deleteCookie={deleteCookie} />
</Route>
```

4. In `CookieItem`, we'll add a `Link` around the `img` tag that takes us to `/cookies/1`. Remove the `onClick`, we don't need anymore.

```jsx
<Link to="/cookies/1">
  <img alt={cookie.name} src={cookie.image} />
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
  <img alt={cookie.name} src={cookie.image} />
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

9. Let's use `cookieId` to `find` our cookie:

```javascript
const cookieId = useParams().cookieId;
const cookie = props.cookies.find((cookie) => cookie.id === cookieId);
```

10. It didn't work! That's because `cookieId` is a string, and `cookie.id` is an integer. To turn `cookieId` to an integer we can add a `+` before it

```javascript
const cookieId = useParams().cookieId;
const cookie = props.cookies.find((cookie) => cookie.id === +cookieId);
```

11. It's working! Now we can delete `selectCookie` from all our components. Yaaay!
