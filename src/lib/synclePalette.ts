/**
 * synclePalette
 * 역할: SYNCLE 앱 전체에서 사용하는 컬러 디자인 토큰 모음
 * 입력: 없음
 * 출력: 컬러 값 문자열 객체
 *
 * 사용처: 인라인 style prop, className 대신 직접 색상 지정이 필요한 곳
 * Tailwind config의 syncle.* 토큰과 값을 동일하게 유지해야 함
 */
export const synclePalette = {
  // ── 브랜드 컬러 ──────────────────────────────────
  signature: '#61AEBB', // 공통 헤더, 활성 탭, 브랜드 기본 강조
  blue: '#4C84AE',      // 정보성 UI (일정, 링크 등)
  coral: '#DB7D69',     // 중요 강조, 마감, 경고
  plum: '#B85E74',      // 코랄 그라데이션의 딥 포인트

  // ── 로고 전용 보조 컬러 ──────────────────────────
  logoSand: '#E6CCAA',  // 로고 좌하단 원
  logoCore: '#FFF9F3',  // 로고 중앙 원

  // ── 텍스트 ───────────────────────────────────────
  ink: '#111827',       // 본문 주요 텍스트
  text: '#374151',      // 본문 보조 텍스트
  muted: '#6B7280',     // 힌트, 서브라벨

  // ── 레이아웃 ─────────────────────────────────────
  line: '#E5E7EB',      // 구분선, 보더
  bg: '#FFFFFF',        // 카드 배경
  bgSoft: '#F8FAFC',    // 페이지 배경
  bgMuted: '#F3F4F6',   // 비활성 필드 배경 / 중립 블록

  // ── 상태 (Semantic) ──────────────────────────────
  successBg: '#ECFDF5',   // 완료 뱃지 배경
  successText: '#047857', // 완료 뱃지 텍스트
  warnBg: '#FFF7ED',      // 경고 뱃지 배경
  warnText: '#C2410C',    // 경고 뱃지 텍스트
  infoBg: '#EFF6FF',      // 정보 뱃지 배경
  infoText: '#1D4ED8',    // 정보 뱃지 텍스트
} as const

export type PaletteKey = keyof typeof synclePalette