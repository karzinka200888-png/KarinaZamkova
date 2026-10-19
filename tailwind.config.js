/** @type {import('tailwindcss').Config} */
// Палітра і шрифти — з брендбуку OUTSISTENT (Notion, погоджено Кариною Замковою)
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#73EBDF', // фірмовий світло-бірюзовий
          light: '#E8FCFA', // світлі фонові блоки
          dark: '#0D7774', // контрастний текст і дрібні акценти
        },
        stone: '#6D6D6B', // фірмовий сірий
        mist: '#F3F7F7', // альтернативний світлий фон
        line: '#DDE5E4', // лінії і роздільники
        ink: '#2F3434', // основний текст
        spark: '#F28A4B', // помаранчевий акцент, до 5%
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        script: ['"Marck Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};
