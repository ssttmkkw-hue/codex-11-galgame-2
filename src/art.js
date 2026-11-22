const ink = '#211929';

const designs = {
  mio: {
    hair: ['#38222f', '#854960', '#4b263d'], eyes: '#9d5576', skin: ['#ffded1', '#c78391'],
    cloth: ['#b87487', '#492d47'], lining: '#ffd4dc', under: '#302336',
    silhouette: 'M104 126C96 64 149 34 190 37 243 28 280 54 291 120L313 296Q308 333 279 360L210 327 144 354 81 321Q105 242 104 126Z',
    backLines: 'M114 138Q124 241 102 307M121 182Q134 265 119 328M275 147Q274 230 294 334M283 175Q280 240 303 311',
    bang: 'M112 157C96 89 126 46 177 36 228 27 274 54 285 102Q298 156 273 214L257 239 264 174Q251 153 245 122 221 114 199 78 169 115 130 132L126 159 134 216Q111 204 112 157Z',
    detail: 'M117 109Q133 62 187 50M123 119Q174 94 192 62M201 58Q224 101 256 112M216 53Q260 66 276 113M267 128Q280 157 272 197',
    collar: 'M142 237 170 255 195 287 156 332 110 289ZM248 234 224 258 200 287 250 335 288 278Z',
    seam: 'M125 305Q134 388 129 553M269 307Q266 407 278 553M87 389 122 407M286 397 329 371',
    accessory: 'camera',
  },
  ren: {
    hair: ['#332527', '#915236', '#402b30'], eyes: '#a7653c', skin: ['#ffd9b9', '#c28271'],
    cloth: ['#d5a15e', '#694351'], lining: '#ffcf94', under: '#352a31',
    silhouette: 'M115 146C93 87 130 34 189 34 245 33 280 67 290 119L283 207 301 249Q274 255 239 234L149 243Q118 256 99 235L115 191Z',
    backLines: 'M117 160Q124 202 111 235M274 159Q262 205 288 240',
    bang: 'M109 152C92 88 136 35 187 33 233 27 272 52 287 99Q296 128 273 179L260 190 259 139Q234 131 226 109 197 133 160 124L178 105Q146 118 130 147L127 190Q109 185 109 152Z',
    detail: 'M111 118Q126 67 182 48M123 113Q147 80 205 60M159 111Q196 90 223 69M225 63Q260 75 279 113M271 111 267 151',
    collar: 'M143 231 174 247 196 279 166 323 126 276ZM244 231 224 247 196 279 227 313 269 270Z',
    seam: 'M95 326 122 393 112 561M291 321 274 385 282 558M59 402 103 419M300 419 341 397',
    accessory: 'keys',
  },
  yui: {
    hair: ['#3b4067', '#989bca', '#4b4f86'], eyes: '#4e8bab', skin: ['#ffe1d9', '#bb849c'],
    cloth: ['#6d9cae', '#32375d'], lining: '#adf8ec', under: '#2b2a50',
    silhouette: 'M274 85Q313 58 328 92 343 126 337 164 314 133 287 145L277 231Q239 258 197 216L128 239Q102 229 101 191L106 118Q109 35 198 33 257 37 274 85Z',
    backLines: 'M287 99Q318 87 326 140M290 106Q317 108 329 151M112 147Q115 214 126 222M271 166Q261 215 250 231',
    bang: 'M111 160C97 108 115 53 165 38 205 22 259 38 281 85Q301 123 277 177L259 188 261 137 239 128 246 150Q214 145 202 102L195 135Q172 148 145 143L156 117 131 145 128 172Z',
    detail: 'M114 115Q141 64 179 55M143 115Q164 87 190 73M185 110Q193 95 199 70M214 68Q216 108 239 123M222 54Q263 64 281 106',
    collar: 'M132 237Q117 257 116 290L153 350 194 291 161 244ZM244 233Q278 239 282 274L249 337 207 285 230 247Z',
    seam: 'M91 310 119 381 112 554M293 312 275 390 278 552M65 365 119 387M277 389 329 368',
    accessory: 'headphones',
  },
  suzu: {
    hair: ['#28334c', '#536887', '#303953'], eyes: '#478073', skin: ['#ffe3ce', '#bc8390'],
    cloth: ['#8a939e', '#454f68'], lining: '#c1f0db', under: '#293c49',
    silhouette: 'M108 128C93 66 142 34 188 34 253 24 295 65 293 135L296 220Q283 254 297 295 285 337 250 365L144 337 97 305Q114 248 108 128Z',
    backLines: 'M114 146Q129 241 111 285M126 188Q136 274 124 319M277 151Q274 220 284 254',
    bang: 'M112 154C99 103 115 58 165 41 217 23 273 47 289 99Q303 139 279 185L259 207 264 143Q240 127 231 116L226 134Q181 138 143 127L128 161 132 191Q114 180 112 154Z',
    detail: 'M111 106Q128 64 181 52M129 108Q146 72 187 59M156 116Q171 89 182 78M188 119Q213 78 206 61M225 56Q255 67 276 106',
    collar: 'M145 229 178 253 198 285 155 319 117 275ZM242 229 219 255 198 285 233 311 275 267Z',
    seam: 'M91 326 126 396 115 558M294 314 267 406 285 553M67 404 123 426M274 421 334 386',
    accessory: 'braid',
  },
};

