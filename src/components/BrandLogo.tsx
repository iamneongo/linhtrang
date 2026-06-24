import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
  layout?: 'horizontal' | 'vertical';
  height?: number | string;
}

export default function BrandLogo({
  className = '',
  variant = 'light',
  layout = 'horizontal',
  height
}: BrandLogoProps) {
  // Determine text and accent colors based on variant
  // In our app, background is dark, so 'light' is the default for high contrast
  const mainColor = variant === 'light' ? '#FFFFFF' : variant === 'dark' ? '#245B4A' : '#327863';
  const redColor = '#E50914'; // Primary Brand Red

  if (layout === 'vertical') {
    return (
      <svg
        viewBox="0 0 160 110"
        className={`${className}`}
        style={{ height: height || '100%', width: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ICON GROUP (Centered) */}
        <g transform="translate(45, 5)">
          {/* House Outer/Inner Roof and Chimney */}
          {/* Red Roof Line */}
          <path
            d="M2 30 L18 14 L34 30"
            stroke={redColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Roof / Wall shadow */}
          <path
            d="M6 28 L18 17 L30 28"
            stroke={mainColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          {/* Chimney */}
          <path
            d="M6 24 V16 H10 V20"
            stroke={mainColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tiny Window details */}
          <rect x="15" y="24" width="2" height="2" fill={mainColor} />
          <rect x="18" y="24" width="2" height="2" fill={mainColor} />
          <rect x="15" y="27" width="2" height="2" fill={mainColor} />
          <rect x="18" y="27" width="2" height="2" fill={mainColor} />

          {/* Overlapping Initials "LT" */}
          {/* L in mainColor */}
          <text
            x="32"
            y="32"
            fontFamily="Montserrat, Inter, sans-serif"
            fontWeight="900"
            fontSize="22"
            fill={mainColor}
            letterSpacing="-0.05em"
          >
            L
          </text>
          {/* T in redColor */}
          <text
            x="44"
            y="32"
            fontFamily="Montserrat, Inter, sans-serif"
            fontWeight="900"
            fontSize="22"
            fill={redColor}
            letterSpacing="-0.05em"
          >
            T
          </text>

          {/* Elegant curved swoop lines */}
          {/* Main color / dark swoop */}
          <path
            d="M-5 35 C 8 42, 34 42, 45 35"
            stroke={mainColor}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Brand Red swoop */}
          <path
            d="M1 38 C 14 45, 42 45, 52 38"
            stroke={redColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* TEXT BRANDING (Centered below) */}
        <text
          x="80"
          y="78"
          textAnchor="middle"
          fontFamily="Montserrat, Inter, sans-serif"
          fontWeight="800"
          fontSize="14"
          letterSpacing="0.06em"
          fill={mainColor}
        >
          LINH TRANG
        </text>
        <text
          x="80"
          y="98"
          textAnchor="middle"
          fontFamily="Montserrat, Inter, sans-serif"
          fontWeight="800"
          fontSize="14"
          letterSpacing="0.12em"
          fill={redColor}
        >
          HOME
        </text>
      </svg>
    );
  }

  // DEFAULT: HORIZONTAL LAYOUT (Perfect for navigation bar and footer inline)
  return (
    <svg
      viewBox="0 0 250 50"
      className={`${className}`}
      style={{ height: height || '100%', width: 'auto' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ICON MINI */}
      <g transform="translate(5, 4)">
        {/* Red Roof Line */}
        <path
          d="M2 28 L16 13 L30 28"
          stroke={redColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner shadow or Wall outline */}
        <path
          d="M6 26 L16 16 L26 26"
          stroke={mainColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        {/* Chimney */}
        <path
          d="M6 22 V15 H10 V18"
          stroke={mainColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Window details */}
        <rect x="13" y="21" width="2" height="2" fill={mainColor} />
        <rect x="16" y="21" width="2" height="2" fill={mainColor} />
        <rect x="13" y="24" width="2" height="2" fill={mainColor} />
        <rect x="16" y="24" width="2" height="2" fill={mainColor} />

        {/* Overlapping Initials "LT" */}
        <text
          x="28"
          y="30"
          fontFamily="Montserrat, Inter, sans-serif"
          fontWeight="900"
          fontSize="20"
          fill={mainColor}
          letterSpacing="-0.05em"
        >
          L
        </text>
        <text
          x="39"
          y="30"
          fontFamily="Montserrat, Inter, sans-serif"
          fontWeight="900"
          fontSize="20"
          fill={redColor}
          letterSpacing="-0.05em"
        >
          T
        </text>

        {/* Swoops */}
        <path
          d="M-4 33 C 7 39, 31 39, 41 33"
          stroke={mainColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M1 36 C 11 42, 38 42, 47 36"
          stroke={redColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* TEXT BRANDING RIGHT SIDE */}
      <g transform="translate(68, 5)">
        {/* "LINH TRANG" in mainColor */}
        <text
          x="0"
          y="26"
          fontFamily="Montserrat, Inter, sans-serif"
          fontWeight="800"
          fontSize="15"
          letterSpacing="0.04em"
          fill={mainColor}
        >
          LINH TRANG
        </text>
        {/* "HOME" in redColor */}
        <text
          x="108"
          y="26"
          fontFamily="Montserrat, Inter, sans-serif"
          fontWeight="800"
          fontSize="15"
          letterSpacing="0.08em"
          fill={redColor}
        >
          HOME
        </text>
      </g>
    </svg>
  );
}
