# Sharing URL

## Discussion

**Topics to discuss:**

- Routers
- Link
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
