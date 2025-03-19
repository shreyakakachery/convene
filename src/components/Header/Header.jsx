import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <svg
        className="header__logo"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="70px"
        height="90px" // decrease and add padding to header
        viewBox="0 0 300.000000 321.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,321.000000) scale(0.100000,-0.100000)"
          fill="#FFFFFF" // Set fill color to white
          stroke="#FFFFFF"
          strokeWidth="70"
        >
          <path
            d="M1609 3100 c-89 -11 -218 -44 -314 -81 -511 -196 -812 -659 -819
            -1256 -1 -90 -7 -109 -20 -57 -11 42 -68 164 -77 164 -9 0 9 -50 64 -182 31
            -74 47 -96 47 -63 0 9 27 58 60 111 71 113 93 154 83 154 -5 0 -38 -46 -75
            -101 -38 -56 -68 -97 -68 -92 0 28 33 270 46 333 58 291 180 526 363 702
            186 180 397 285 671 334 142 26 385 23 513 -6 55 -12 101 -19 104 -16 9 8
            -121 44 -202 55 -86 12 -275 12 -376 1z"
            // stroke="lightblue"
          />
          <path
            d="M467 1583 c-3 -10 -17 -45 -31 -78 -51 -123 -65 -165 -57 -165 9 0
            66 122 77 164 13 52 19 33 20 -57 2 -184 24 -319 79 -484 63 -190 158 -346
            295 -483 138 -140 297 -240 490 -308 158 -55 235 -67 455 -67 178 0 210 3
            293 24 51 13 95 28 99 34 6 11 5 10 -117 -19 -114 -27 -400 -25 -535 4 -272
            58 -486 171 -657 348 -214 220 -322 477 -373 887 -8 67 -15 125 -15 129 0 5
            30 -35 66 -89 78 -114 73 -108 79 -101 3 2 -29 58 -70 124 -41 65 -75 127
            -75 137 0 9 -4 17 -9 17 -5 0 -11 -8 -14 -17z"
            // stroke="lightseagreen"
          />
        </g>
      </svg>

      <h2 className="header__name">convene</h2>
    </div>
  );
}

export default Header;
