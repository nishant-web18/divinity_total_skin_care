The one site header — white, sticky, 24px vertical padding, holding the persistent outlined "Book a Call".

```jsx
<TopNav active="Product" onNavigate={setPage} onCta={openBooking} />
```

- Links are 14px weight 500 in Canopy Green; the active one is underlined at 2px.
- The right cluster is always EN → Log in → `Button variant="nav"`.
- Keep it borderless: the colour change of the band underneath does the separating.
