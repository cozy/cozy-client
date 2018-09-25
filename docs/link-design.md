# Cozy Link

Cozy Link is a simple yet powerful way to describe how you want to get the result of a query. Think of it as a sort of "middleware".

Links are units that you can chain together to define how each query should be handled: this allows us to use different sources of data, or to control the request lifecycle in a way that makes sense for your app. The first link operates on an operation object and each subsequent link operates on the result of the previous link:

![links chain](./cozy-client-links.png)

In the chain example pictured above, the Dedup link would avoid re-fetching the same query, the PouchDB link would try to get the data from a local Pouch instance, and fallback to the Stack link, assisted by the Retry link that will try to fetch again the query in case of a network error.
