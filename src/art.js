const ink = '#211929';

const designs = {
  mio: {
    hair: ['#38222f', '#854960', '#4b263d'], eyes: '#9d5576', skin: ['#ffded1', '#c78391'],
    cloth: ['#b87487', '#492d47'], lining: '#ffd4dc', under: '#302336',
    silhouette: 'M104 126C96 64 149 34 190 37 243 28 280 54 291 120L313 296Q308 333 279 360L210 327 144 354 81 321Q105 242 104 126Z',
    backLines: 'M114 138Q124 241 102 307M121 182Q134 265 119 328M275 147Q274 230 294 334M283 175Q280 240 303 311',
    bang: 'M112 157C96 89 126 46 177 36 228 27 274 54 285 102Q298 156 273 214L257 239 264 174Q251 153 245 122 221 114 199 78 169 115 130 132L126 159 134 216Q111 204 112 157Z',
    detail: 'M117 109Q133 62 187 50M123 119Q174 94 192 62M201 58Q224 101 256 112M216 53Q260 66 276 113M267 128Q280 157 272 197',
    sheen: 'M112 111Q127 64 177 52Q159 64 149 79Q126 94 112 111ZM210 52Q253 60 272 96Q246 76 225 71Z',
    face: 'M127 120Q133 72 168 66 222 50 255 92 269 108 262 153 259 180 243 199 225 223 198 229 169 229 145 203 130 185 126 157Z',
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
    sheen: 'M108 113Q124 67 176 51Q164 61 153 76Q131 91 108 113ZM224 56Q262 63 277 96L259 77Z',
    face: 'M125 123Q130 75 167 65 220 48 255 92 267 105 263 155 262 180 248 196 228 224 198 233 171 230 145 208 128 192 124 157Z',
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
    sheen: 'M111 111Q129 65 179 51Q162 65 152 78Q131 91 111 111ZM215 48Q266 56 280 97Q261 79 229 66Z',
    face: 'M127 120Q135 73 171 62 216 48 249 84 271 110 262 155 257 180 240 197 224 216 196 224 176 224 149 205 130 190 124 160Z',
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
    sheen: 'M112 103Q130 65 180 52Q151 74 138 92ZM211 44Q250 48 275 89Q252 71 219 61Z',
    face: 'M127 120Q132 72 165 64 221 48 253 89 269 109 263 150 261 181 246 198 229 221 198 232 177 230 150 208 128 190 126 157Z',
    collar: 'M145 229 178 253 198 285 155 319 117 275ZM242 229 219 255 198 285 233 311 275 267Z',
    seam: 'M91 326 126 396 115 558M294 314 267 406 285 553M67 404 123 426M274 421 334 386',
    accessory: 'braid',
  },
};

let instance = 0;

