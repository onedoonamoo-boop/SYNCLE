/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind가 스캔할 파일 범위: 사용하지 않는 클래스는 빌드에서 제거됨
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // synclePalette와 동일한 값을 Tailwind 토큰으로도 사용 가능하게 등록
      colors: {
        syncle: {
          signature: '#61AEBB',
          blue:      '#4C84AE',
          coral:     '#DB7D69',
          ink:       '#111827',
          text:      '#374151',
          muted:     '#6B7280',
          line:      '#E5E7EB',
          bgSoft:    '#F8FAFC',
          bgMuted:   '#F3F4F6',
        },
      },
      borderRadius: {
        // 앱 전반에서 쓰는 카드 라디우스
        card: '24px',
        phone: '34px',
      },
      boxShadow: {
        card:  '0 8px 24px rgba(17,24,39,0.04)',
        phone: '0 25px 60px rgba(17,24,39,0.08)',
      },
    },
  },
  plugins: [],
}
