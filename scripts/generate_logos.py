import os
import subprocess

out_dir = '/home/spil/projects/personal/construction-landing-web/public/images/ww'

# Option 1: Modern Interlocking Architectural W-Ribbon (Pure Geometric Precision)
svg_opt1 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#F59E0B" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Dark Obsidian Bezel Container -->
  <rect x="8" y="8" width="184" height="184" rx="20" fill="#06080D" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  
  <!-- Subtle Internal Architectural Grid -->
  <line x1="8" y1="100" x2="192" y2="100" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="100" y1="8" x2="100" y2="192" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="3 3"/>
  <circle cx="100" cy="100" r="64" stroke="rgba(245,158,11,0.08)" stroke-width="1"/>

  <!-- Architectural Corner Ticks -->
  <path d="M 22 34 L 22 22 L 34 22" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
  <path d="M 166 22 L 178 22 L 178 34" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/>
  <path d="M 22 166 L 22 178 L 34 178" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/>
  <path d="M 166 178 L 178 178 L 178 166" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>

  <!-- First Architectural W (White Facet Beams) -->
  <path d="M 38 60 L 58 142 L 78 88 L 98 142 L 118 60" 
        stroke="url(#whiteGrad)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Second Architectural W (Gold Offset Interlocking Structure) -->
  <path d="M 82 60 L 102 142 L 122 88 L 142 142 L 162 60" 
        stroke="url(#goldGrad)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" filter="url(#goldGlow)"/>

  <!-- Architectural Precision Nexus Point (ww.cons amber dot) -->
  <circle cx="100" cy="88" r="5" fill="#FBBF24" stroke="#06080D" stroke-width="2"/>
</svg>
'''

# Option 2: Monolithic Minimalist Folded Geometry (Clean Bauhaus / Swiss Architectural Mark)
svg_opt2 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <linearGradient id="opt2Gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="opt2White" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#CBD5E1" />
    </linearGradient>
  </defs>

  <!-- Outer Minimalist Shield -->
  <rect x="10" y="10" width="180" height="180" rx="16" fill="#05060A" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>

  <!-- Precision Chevron Columns (Geometric WW Folded Facade) -->
  <!-- Left W Shape (White) -->
  <polygon points="32,60 48,60 68,138 52,138" fill="url(#opt2White)"/>
  <polygon points="58,138 74,138 88,82 72,82" fill="url(#opt2White)" opacity="0.9"/>
  <polygon points="78,82 94,82 108,138 92,138" fill="url(#opt2White)" opacity="0.9"/>
  <polygon points="98,138 114,138 134,60 118,60" fill="url(#opt2White)"/>

  <!-- Subtle Overlaid Amber Accent Beam -->
  <polygon points="118,60 134,60 154,138 138,138" fill="url(#opt2Gold)"/>
  <polygon points="144,138 160,138 174,82 158,82" fill="url(#opt2Gold)" opacity="0.95"/>

  <!-- Precision Bottom Baseline -->
  <line x1="32" y1="152" x2="174" y2="152" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="178" cy="152" r="3.5" fill="#FBBF24"/>
</svg>
'''

with open(f'{out_dir}/logo_modern_opt1.svg', 'w') as f:
    f.write(svg_opt1)

with open(f'{out_dir}/logo_modern_opt2.svg', 'w') as f:
    f.write(svg_opt2)

print("Generated SVG options successfully")
