import React from "react";

/* Divinity Total Skin Care logo.

   RECONSTRUCTION — redrawn by eye from a screenshot of the clinic's logo, because the
   original vector was never supplied. Geometry and colours are close but not exact, and
   the wordmark is set in DM Sans rather than the original face. Replace this with the
   clinic's real file before launch; every consumer goes through this one component.

   Inlined rather than loaded from assets/ so the same markup works when the kit is
   served from project/ and when it is assembled flat into dist/ — no path rewriting. */

const NAVY = "#1B3A5F";
const BLUE = "#2E6FB7";
const CYAN = "#1CADE4";
const PALE = "#A5DCF0";
const RED = "#EE4036";
const WORD_FACE = "'DM Sans','Poppins','Montserrat',system-ui,sans-serif";

function Arcs({ tone }) {
  const fills = tone === "mono" ? [tone, tone, tone, tone] : [NAVY, BLUE, CYAN, PALE];
  const c = tone === "mono" ? "currentColor" : null;
  return (
    <g>
      <path fill={c || fills[0]} d="M60 126 C 158 52, 300 16, 462 20 C 320 40, 184 80, 84 136 Z" opacity={c ? 1 : 1} />
      <path fill={c || fills[1]} d="M76 156 C 168 92, 296 62, 442 66 C 314 82, 196 116, 100 166 Z" opacity={c ? 0.8 : 1} />
      <path fill={c || fills[2]} d="M94 186 C 178 130, 292 104, 422 108 C 306 122, 204 152, 118 196 Z" opacity={c ? 0.6 : 1} />
      <path fill={c || fills[3]} d="M112 216 C 190 166, 288 144, 402 148 C 300 160, 212 186, 136 226 Z" opacity={c ? 0.4 : 1} />
    </g>
  );
}

export function Logo(props) {
  const height = props.height || 44;
  const tone = props.tone; /* "mono" renders in currentColor, for dark bands */
  const wordFill = tone === "mono" ? "currentColor" : NAVY;
  const tagFill = tone === "mono" ? "currentColor" : "#29ABE2";
  const crossFill = tone === "mono" ? "currentColor" : RED;
  const label = "Divinity Total Skin Care";

  if (props.variant === "mark") {
    return (
      <svg viewBox="40 0 442 246" height={height} role="img" aria-label={label} style={props.style}>
        <title>{label}</title>
        <Arcs tone={tone} />
      </svg>
    );
  }

  if (props.variant === "stacked") {
    return (
      <svg viewBox="0 0 520 400" height={height} role="img" aria-label={label} style={props.style}>
        <title>{label}</title>
        <Arcs tone={tone} />
        <text x="260" y="344" textAnchor="middle" fontFamily={WORD_FACE} fontSize="96" fontWeight="700" letterSpacing="-2" fill={wordFill}>
          div&#x131;nity
        </text>
        <path fill={crossFill} transform="translate(221.6,226) scale(0.85)" d="M0 0 h13 v-13 h13 v13 h13 v13 h-13 v13 h-13 v-13 h-13 Z" />
        <text x="260" y="390" textAnchor="middle" fontFamily={WORD_FACE} fontSize="24" fontWeight="600" letterSpacing="3.5" fill={tagFill}>
          Total Skin Care
        </text>
      </svg>
    );
  }

  /* Horizontal lockup — the only shape that stays legible in a 44px header row. */
  return (
    <svg viewBox="0 0 545 170" height={height} role="img" aria-label={label} style={props.style}>
      <title>{label}</title>
      <g transform="translate(-16.9,34) scale(0.448)">
        <Arcs tone={tone} />
      </g>
      <text x="212" y="112" fontFamily={WORD_FACE} fontSize="78" fontWeight="700" letterSpacing="-1.6" fill={wordFill}>
        div&#x131;nity
      </text>
      <path fill={crossFill} transform="translate(340.3,17.8) scale(0.66)" d="M0 0 h13 v-13 h13 v13 h13 v13 h-13 v13 h-13 v-13 h-13 Z" />
      <text x="214" y="148" fontFamily={WORD_FACE} fontSize="19.5" fontWeight="600" letterSpacing="2.9" fill={tagFill}>
        Total Skin Care
      </text>
    </svg>
  );
}