let instance = 0;

function eye(x, y, color, expression, flip) {
  const closed = expression === 'smile' || expression === 'wry';
  const wide = expression === 'surprise';
  const brow = expression === 'sad' ? 'M1 -10Q14 -19 35 -12' : expression === 'resolve' ? 'M1 -16Q18 -16 35 -8' : 'M1 -10Q14 -18 35 -13';
  const lid = wide ? 'M0 6Q12 -10 27 -4Q35 -2 39 8' : 'M0 6Q14 -5 28 -2Q36 0 39 8';
  return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
    <path d="${brow}" fill="none" stroke="#593745" stroke-width="2.3" stroke-linecap="round"/>
    ${closed ? '<path d="M0 9Q17 -6 36 7" fill="none" stroke="#382431" stroke-width="3.4" stroke-linecap="round"/><path d="M2 8 -5 4M33 5 39 3" stroke="#382431" stroke-width="1.7"/>' : `
      <path d="${lid}Q23 19 4 12Z" fill="#fff3ec" stroke="#724952" stroke-width="1.1"/>
      <ellipse cx="21" cy="7" rx="${wide ? 8 : 9.5}" ry="${wide ? 9.8 : 8.4}" fill="${color}"/>
      <ellipse cx="20" cy="6" rx="4.5" ry="6.8" fill="#29213b"/>
      <path d="M12 10Q21 17 29 9" stroke="#ffc3d5" stroke-opacity=".6" fill="none"/>
      <circle cx="17.7" cy="3.2" r="2.5" fill="#fff9ee"/><circle cx="25.3" cy="10" r="1.35" fill="#f9d9e2"/>
      <path d="${lid}M0 7 -5 3M2 4 -2 0" fill="none" stroke="#382331" stroke-width="2.65" stroke-linecap="round"/>`}
    </g>`;
}

function mouth(expression) {
  const paths = {
    neutral: 'M182 190Q191 188 197 190L203 188Q201 194 194 194Z',
    smile: 'M180 186Q194 191 208 183C203 196 191 201 180 186Z',
    wry: 'M182 191Q197 191 207 184 206 193 194 195Z',
    surprise: 'M186 193Q193 183 202 190Q207 199 195 200Q186 199 186 193Z',
    sad: 'M183 194Q194 187 205 193Q194 191 183 194Z',
    resolve: 'M183 192Q191 189 197 191L205 188Q203 194 195 195Z',
  };
  return `<path d="${paths[expression] || paths.neutral}" fill="#a45c68" stroke="#9a5263" stroke-width=".8"/>
    <path d="M188 199Q196 201 202 197" fill="none" stroke="#ffe7da" stroke-width="1.5" stroke-linecap="round"/>`;
}

function accessory(which, color) {
  switch (which) {
    case 'camera':
      return `<path d="M136 252 180 415M248 250 224 418" stroke="#261b2a" stroke-width="11"/>
        <path d="M137 253 180 411M247 250 222 414" stroke="#b77996" fill="none" stroke-width="2"/>
        <rect x="157" y="386" width="96" height="63" rx="6" fill="#292430" stroke="#1b1626" stroke-width="3"/>
        <path d="M162 385h15l8-12h25l8 12h29v12h-85z" fill="#d5b8c4"/>
        <circle cx="203" cy="418" r="22" fill="#67717f" stroke="#282235" stroke-width="3"/>
        <circle cx="203" cy="418" r="15" fill="#372b4f" stroke="#c2a5c6" stroke-width="1.4"/><path d="M194 410l12-3 5 6-12 10z" fill="#b985b3" opacity=".8"/>`;
    case 'keys':
      return `<path d="M118 268Q135 373 147 535M266 267Q253 388 238 550" stroke="#302634" stroke-width="17" fill="none"/>
        <path d="M143 349 176 347 175 374 150 379Z" fill="#382b38" stroke="#dbad82" stroke-width="1.4"/>
        <circle cx="270" cy="364" r="9" fill="none" stroke="#ffe0a2" stroke-width="3"/>
        <path d="M267 369 258 397l7 2 2-6 5 1 6-23M273 370l7 29 8-2-2-5 4-3-7-24" fill="#d4a865" stroke="#73553b" stroke-width="1.2"/>`;
    case 'headphones':
      return `<path d="M139 247Q129 291 169 311 223 336 252 264" fill="none" stroke="#252440" stroke-width="12"/>
        <path d="M142 248Q131 290 172 310 222 333 249 265" fill="none" stroke="#aaa3d6" stroke-width="4"/>
        <rect x="130" y="257" width="34" height="56" rx="13" transform="rotate(-32 147 285)" fill="#444778" stroke="${color}" stroke-width="2.5"/>
        <rect x="231" y="271" width="31" height="51" rx="12" transform="rotate(29 247 295)" fill="#444778" stroke="${color}" stroke-width="2.5"/>
        <path d="M243 289l9 5-12 11 3-8-6-4z" fill="${color}"/>
        <path d="M201 322 201 549" stroke="#a9dbe3" stroke-width="2" stroke-dasharray="3 3"/>`;
    case 'braid':
      return `<path d="M263 186Q294 208 280 247Q304 263 285 291Q303 324 275 344L281 363 257 375 254 350Q232 324 253 300 234 271 255 251 240 221 263 186Z" fill="#3b4763" stroke="${ink}" stroke-width="2"/>
      <path d="M261 208Q276 228 280 245L256 250Q278 263 285 290L254 300Q275 307 283 325L260 347" fill="none" stroke="#697c98" stroke-width="3"/>
      <path d="M253 348Q265 351 278 342L281 351Q268 362 253 357Z" fill="#b3d8be"/>`;
    default: return '';
  }
}

function outfit(d, warm) {
  if (!warm) return '';
  return `<path d="M142 230Q173 254 208 247L246 228Q263 237 260 269 223 303 157 283 135 267 142 230Z
    M203 276Q239 274 252 258L280 407 242 427Z" fill="${d.lining}" stroke="${ink}" stroke-width="2.1"/>
    <path d="M146 247Q195 276 255 242M149 263Q198 288 256 254M218 283 257 402M240 276 271 400" fill="none" stroke="${d.cloth[1]}" stroke-width="2" opacity=".52"/>
    <path d="M244 411 250 432M253 407 260 428M263 405 271 424M274 402 281 420" stroke="${d.lining}" stroke-width="3"/>`;
}

function arms(pose, id) {
  if (pose === 'offer') {
    return `<path d="M44 432Q31 397 51 364L108 325 123 364 88 408 160 426 153 478Q77 482 44 432Z" fill="url(#${id}coat)" stroke="${ink}" stroke-width="2.3"/>
      <path d="M140 415 159 418 175 430 198 432Q206 435 199 439L184 443 203 447Q211 451 202 454L184 454Q199 461 189 465L155 463 137 451Z" fill="url(#${id}skin)" stroke="${ink}" stroke-width="1.4"/>
      <path d="M132 418 149 420 142 467 122 463Z" fill="#49364d" stroke="${ink}" stroke-width="1.3"/>`;
  }
  if (pose === 'crossed') {
    return `<path d="M65 425Q89 403 119 402L282 432 268 478Q151 483 74 464Z" fill="url(#${id}coat)" stroke="${ink}" stroke-width="2.3"/>
      <path d="M330 422Q313 398 285 409L122 451 135 492Q267 486 326 461Z" fill="url(#${id}coat)" stroke="${ink}" stroke-width="2.3"/>
      <path d="M110 442Q101 437 104 427L124 421Q133 423 129 428L120 433 139 433 142 452 125 465Z" fill="url(#${id}skin)" stroke="${ink}" stroke-width="1.4"/>`;
  }
  return '';
}

export function portrait(character, expression = 'neutral', pose = 'still', warm = false) {
  const d = designs[character];
  if (!d) return '';
  const id = `p${++instance}`;
  const gradient = (name, stops) => `<linearGradient id="${id}${name}" x2=".35" y2="1" gradientUnits="objectBoundingBox">${stops.map((color, i) => `<stop offset="${i / (stops.length - 1)}" stop-color="${color}"/>`).join('')}</linearGradient>`;
  const freckles = character === 'ren' ? '<path d="M147 172h.1m5-2h.1m6 2h.1m75-1h.1m6-2h.1m5 2h.1" stroke="#a56359" stroke-width="2.2" stroke-linecap="round"/>' : '';
  const detail = {
    mio: '<path d="M123 186q-5 17 2 21" stroke="#efc5d5" stroke-width="2" fill="none"/><circle cx="126" cy="208" r="3" fill="#f8d7e1"/>',
    ren: '<path d="M264 171Q287 183 271 204Q259 203 264 189" stroke="#ffd6a0" stroke-width="2.8" fill="none"/><circle cx="266" cy="175" r="3" fill="#f4af80"/>',
    yui: '<path d="M238 100l28 12m-28-3 25 10" stroke="#bbf6ea" stroke-width="3.5" stroke-linecap="round"/>',
    suzu: '<path d="M139 149q20-6 44-1l-2 19q-22 11-40 0zm65-1q22-6 46 1l-4 18q-20 11-40 0zm-21 3q10-6 21 0m-65-1-9-3m120 3 10-3" fill="#b8e3d2" fill-opacity=".1" stroke="#a78465" stroke-width="1.8"/>',
  }[character];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 555" aria-hidden="true" class="portrait-svg">
    <defs>
      ${gradient('hair', d.hair)}${gradient('back', [d.hair[0], d.hair[2], ink])}
      ${gradient('skin', d.skin)}${gradient('coat', d.cloth)}
      <radialGradient id="${id}blush"><stop stop-color="#dc7999" stop-opacity=".54"/><stop offset="1" stop-color="#ea9bad" stop-opacity="0"/></radialGradient>
    </defs>
    <g stroke-linejoin="round" stroke-linecap="round">
      <path d="${d.silhouette}" fill="url(#${id}back)" stroke="${ink}" stroke-width="3"/>
      <path d="${d.backLines}" fill="none" stroke="${d.hair[1]}" stroke-opacity=".52" stroke-width="2"/>
      <path d="M161 211 158 249 131 271 190 313 264 268 231 247 229 208Z" fill="url(#${id}skin)" stroke="${ink}" stroke-width="2"/>
      <path d="M162 221Q195 247 230 219L232 242Q193 258 161 240Z" fill="#9f647b" opacity=".58"/>
      <path d="M134 240Q96 251 72 276Q38 308 40 393L16 555H381L353 390Q351 316 322 280Q298 254 251 240L211 268 197 292 182 273Z" fill="url(#${id}coat)" stroke="${ink}" stroke-width="3"/>
      <path d="M147 252 193 278 243 251Q224 310 246 354L258 555H127Q152 431 150 363 157 308 147 252Z" fill="${d.under}" stroke="${ink}" stroke-width="2"/>
      <path d="M161 271Q195 312 231 275M164 283Q197 321 230 288M173 305 165 546M187 314 182 554M216 314 229 555" fill="none" stroke="#a98eae" stroke-opacity=".26" stroke-width="1.6"/>
      <path d="${d.collar}" fill="url(#${id}coat)" stroke="${d.cloth[1]}" stroke-width="2.1"/>
      <path d="${d.collar}" fill="none" stroke="${d.lining}" stroke-opacity=".44" stroke-width="1.2"/>
      <path d="${d.seam}" fill="none" stroke="#261e31" stroke-opacity=".62" stroke-width="2.4"/>
      <path d="M58 322Q75 293 102 282M287 270Q321 280 338 329M43 474 36 548M355 471 369 547" fill="none" stroke="${d.lining}" stroke-opacity=".42" stroke-width="3"/>
      ${accessory(d.accessory, d.lining)}
      ${outfit(d, warm)}
      <path d="M135 150Q110 135 115 162 119 180 139 183M250 150Q276 135 272 162 270 180 250 183" fill="url(#${id}skin)" stroke="${ink}" stroke-width="1.7"/>
      <path d="M127 120Q133 72 168 66 222 50 255 92 269 108 262 153 259 180 243 199 225 223 198 231 169 229 145 203 130 185 126 157Z" fill="url(#${id}skin)" stroke="${ink}" stroke-width="2"/>
      <path d="M139 137Q162 133 178 144M208 141Q229 135 249 141" stroke="#f4bac4" fill="none" stroke-width="3" opacity=".75"/>
      <ellipse cx="153" cy="177" rx="23" ry="12" fill="url(#${id}blush)"/><ellipse cx="237" cy="176" rx="22" ry="11" fill="url(#${id}blush)"/>
      ${freckles}
      ${eye(139, 150, d.eyes, expression, false)}
      ${eye(251, 149, d.eyes, expression, true)}
      <path d="M193 155Q190 170 187 176l7 3" stroke="#bd7a83" stroke-width="1.2" fill="none"/><path d="M194 171 197 175" stroke="#ffede1" stroke-width="2"/>
      ${mouth(expression)}
      <path d="${d.bang}" fill="url(#${id}hair)" stroke="${ink}" stroke-width="2.35"/>
      <path d="${d.detail}" fill="none" stroke="${d.hair[1]}" stroke-width="2" opacity=".85"/>
      <path d="M111 108Q116 68 155 49M274 86Q291 115 284 143" fill="none" stroke="${d.lining}" stroke-width="2.2" opacity=".5"/>
      ${detail}
      ${arms(pose, id)}
    </g>
  </svg>`;
}
