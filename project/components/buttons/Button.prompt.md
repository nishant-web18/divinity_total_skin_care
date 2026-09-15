The pill button of the system — use `primary` for the one coral conversion action per section and always place a ghost twin beside it.

```jsx
<div style={{ display: "flex", gap: 12 }}>
  <Button variant="primary" size="lg">Book a Call</Button>
  <Button variant="ghostOnDark" size="lg">Take a tour</Button>
</div>
```

- `variant="primary"` — #ff643b fill, white 16px/600. Never use coral for anything else.
- `variant="ghost"` / `"ghostOnDark"` — transparent with a 1px black / white border, weight 500.
- `variant="nav"` — white fill, 1px black border, 14px; the persistent header "Book a Call".
- `variant="cream"` — cream fill on dark green surfaces (notification cards).
- All variants are radius 40px with no shadow. Hover darkens or tints; nothing moves.
