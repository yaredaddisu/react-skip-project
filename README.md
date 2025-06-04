# React + TypeScript + Vite
  
src/
├── components/
│   ├── ui/                # Reusable UI components (buttons, inputs, etc.)
│   ├── SkipCard.tsx       # Card component for displaying skip information
│   ├── SkipSelector.tsx   # Component to display skip properties and selection
│   └── StepIndicator.tsx  # Visual progress tracker for skip process
├── lib/
│   └── utils.ts           # Utility functions (Tailwind CSS helpers)
├── pages/
│   └── index.tsx          # Main page combining StepIndicator and SkipSelector
│   └── NotFound.ts        # Display not found pages
├── services/
│   └── skipService.ts     # API service for fetching skip data
├── types/
│   └── interfaces.ts      # Type definitions for the application
└── hooks/
    └── use-mobile.ts      # Custom hooks for responsive behavior
    └── use-toast.ts       # Toast defination 

## Technologies Used
- React
- Tailwind CSS
- Vite
- Class Variance Authority (cn utility)

## How to Run
1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`


Developed By:
Name: Yared Addisu
Email: yaredaddisu1997@gmail.com