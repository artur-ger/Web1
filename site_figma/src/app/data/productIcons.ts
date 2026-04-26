// SVG иконки для разных типов ламп
export const productIcons = {
  led1: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="160" r="70" fill="url(#ledGrad1)" opacity="0.3"/>
      <ellipse cx="200" cy="160" rx="45" ry="60" fill="url(#ledGrad1)"/>
      <rect x="180" y="220" width="40" height="60" fill="#71717a" rx="5"/>
      <rect x="170" y="280" width="60" height="8" fill="#52525b"/>
      <rect x="175" y="288" width="50" height="15" fill="#3f3f46"/>
      <path d="M 160 140 L 140 120 M 160 160 L 135 160 M 160 180 L 140 200" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <path d="M 240 140 L 260 120 M 240 160 L 265 160 M 240 180 L 260 200" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    </svg>
  `)}`,

  led2: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="160" r="75" fill="url(#ledGrad2)" opacity="0.2"/>
      <circle cx="200" cy="160" r="50" fill="url(#ledGrad2)"/>
      <rect x="185" y="210" width="30" height="50" fill="#71717a" rx="4"/>
      <rect x="175" y="260" width="50" height="10" fill="#52525b"/>
      <rect x="180" y="270" width="40" height="20" fill="#3f3f46"/>
      <circle cx="200" cy="160" r="25" fill="#fef3c7" opacity="0.6"/>
    </svg>
  `)}`,

  led3: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#a78bfa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <path d="M 200 100 L 240 170 L 160 170 Z" fill="url(#ledGrad3)" opacity="0.3" transform="translate(0, 10)"/>
      <path d="M 200 110 L 230 160 L 170 160 Z" fill="url(#ledGrad3)"/>
      <rect x="185" y="160" width="30" height="70" fill="#71717a" rx="3"/>
      <rect x="175" y="230" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="238" width="40" height="18" fill="#3f3f46"/>
      <circle cx="200" cy="135" r="15" fill="#fef3c7" opacity="0.5"/>
    </svg>
  `)}`,

  led4: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#34d399;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <ellipse cx="200" cy="150" rx="55" ry="65" fill="url(#ledGrad4)" opacity="0.3"/>
      <ellipse cx="200" cy="150" rx="40" ry="50" fill="url(#ledGrad4)"/>
      <rect x="182" y="200" width="36" height="55" fill="#71717a" rx="4"/>
      <rect x="172" y="255" width="56" height="9" fill="#52525b"/>
      <rect x="177" y="264" width="46" height="16" fill="#3f3f46"/>
      <ellipse cx="200" cy="150" rx="20" ry="25" fill="#d1fae5" opacity="0.6"/>
      <path d="M 165 130 L 150 115 M 165 150 L 145 150 M 165 170 L 150 185" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <path d="M 235 130 L 250 115 M 235 150 L 255 150 M 235 170 L 250 185" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
    </svg>
  `)}`,

  led5: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="155" r="68" fill="url(#ledGrad5)" opacity="0.25"/>
      <rect x="160" y="130" width="80" height="50" fill="url(#ledGrad5)" rx="25" opacity="0.9"/>
      <rect x="185" y="180" width="30" height="60" fill="#71717a" rx="3"/>
      <rect x="175" y="240" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="248" width="40" height="18" fill="#3f3f46"/>
      <circle cx="200" cy="155" r="30" fill="#fef3c7" opacity="0.5"/>
      <rect x="170" y="145" width="15" height="3" fill="#18181b" opacity="0.3"/>
      <rect x="215" y="145" width="15" height="3" fill="#18181b" opacity="0.3"/>
    </svg>
  `)}`,

  led6: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad6" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#db2777;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <rect x="120" y="140" width="160" height="80" fill="url(#ledGrad6)" rx="8" opacity="0.9"/>
      <rect x="140" y="160" width="120" height="40" fill="#fce7f3" opacity="0.3"/>
      <rect x="185" y="220" width="30" height="40" fill="#71717a" rx="3"/>
      <rect x="175" y="260" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="268" width="40" height="15" fill="#3f3f46"/>
      <circle cx="160" cy="180" r="8" fill="#fef3c7" opacity="0.7"/>
      <circle cx="200" cy="180" r="8" fill="#fef3c7" opacity="0.7"/>
      <circle cx="240" cy="180" r="8" fill="#fef3c7" opacity="0.7"/>
    </svg>
  `)}`,

  led7: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad7" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ea580c;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glow7">
          <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="200" r="90" fill="url(#glow7)"/>
      <ellipse cx="200" cy="140" rx="42" ry="55" fill="url(#ledGrad7)"/>
      <line x1="175" y1="195" x2="175" y2="240" stroke="#f59e0b" stroke-width="4"/>
      <line x1="200" y1="195" x2="200" y2="240" stroke="#f59e0b" stroke-width="4"/>
      <line x1="225" y1="195" x2="225" y2="240" stroke="#f59e0b" stroke-width="4"/>
      <rect x="185" y="240" width="30" height="35" fill="#71717a" rx="3"/>
      <rect x="175" y="275" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="283" width="40" height="15" fill="#3f3f46"/>
    </svg>
  `)}`,

  led8: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ledGrad8" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <path d="M 200 110 L 245 180 L 155 180 Z" fill="url(#ledGrad8)" opacity="0.9"/>
      <rect x="185" y="180" width="30" height="65" fill="#71717a" rx="3"/>
      <rect x="175" y="245" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="253" width="40" height="18" fill="#3f3f46"/>
      <circle cx="200" cy="145" r="18" fill="#cffafe" opacity="0.6"/>
      <path d="M 170 130 L 155 110 M 170 155 L 150 160 M 180 175 L 165 190" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
      <path d="M 230 130 L 245 110 M 230 155 L 250 160 M 220 175 L 235 190" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
    </svg>
  `)}`,

  incandescent: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bulbGlow">
          <stop offset="0%" style="stop-color:#fef3c7;stop-opacity:1" />
          <stop offset="70%" style="stop-color:#fbbf24;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="200" r="110" fill="url(#bulbGlow)"/>
      <ellipse cx="200" cy="145" rx="48" ry="62" fill="#fef3c7" opacity="0.3"/>
      <ellipse cx="200" cy="145" rx="42" ry="56" fill="none" stroke="#fbbf24" stroke-width="2"/>
      <path d="M 190 180 Q 195 160 200 140 Q 205 160 210 180" stroke="#f59e0b" stroke-width="3" fill="none"/>
      <path d="M 185 185 Q 192 165 200 145 Q 208 165 215 185" stroke="#fbbf24" stroke-width="2" fill="none" opacity="0.7"/>
      <rect x="185" y="207" width="30" height="50" fill="#71717a" rx="3"/>
      <rect x="180" y="252" width="40" height="6" fill="#52525b"/>
      <rect x="180" y="258" width="40" height="6" fill="#52525b"/>
      <rect x="180" y="264" width="40" height="6" fill="#52525b"/>
      <rect x="175" y="270" width="50" height="15" fill="#3f3f46"/>
    </svg>
  `)}`,

  fluorescent: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fluoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#e0f2fe;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#bae6fd;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e0f2fe;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <rect x="100" y="170" width="200" height="35" fill="url(#fluoGrad)" rx="17" opacity="0.9"/>
      <rect x="105" y="175" width="190" height="25" fill="#f0f9ff" rx="12" opacity="0.4"/>
      <rect x="95" y="205" width="15" height="20" fill="#71717a" rx="2"/>
      <rect x="290" y="205" width="15" height="20" fill="#71717a" rx="2"/>
      <line x1="120" y1="187" x2="280" y2="187" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
    </svg>
  `)}`,

  fluorescent2: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fluoGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#ddd6fe;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#c4b5fd;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ddd6fe;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <path d="M 180 100 Q 200 130 220 100 Q 220 240 220 260 Q 200 280 180 260 Q 180 240 180 100" fill="url(#fluoGrad2)" opacity="0.9"/>
      <ellipse cx="200" cy="103" rx="20" ry="8" fill="#a78bfa" opacity="0.6"/>
      <ellipse cx="200" cy="257" rx="20" ry="8" fill="#a78bfa" opacity="0.6"/>
      <rect x="185" y="260" width="30" height="20" fill="#71717a" rx="3"/>
      <rect x="175" y="280" width="50" height="15" fill="#3f3f46"/>
    </svg>
  `)}`,

  accessory1: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#18181b"/>
      <rect x="130" y="140" width="140" height="100" fill="#52525b" rx="8"/>
      <rect x="145" y="155" width="110" height="70" fill="#3f3f46" rx="5"/>
      <circle cx="200" cy="190" r="25" fill="#71717a"/>
      <circle cx="200" cy="190" r="18" fill="#27272a"/>
      <rect x="185" y="180" width="30" height="20" fill="#fbbf24" rx="3"/>
      <line x1="170" y1="190" x2="185" y2="190" stroke="#a1a1aa" stroke-width="3"/>
      <line x1="215" y1="190" x2="230" y2="190" stroke="#a1a1aa" stroke-width="3"/>
      <rect x="180" y="240" width="40" height="35" fill="#71717a" rx="3"/>
      <rect x="175" y="275" width="50" height="15" fill="#3f3f46"/>
    </svg>
  `)}`,

  accessory2: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="180" r="55" fill="#52525b"/>
      <circle cx="200" cy="180" r="45" fill="#3f3f46"/>
      <circle cx="200" cy="180" r="30" fill="#27272a"/>
      <circle cx="200" cy="180" r="20" fill="#fbbf24"/>
      <rect x="185" y="235" width="30" height="40" fill="#71717a" rx="3"/>
      <rect x="175" y="270" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="278" width="40" height="15" fill="#3f3f46"/>
      <path d="M 200 155 L 200 135 M 200 205 L 200 225" stroke="#a1a1aa" stroke-width="3" stroke-linecap="round"/>
      <path d="M 175 180 L 155 180 M 225 180 L 245 180" stroke="#a1a1aa" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `)}`,

  panel: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <rect x="110" y="120" width="180" height="160" fill="url(#panelGrad)" rx="5"/>
      <rect x="120" y="130" width="160" height="140" fill="#fef3c7" opacity="0.4"/>
      <circle cx="140" cy="150" r="6" fill="#fbbf24" opacity="0.8"/>
      <circle cx="170" cy="150" r="6" fill="#fbbf24" opacity="0.8"/>
      <circle cx="200" cy="150" r="6" fill="#fbbf24" opacity="0.8"/>
      <circle cx="230" cy="150" r="6" fill="#fbbf24" opacity="0.8"/>
      <circle cx="260" cy="150" r="6" fill="#fbbf24" opacity="0.8"/>
    </svg>
  `)}`,

  smart: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rgbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
          <stop offset="33%" style="stop-color:#22c55e;stop-opacity:1" />
          <stop offset="66%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ef4444;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="155" r="70" fill="url(#rgbGrad)" opacity="0.3"/>
      <circle cx="200" cy="155" r="50" fill="url(#rgbGrad)" opacity="0.7"/>
      <circle cx="200" cy="155" r="30" fill="#fef3c7" opacity="0.5"/>
      <rect x="185" y="205" width="30" height="50" fill="#71717a" rx="3"/>
      <rect x="175" y="255" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="263" width="40" height="18" fill="#3f3f46"/>
      <path d="M 165 135 L 145 115 M 165 155 L 140 155 M 165 175 L 145 195" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
      <path d="M 235 135 L 255 115 M 235 155 L 260 155 M 235 175 L 255 195" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
    </svg>
  `)}`,

  strip: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.8" />
          <stop offset="25%" style="stop-color:#f59e0b;stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:#22c55e;stop-opacity:0.8" />
          <stop offset="75%" style="stop-color:#3b82f6;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#a855f7;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <rect x="80" y="175" width="240" height="30" fill="#3f3f46" rx="4"/>
      <rect x="85" y="180" width="230" height="20" fill="url(#stripGrad)" rx="3"/>
      <circle cx="110" cy="190" r="4" fill="#fef3c7" opacity="0.8"/>
      <circle cx="150" cy="190" r="4" fill="#fef3c7" opacity="0.8"/>
      <circle cx="190" cy="190" r="4" fill="#fef3c7" opacity="0.8"/>
      <circle cx="230" cy="190" r="4" fill="#fef3c7" opacity="0.8"/>
      <circle cx="270" cy="190" r="4" fill="#fef3c7" opacity="0.8"/>
      <rect x="75" y="205" width="20" height="15" fill="#52525b" rx="2"/>
      <rect x="305" y="205" width="20" height="15" fill="#52525b" rx="2"/>
    </svg>
  `)}`,

  desk: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="deskGlow">
          <stop offset="0%" style="stop-color:#fef3c7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <ellipse cx="200" cy="120" rx="80" ry="15" fill="url(#deskGlow)" opacity="0.5"/>
      <rect x="190" y="120" width="20" height="120" fill="#71717a" rx="3"/>
      <ellipse cx="200" cy="240" rx="50" ry="12" fill="#52525b"/>
      <rect x="140" y="80" width="120" height="40" fill="#3f3f46" rx="5"/>
      <rect x="150" y="85" width="100" height="30" fill="#fef3c7" opacity="0.3" rx="3"/>
      <circle cx="200" cy="100" r="8" fill="#fbbf24" opacity="0.7"/>
    </svg>
  `)}`,

  sensor: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#18181b"/>
      <circle cx="200" cy="155" r="68" fill="#3b82f6" opacity="0.2"/>
      <ellipse cx="200" cy="155" rx="45" ry="55" fill="#60a5fa" opacity="0.8"/>
      <rect x="185" y="210" width="30" height="50" fill="#71717a" rx="3"/>
      <rect x="175" y="260" width="50" height="8" fill="#52525b"/>
      <rect x="180" y="268" width="40" height="18" fill="#3f3f46"/>
      <circle cx="200" cy="155" r="25" fill="#dbeafe" opacity="0.6"/>
      <path d="M 185 140 A 20 20 0 0 1 215 140" stroke="#fbbf24" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M 180 128 A 28 28 0 0 1 220 128" stroke="#fbbf24" stroke-width="2.5" fill="none" opacity="0.6"/>
      <path d="M 175 118 A 35 35 0 0 1 225 118" stroke="#fbbf24" stroke-width="2" fill="none" opacity="0.4"/>
    </svg>
  `)}`,

  pendant: `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pendantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#71717a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#52525b;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#18181b"/>
      <rect x="195" y="80" width="10" height="60" fill="#3f3f46"/>
      <circle cx="200" cy="80" r="8" fill="#52525b"/>
      <path d="M 200 140 L 260 220 L 140 220 Z" fill="url(#pendantGrad)" opacity="0.9"/>
      <ellipse cx="200" cy="220" rx="60" ry="10" fill="#27272a"/>
      <circle cx="200" cy="180" r="35" fill="#fef3c7" opacity="0.3"/>
      <circle cx="200" cy="180" r="20" fill="#fbbf24" opacity="0.5"/>
    </svg>
  `)}`,
};
