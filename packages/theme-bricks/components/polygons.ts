import { Component } from '@angular/core';

// The eleven coloured shapes of the theme, used as <polygon-1 /> ... <polygon-11 />.
// Each has its natural size (--w, --h); give it a class to change that: <polygon-7 class="w-20 h-20 m-auto" />.
// The shapes are a port of the MIT licensed Polygon components of @slidev/theme-bricks.

@Component({
  selector: 'polygon-1',
  host: { class: 'bricks-polygon', style: '--w:260px;--h:130px' },
  template:
    '<svg viewBox="0 0 260 130" fill="none"><path d="M130 0C60.551 0 3.82149 54.4583 0.185194 123.001C-0.019615 126.862 3.13401 130 7 130H253C256.866 130 260.02 126.862 259.815 123.001C256.179 54.4583 199.449 0 130 0Z" fill="#F9D56E" /></svg>',
})
export class Polygon1 {}

@Component({
  selector: 'polygon-2',
  host: { class: 'bricks-polygon', style: '--w:199px;--h:198px' },
  template:
    '<svg viewBox="0 0 199 198" fill="none"><ellipse cx="99.5" cy="99" rx="99.5" ry="99" fill="#F07A6B" /></svg>',
})
export class Polygon2 {}

@Component({
  selector: 'polygon-3',
  host: { class: 'bricks-polygon', style: '--w:269px;--h:178px' },
  template:
    '<svg viewBox="0 0 269 178" fill="none"><path d="M0 13.0257C0 7.44576 6.20941 4.10883 10.8628 7.18806L134.5 89L249.599 165.162C255.385 168.991 252.675 178 245.736 178H7C3.13401 178 0 174.866 0 171V13.0257Z" fill="#72A6E2" /></svg>',
})
export class Polygon3 {}

@Component({
  selector: 'polygon-4',
  host: { class: 'bricks-polygon', style: '--w:179px;--h:227px' },
  template:
    '<svg viewBox="0 0 179 227" fill="none"><path d="M166 227H13C5.8203 227 0 221.18 0 214V68.7803C0 66.4106 0.624451 64.1009 1.89385 62.0998C32.6023 13.6896 107.174 -49.2374 177.032 61.9763C178.301 63.997 179 66.4202 179 68.8064V214C179 221.18 173.18 227 166 227Z" fill="#F9D56E" /></svg>',
})
export class Polygon4 {}

@Component({
  selector: 'polygon-5',
  host: { class: 'bricks-polygon', style: '--w:238px;--h:256px' },
  template:
    '<svg viewBox="0 0 238 256" fill="none"><path d="M118.588 25.214C121.157 20.9489 127.503 21.4877 129.315 26.1248L202.859 214.271C204.399 218.21 201.489 222.464 197.259 222.456L10.5944 222.1C5.93118 222.091 3.06049 216.999 5.4667 213.004L118.588 25.214Z" fill="#F07A6B" /></svg>',
})
export class Polygon5 {}

@Component({
  selector: 'polygon-6',
  host: { class: 'bricks-polygon', style: '--w:300px;--h:202px' },
  template:
    '<svg viewBox="0 0 300 202" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M294.051 202C297.378 202 300.077 199.277 299.986 195.95C297 87.0448 230.992 0 150 0C69.0083 0 2.99981 87.0449 0.0142689 195.95C-0.0769163 199.277 2.62153 202 5.949 202H54.9887C58.2793 202 60.9443 199.347 61.0945 196.06C63.9833 132.845 102.683 82.7869 150 82.7869C197.317 82.7869 236.017 132.845 238.905 196.06C239.056 199.347 241.721 202 245.011 202H294.051Z" fill="#F07A6B" /></svg>',
})
export class Polygon6 {}

@Component({
  selector: 'polygon-7',
  host: { class: 'bricks-polygon', style: '--w:247px;--h:137px' },
  template:
    '<svg viewBox="0 0 247 137" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M247 6C247 2.68629 244.314 0 241 0H6C2.68629 0 0 2.6863 0 6V131C0 134.314 2.68629 137 6 137H51.6524C55.6781 137 58.5617 133.104 57.8723 129.137C57.2232 125.402 56.8848 121.561 56.8848 117.641C56.8848 80.6322 87.0446 50.6304 124.248 50.6304C161.452 50.6304 191.612 80.6322 191.612 117.641C191.612 121.561 191.274 125.402 190.625 129.137C189.935 133.104 192.819 137 196.845 137H241C244.314 137 247 134.314 247 131V6Z" fill="#F9D56E" /></svg>',
})
export class Polygon7 {}

@Component({
  selector: 'polygon-8',
  host: { class: 'bricks-polygon', style: '--w:159px;--h:206px' },
  template:
    '<svg viewBox="0 0 159 206" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7C0 3.13401 3.13401 0 7 0H152C155.866 0 159 3.13401 159 7.00001V199C159 202.866 155.866 206 152 206H122.569C118.703 206 115.569 202.866 115.569 199V114.5V114.001C115.569 114 115.569 114 115.569 114C115.568 114 115.568 114 115.568 113.999C115.37 86.8917 99.1328 65 79.1319 65C59.1311 65 42.8941 86.8917 42.6963 113.999C42.6963 114 42.6959 114 42.6954 114C42.6949 114 42.6944 114 42.6944 114.001V114.5V199C42.6944 202.866 39.5604 206 35.6944 206H7C3.13401 206 0 202.866 0 199V7Z" fill="#E29B94" /></svg>',
})
export class Polygon8 {}

@Component({
  selector: 'polygon-9',
  host: { class: 'bricks-polygon', style: '--w:150px;--h:212px' },
  template:
    '<svg viewBox="0 0 150 212" fill="none"><path d="M0 206V9.55543C0 5.13239 4.62276 2.22969 8.60661 4.15121L146.607 70.7125C148.681 71.7132 150 73.8133 150 76.1167V206C150 209.314 147.314 212 144 212H6C2.68629 212 0 209.314 0 206Z" fill="#72A6E2" /></svg>',
})
export class Polygon9 {}

@Component({
  selector: 'polygon-10',
  host: { class: 'bricks-polygon', style: '--w:229px;--h:214px' },
  template:
    '<svg viewBox="0 0 229 214" fill="none"><path d="M71.1563 0H6C2.68629 0 0 2.68629 0 6V208C0 211.314 2.6863 214 6 214H223C226.314 214 229 211.314 229 208V153.821C229 150.507 226.314 147.821 223 147.821H158.461C155.147 147.821 152.461 145.135 152.461 141.821V78.3642C152.461 75.0505 149.775 72.3642 146.461 72.3642H83.1563C79.8426 72.3642 77.1563 69.6779 77.1563 66.3642V6C77.1563 2.68629 74.47 0 71.1563 0Z" fill="#E29B94" /></svg>',
})
export class Polygon10 {}

@Component({
  selector: 'polygon-11',
  host: { class: 'bricks-polygon', style: '--w:203px;--h:159px' },
  template:
    '<svg viewBox="0 0 203 159" fill="none"><path d="M56.3026 5.24908C57.4571 2.09639 60.4573 0 63.8148 0H171.742C175.692 0 179.051 2.88274 179.65 6.78695L201.587 149.787C202.33 154.632 198.581 159 193.679 159H11.4491C5.8897 159 2.02525 153.469 3.93691 148.249L56.3026 5.24908Z" fill="#72A6E2" /></svg>',
})
export class Polygon11 {}