function eye(id, x, y, expression, flip) {
  const closed = ['smile', 'laugh', 'relieved'].includes(expression) || (expression === 'wry' && flip);
  const wide = ['surprise', 'hopeful'].includes(expression);
  const soft = ['shy', 'tender', 'sad', 'uneasy', 'nostalgic'].includes(expression);
  const brow = {
    sad: 'M1 -8Q14 -15 35 -18', resolve: 'M1 -16Q18 -16 35 -8',
    uneasy: 'M1 -9Q13 -13 35 -19', hopeful: 'M1 -12Q15 -22 35 -14',
    nostalgic: 'M1 -10Q15 -15 35 -12', relieved: 'M1 -8Q15 -17 35 -12',
  }[expression] ?? 'M1 -10Q14 -18 35 -13';
  const lid = wide ? 'M0 6Q12 -10 27 -4Q35 -2 39 8' : soft ? 'M0 7Q15 1 26 3Q35 4 39 10' : 'M0 6Q14 -5 28 -2Q36 0 39 8';
  const shape = `${lid}Q23 19 4 12Z`;
  const cast = expression === 'uneasy' || expression === 'shy' ? 5 : expression === 'nostalgic' ? -3 : 0;
  const clip = `${id}${flip ? 'right' : 'left'}`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
    <path d="${brow}" fill="none" stroke="#724d5d" stroke-width="2.3"/>
    ${closed ? `<path d="${expression === 'relieved' ? 'M0 6Q17 15 36 7' : 'M0 9Q17 -6 36 7'}M1 8 -4 4" fill="none" stroke="#382431" stroke-width="2.9"/>` : `
      <clipPath id="${clip}"><path d="${shape}"/></clipPath>
      <path d="${shape}" fill="#fff3ec" stroke="#724952" stroke-width="1.1"/>
      <g clip-path="url(#${clip})"><g transform="translate(${flip ? -cast : cast} ${soft ? 3 : 0})">
        <ellipse cx="21" cy="7" rx="${wide ? 8 : 9.5}" ry="${soft ? 7 : 9.8}" fill="url(#${id}iris)"/>
        <ellipse cx="20" cy="6" rx="4.5" ry="${soft ? 4.5 : 6.8}" fill="#29213b"/>
        <path d="M14 9Q21 16 28 9" stroke="#ffc3d5" stroke-opacity=".6" fill="none"/>
        <ellipse cx="${flip ? 23 : 17.7}" cy="3.2" rx="2.5" ry="1.7" fill="#fff9ee"/><circle cx="25.3" cy="10" r="1.15" fill="#f9d9e2"/>
      </g></g>
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
    shy: 'M186 191Q195 196 202 190Q199 197 192 196Z',
    tender: 'M181 190Q194 195 205 187Q203 193 193 196Z',
    laugh: 'M176 183Q195 189 211 181Q207 204 193 205Q181 201 176 183Z',
    uneasy: 'M187 194Q193 188 202 192L205 194Q196 194 187 194Z',
    hopeful: 'M182 188Q194 191 206 184Q201 198 193 197Q186 196 182 188Z',
    nostalgic: 'M184 191Q192 194 204 189Q201 194 193 196Z',
    relieved: 'M182 190Q194 197 205 188Q198 200 191 198Z',
  };
  return `<path d="${paths[expression] || paths.neutral}" fill="#a45c68" stroke="#9a5263" stroke-width=".8"/>
    ${expression === 'laugh' ? '<path d="M180 185Q195 190 207 184L205 189Q195 194 182 190Z" fill="#ffece3"/>' : '<path d="M188 199Q196 201 202 197" fill="none" stroke="#ffe7da" stroke-width="1.5" stroke-linecap="round"/>'}`;
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

function outfit(character, d, warm) {
  if (!warm) return '';
  if (character === 'ren') return `<path d="M136 301Q145 317 163 320H230Q249 316 258 299L278 554H116Z" fill="#48343e" stroke="#30202c" stroke-width="2"/>
    <path d="M139 332Q198 353 257 330M133 376Q198 394 262 372M163 412h68v54h-68z" fill="none" stroke="#cb9c71" stroke-width="1.7" stroke-dasharray="3 4"/>
    <path d="M131 407Q199 413 264 402" fill="none" stroke="#92735f" stroke-width="5"/>`;
  if (character === 'yui') return `<path d="M125 255Q117 224 141 223L193 258 242 222Q276 220 275 252L249 289 198 319 141 286Z" fill="#57557e" stroke="${ink}" stroke-width="2.3"/>
    <path d="M126 250Q147 285 198 310Q249 277 272 249" fill="none" stroke="#a2a3cf" stroke-width="2"/>
    <path d="M170 298Q167 326 172 349M219 298Q226 321 221 352" fill="none" stroke="#b2efea" stroke-width="2.4"/>`;
  return `<path d="M142 230Q173 254 208 247L246 228Q263 237 260 269 223 303 157 283 135 267 142 230Z
    M203 276Q239 274 252 258L280 407 242 427Z" fill="${d.lining}" stroke="${ink}" stroke-width="2.1"/>
    <path d="M146 247Q195 276 255 242M149 263Q198 288 256 254M218 283 257 402M240 276 271 400" fill="none" stroke="${d.cloth[1]}" stroke-width="2" opacity=".52"/>
    <path d="M244 411 250 432M253 407 260 428M263 405 271 424M274 402 281 420" stroke="${d.lining}" stroke-width="3"/>`;
}

function heldObject(character) {
  return {
    mio: '<rect x="153" y="340" width="92" height="58" rx="6" fill="#302938" stroke="#191623" stroke-width="2.5"/><path d="M154 351h91v-9h-29l-5-9h-23l-7 9h-27z" fill="#c7a9be"/><circle cx="201" cy="371" r="19" fill="#595b73" stroke="#242132" stroke-width="4"/><circle cx="201" cy="371" r="12" fill="#38334c" stroke="#9683a9"/><path d="M195 365l7-3 5 4-9 7z" fill="#b7a7d6"/>',
    ren: '<rect x="177" y="334" width="48" height="65" rx="9" fill="#c49e70" stroke="#512d34" stroke-width="2"/><ellipse cx="201" cy="337" rx="23" ry="6" fill="#e6cac1"/><path d="M180 354h42v25h-42z" fill="#835146"/><path d="M189 366q12-12 22 0-12 11-22 0z" fill="#eac293"/>',
    yui: '<rect x="177" y="324" width="49" height="77" rx="7" fill="#454a68" stroke="#242337" stroke-width="3"/><rect x="182" y="327" width="40" height="13" rx="4" fill="#252a48"/><rect x="184" y="347" width="35" height="18" rx="2" fill="#a3d0cb"/><path d="M188 356h5l4-4 4 9 4-6h10" fill="none" stroke="#365967" stroke-width="1.3"/><circle cx="201" cy="378" r="5" fill="#c97692"/>',
    suzu: '<path d="M153 331Q182 326 198 339Q221 327 248 330l-2 65q-28-2-48 8-23-11-46-5z" fill="#4f6a8d" stroke="#242c45" stroke-width="3"/><path d="M156 327q22-5 42 9 22-13 47-9v60q-22-2-47 10-21-11-42-7z" fill="#ede0c9" stroke="#937f76"/><path d="M198 337v58m-35-53q12-2 26 5m-26 4q12-2 26 5m-26 4q12-2 26 5m18-18q12-5 28-4m-28 14q12-5 28-5m-14-22v55l4-4 4 2v-54" fill="none" stroke="#a99485" stroke-width="1.4"/>',
  }[character];
}

function arms(pose, id, character) {
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
  if (pose === 'hold') {
    return `<path d="M53 430Q37 400 71 353L97 331 120 359 106 396 151 359 181 395 113 444Q74 473 53 430ZM338 428Q361 403 327 353L296 334 277 366 292 402 246 359 217 394 284 442Q316 463 338 428Z" fill="url(#${id}coat)" stroke="${ink}" stroke-width="2.3"/>
      ${heldObject(character)}
      <path d="M141 372Q149 355 159 356l16 4q6 3 2 7l-12 1 11 8q7 5 2 11-7 6-25-2l-12-2zm118-1q-9-14-18-14l-15 6q-4 3-1 6l10-1-10 10q-6 6 0 10 8 4 24-5l12-2z" fill="url(#${id}skin)" stroke="${ink}" stroke-width="1.6"/>`;
  }
  if (pose === 'wave') {
    return `<path d="M325 370Q347 352 363 317L357 242 318 244 316 303 282 326Z" fill="url(#${id}coat)" stroke="${ink}" stroke-width="2.3"/>
      <path d="M322 249 318 228 305 212Q302 204 309 204L321 212 316 186Q316 177 322 180L331 200 334 175Q337 167 342 174L343 199 350 179Q355 173 359 180L355 207 363 195Q371 191 371 199L361 222Q358 238 348 248Z" fill="url(#${id}skin)" stroke="${ink}" stroke-width="1.6"/>
      <path d="M323 222Q337 211 351 215M340 217q-9 10-6 16" fill="none" stroke="#ac6978" stroke-width="1.4"/>`;
  }
  if (pose === 'reflect') {
    return `<path d="M329 367Q314 357 290 355L243 283 218 300 251 383Q269 419 312 418L333 405Z" fill="url(#${id}coat)" stroke="${ink}" stroke-width="2.3"/>
      <path d="M243 285 239 267 239 247q-2-6-5-2l-4 14-6-17q-3-5-6-1l3 17-8-10q-5-3-6 1l8 15-7-2q-7 0-4 5l13 11 6 18Z" fill="url(#${id}skin)" stroke="${ink}" stroke-width="1.5"/>
      <path d="M215 298 246 279 254 296 222 315ZM253 307q24 55 52 66" fill="url(#${id}coat)" stroke="${ink}" stroke-width="1.5"/>`;
  }
  return '';
}

export function portrait(character, expression = 'neutral', pose = 'still', warm = false, dawn = false) {
  const d = designs[character];
  if (!d) return '';
  const id = `p${++instance}`;
  const gradient = (name, stops) => `<linearGradient id="${id}${name}" x2="35%" y2="100%">${stops.map((color, i) => `<stop offset="${i / (stops.length - 1)}" stop-color="${color}"/>`).join('')}</linearGradient>`;
  const tilt = { mio: -3, ren: 1, yui: 4, suzu: -1 }[character] + ({ shy: 4, uneasy: 3, relieved: -3, nostalgic: -4 }[expression] ?? 0);
  const blush = expression === 'shy' || expression === 'laugh' ? .76 : .43;
  const light = dawn ? '#ffd2a6' : d.lining;
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
      ${gradient('iris', ['#2a203a', d.eyes, light])}
      <linearGradient id="${id}rim" x2="80%" y2="100%"><stop stop-color="${light}" stop-opacity=".82"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${id}blush"><stop stop-color="#dc7999" stop-opacity="${blush}"/><stop offset="1" stop-color="#ea9bad" stop-opacity="0"/></radialGradient>
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
      <path d="M57 319Q76 290 109 276M68 343Q83 335 107 331M45 467Q69 473 99 482M302 450Q327 444 349 434" fill="none" stroke="url(#${id}rim)" stroke-width="1.3"/>
      <path d="M80 373Q97 379 113 378M284 385Q311 382 332 370M79 504q11 4 28 4M292 507q20-3 37-11" fill="none" stroke="${ink}" stroke-opacity=".38" stroke-width="1.4" stroke-dasharray="3 3"/>
      ${outfit(character, d, warm)}
      ${(character !== 'mio' || pose !== 'hold') ? accessory(d.accessory, d.lining) : ''}
      <g transform="rotate(${tilt} 197 210)">
      <path d="M135 150Q110 135 115 162 119 180 139 183M250 150Q276 135 272 162 270 180 250 183" fill="url(#${id}skin)" stroke="${ink}" stroke-width="1.7"/>
      <path d="${d.face}" fill="url(#${id}skin)" stroke="${ink}" stroke-width="2"/>
      <path d="M132 163Q138 199 182 219Q152 211 137 193Q129 180 132 163Z" fill="url(#${id}rim)" opacity=".64"/>
      <path d="M139 137Q162 133 178 144M208 141Q229 135 249 141" stroke="#f4bac4" fill="none" stroke-width="3" opacity=".75"/>
      <ellipse cx="153" cy="177" rx="23" ry="12" fill="url(#${id}blush)"/><ellipse cx="237" cy="176" rx="22" ry="11" fill="url(#${id}blush)"/>
      ${freckles}
      ${eye(id, 139, 150, expression, false)}
      ${eye(id, 251, 149, expression, true)}
      <path d="M193 155Q190 170 187 176l7 3" stroke="#bd7a83" stroke-width="1.2" fill="none"/><path d="M194 171 197 175" stroke="#ffede1" stroke-width="2"/>
      ${mouth(expression)}
      <path d="${d.bang}" fill="url(#${id}hair)" stroke="${ink}" stroke-width="2.35"/>
      <path d="${d.sheen}" fill="url(#${id}rim)" opacity="${dawn ? .68 : .42}"/>
      <path d="${d.detail}" fill="none" stroke="${d.hair[1]}" stroke-width="2" opacity=".85"/>
      <path d="M111 108Q116 68 155 49M274 86Q291 115 284 143" fill="none" stroke="${d.lining}" stroke-width="2.2" opacity=".5"/>
      ${detail}
      </g>
      ${arms(pose, id, character)}
    </g>
  </svg>`;
}
