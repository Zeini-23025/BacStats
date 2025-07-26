import React from 'react';
import { Box } from '@mui/material';

const BacLogo = ({ size = 40, color = 'white' }) => {
  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.1)',
          cursor: 'pointer'
        }
      }}
    >
      {/* Cercle principal avec dégradé */}
      <defs>
        <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1976d2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2196F3', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="gradientGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FFA000', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Cercle principal */}
      <circle 
        cx="20" 
        cy="20" 
        r="18" 
        fill="url(#gradientBlue)"
        stroke="#ffffff" 
        strokeWidth="2"
      />
      
      {/* Livre ouvert */}
      <path 
        d="M12 15 L20 13 L28 15 L28 25 L20 23 L12 25 Z" 
        fill="#ffffff" 
        stroke="#1976d2" 
        strokeWidth="0.5"
      />
      <line 
        x1="20" 
        y1="13" 
        x2="20" 
        y2="23" 
        stroke="#1976d2" 
        strokeWidth="1"
      />
      
      {/* Pages du livre */}
      <path 
        d="M12 15 L20 13 L20 23 L12 25 Z" 
        fill="#f5f5f5" 
        opacity="0.9"
      />
      <path 
        d="M20 13 L28 15 L28 25 L20 23 Z" 
        fill="#ffffff" 
        opacity="0.9"
      />
      
      {/* Graduation cap */}
      <path 
        d="M8 12 L20 8 L32 12 L20 16 Z" 
        fill="url(#gradientGold)"
      />
      <path 
        d="M32 12 L32 16 Q32 18 30 18 Q28 18 28 16 L28 12" 
        fill="url(#gradientGold)"
      />
      
      {/* Ombre du chapeau */}
      <path 
        d="M8 12 L20 8 L32 12 L20 16 Z" 
        fill="#000000" 
        opacity="0.1"
        transform="translate(0.5, 0.5)"
      />
      
      {/* Lettres BAC */}
      <text 
        x="20" 
        y="32" 
        fontFamily="Arial, sans-serif" 
        fontSize="5.5" 
        fontWeight="bold" 
        textAnchor="middle" 
        fill="#ffffff"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
      >
        BAC
      </text>
    </Box>
  );
};

export default BacLogo;
