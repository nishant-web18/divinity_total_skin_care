The product visualisation of the system — a chat thread in a phone frame, layered over photography in the hero.

```jsx
<PhoneMockup
  contact="Khayelitsha Clinic"
  messages={[
    { direction: "in", sender: "Sister Naledi", text: "Your check-up is Tuesday 10:30." },
    { direction: "out", text: "Confirmed, thank you." },
  ]}
/>
```

- Header is Canopy Green, chat body white, radius 24px, 1px Frost Gray edge, no shadow.
- Overlap it with a PhotoFrame in heroes rather than giving it card chrome.
