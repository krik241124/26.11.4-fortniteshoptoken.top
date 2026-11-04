/** Original editorial illustration, not an in-game item render. */
export default function TokenArtwork() {
  return (
    <div className="token-artwork">
      <svg viewBox="0 0 480 490" fill="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="tokenMetal" x1="137" y1="116" x2="340" y2="357" gradientUnits="userSpaceOnUse"><stop stopColor="#f1e4a2" /><stop offset=".28" stopColor="#b6ab69" /><stop offset=".54" stopColor="#71622e" /><stop offset=".8" stopColor="#c7bd7a" /><stop offset="1" stopColor="#847435" /></linearGradient>
          <linearGradient id="tokenFace" x1="170" y1="146" x2="320" y2="331" gradientUnits="userSpaceOnUse"><stop stopColor="#344036" /><stop offset="1" stopColor="#101a15" /></linearGradient>
          <radialGradient id="tokenGlow"><stop stopColor="#b4d85b" stopOpacity=".16" /><stop offset="1" stopColor="#b4d85b" stopOpacity="0" /></radialGradient>
          <pattern id="chartGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" stroke="#9aaf98" strokeOpacity=".07" /></pattern>
        </defs>
        <rect x="20" y="20" width="440" height="420" fill="url(#chartGrid)" />
        <circle cx="242" cy="240" r="220" fill="url(#tokenGlow)" />
        <circle cx="242" cy="240" r="186" stroke="#6b806b" strokeOpacity=".27" />
        <circle cx="242" cy="240" r="163" stroke="#6b806b" strokeOpacity=".35" strokeDasharray="3 9" />
        <path d="M242 40v34m0 332v34M42 240h34m332 0h34" stroke="#8a9d79" strokeOpacity=".55" />
        <path d="m97 96 23 23m244 244 23 23m0-290-23 23M120 363l-23 23" stroke="#6c8066" strokeOpacity=".4" />
        <text x="242" y="39" textAnchor="middle" fill="#9eb294" fontSize="11" fontFamily="monospace" letterSpacing="2">N</text>
        <text x="242" y="464" textAnchor="middle" fill="#71846e" fontSize="10" fontFamily="monospace" letterSpacing="3">FIELD NOTES / 001</text>
        <g transform="rotate(-12 242 240)">
          <circle cx="242" cy="250" r="121" fill="#050b07" opacity=".6" />
          <path d="M242 116a124 124 0 1 1 0 248 124 124 0 0 1 0-248Z" fill="url(#tokenMetal)" />
          <circle cx="242" cy="240" r="119" stroke="#ecdea3" strokeOpacity=".65" />
          <circle cx="242" cy="240" r="108" stroke="#302d15" strokeWidth="5" />
          <circle cx="242" cy="240" r="105" fill="url(#tokenFace)" stroke="#c8bd7b" strokeWidth="2" />
          <circle cx="242" cy="240" r="95" stroke="#b2a664" strokeOpacity=".5" strokeDasharray="1 7" strokeWidth="4" />
          <path d="m242 149 10 34h-20l10-34Zm0 182-10-34h20l-10 34ZM151 240l34-10v20l-34-10Zm182 0-34 10v-20l34 10Z" fill="#b6ad72" />
          <path d="m190 287 103-103m-112 93 19 19m83-122 19 19m-9 94L190 184m112 93-19 19m-83-122-19 19" stroke="#b6ad72" strokeWidth="5" strokeLinecap="square" />
          <path d="M242 190c-25 0-41 17-41 39 0 18 9 27 20 34v20h42v-20c11-7 20-16 20-34 0-22-16-39-41-39Z" fill="#cfc58c" stroke="#172219" strokeWidth="7" />
          <path d="m214 224 21 5-3 16-16-4-2-17Zm56 0-21 5 3 16 16-4 2-17Z" fill="#172219" />
          <path d="m242 244-6 12h12l-6-12Z" fill="#172219" />
          <path d="M232 269v13m10-13v13m10-13v13" stroke="#172219" strokeWidth="4" />
          <path d="M171 160a108 108 0 0 1 115-19" stroke="#fff2bd" strokeWidth="2" strokeLinecap="round" opacity=".75" />
        </g>
        <path d="M322 133h52l23-23h39" stroke="#b4cd77" strokeOpacity=".65" />
        <circle cx="322" cy="133" r="3" fill="#cfef73" />
        <text x="437" y="99" textAnchor="end" fill="#cfef73" fontSize="10" fontFamily="monospace" letterSpacing="2">THE RARE FIND</text>
        <path d="M137 329H83l-22 22H24" stroke="#718469" />
        <circle cx="137" cy="329" r="3" fill="#8ea47b" />
        <text x="24" y="371" fill="#9caf8f" fontSize="10" fontFamily="monospace" letterSpacing="1.5">KEEP EXPLORING</text>
        <path d="M61 76h12m-6-6v12m330 292h12m-6-6v12" stroke="#cfef73" strokeOpacity=".7" />
      </svg>
      <p className="art-caption">Original illustration · not an in-game screenshot</p>
    </div>
  )
}
