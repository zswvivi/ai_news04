module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  safelist: [
    'bg-white',
    'rounded-lg',
    'shadow-md',
    'p-4',
    'transition-all',
    'duration-300',
    'hover:shadow-lg',
    'text-xl',
    'font-bold',
    'mb-2',
    'text-sm',
    'text-gray-500',
    'text-xs',
    'text-gray-400',
    'text-gray-700',
    'mb-4',
    'col-span-full',
    'text-center',
    'py-10'
  ]
}
