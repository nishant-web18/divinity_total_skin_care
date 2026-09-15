Tinted feature card for 2-column feature grids — text on top, a product graphic below.

```jsx
<PastelCard index={0} title="Cut no-shows by 40%" body="Reminders land where patients already are." >
  <ProductCard><PhoneMockup messages={msgs} /></ProductCard>
</PastelCard>
```

- 32px padding, radius 24px, no border, no shadow.
- Title 32px weight 700 in the tone’s heading colour; body 16px Graphite.
- In a grid, pass `index` so the six pastels rotate rather than repeat.
