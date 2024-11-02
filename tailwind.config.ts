/** @type {import('tailwindcss').Config} */

function generateSpacing(space: any) {
  const spacing: any = {};
  for (let i = 0; i <= space; i++) {
    spacing[i] = `${i * 4}px`;
  }
  return spacing;
}

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	fontFamily: {
			sans: ["Lato", "sans-serif"],
  	},
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
			spacing: generateSpacing(500),
			fontSize: {
				base: '14px'
			},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'var(--background)',
  			background1: 'var(--background-1)',
  			background2: 'var(--background-2)',
  			background3: 'var(--background-3)',
  			foreground: 'var(--foreground)',
  			foreground1: 'var(--foreground-1)',
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			accentGreen: 'var(--accent-green)',
  			accentOrange: 'var(--accent-orange)',
  			accentBlue: 'var(--accent-blue)',
  			accentViolet: 'var(--accent-violet)',
  			accentYellow: 'var(--accent-yellow)',
  			accentPink: 'var(--accent-pink)',
  			accentBlack: 'var(--accent-black)',
  			accentWhite: 'var(--accent-white)',
  			accentGray: 'var(--accent-gray-1)',
  			accentRed: 'var(--accent-red)',
  			textBlack1: 'var(--text-black-1)',
  			textBlack2: 'var(--text-black-2)',
  			textBlack3: 'var(--text-black-3)',
  			textWhite: 'var(--text-white)',
  			textBlue: 'var(--text-blue)',
  			textViolet: 'var(--text-violet)',
  			textRed: 'var(--text-red)',
  			textGray1: 'var(--text-gray-1)',
  			textGray2: 'var(--text-gray-2)',
  			textGray3: 'var(--text-gray-3)',
  			textGray4: 'var(--text-gray-4)',
  			textGray5: 'var(--text-gray-5)',
  			borderGray: 'var(--border-gray)',
  			borderViolet: 'var(--border-violet)',
  			linearBlue: 'var(--linear-blue)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
			},
			transitionProperty: {
				'width': 'width'
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}