Persistent deadline / announcement card — pin it bottom-right with `fixed` and let it float over all sections.

```jsx
<NotificationCard
  fixed
  title="Health Accelerator 2026"
  subtitle="Application deadline 31 May"
  countdown={["24d", "5h", "1m", "45s"]}
  ctaLabel="Apply now"
  onClose={dismiss}
/>
```

- Canopy Green fill, 16/20 padding, radius 16px; subtitle in Mint Wash.
- Countdown blocks are tabular 12px/600 on a 10% white tint.
- CTA is the cream variant — coral would fight the green.
