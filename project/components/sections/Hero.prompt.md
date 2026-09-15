The signature section — full-bleed forest green, enormous headline, one coral CTA, product visual layered over a portrait.

```jsx
<Hero
  headline={<>Turn <span style={{ color: "var(--color-leaf-bright)" }}>chat</span> into care</>}
  body="Reach every patient on the messaging app they already use."
  primaryLabel="Book a Call"
  secondaryLabel="Take a tour"
  visual={<HeroComposition />}
  footer={<LogoStrip label="In partnership with" items={["UNICEF", "Praekelt"]} align="flex-start" />}
/>
```

- Headline 69-80px weight 500, tracking -0.028em, one word recoloured.
- Body 18px in Mint Wash, max-width 480px. Exactly one coral button.
- No card chrome on the visual: let the mockup and photo overlap directly.
