import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * SyncleMark
 * 역할: SYNCLE 브랜드 마크 렌더링
 * 입력: size - 아이콘 크기(px), 기본값 42
 * 출력: 정사각형 rounded div 안에 3개의 원 + 중앙 코어 원
 *
 * 최근 기준:
 * - 배경: signature
 * - 상단 원: blue
 * - 좌하단 원: logoSand
 * - 우하단 원: coral
 * - 중앙 원: logoCore
 *
 * 수정 시 영향 범위:
 * - AppHeader / 공통 헤더
 * - 온보딩 화면
 * - 스플래시
 * - 앱 아이콘
 */
type Props = {
  size?: number
}

export default function SyncleMark({ size = 42 }: Props) {
  const radius = size * 0.22
  const center = size / 2

  const topCircle = {
    x: center,
    y: size * 0.34,
  }

  const leftCircle = {
    x: size * 0.34,
    y: size * 0.6,
  }

  const rightCircle = {
    x: size * 0.66,
    y: size * 0.6,
  }

  const centerCircleSize = radius * 1.28
  const centerCirclePos = {
    x: center - centerCircleSize / 2,
    y: size * 0.47 - centerCircleSize / 2,
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: palette.signature,
        flexShrink: 0,
      }}
    >
      {/* 상단 원 */}
      <div
        className="absolute rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: topCircle.x - radius,
          top: topCircle.y - radius,
          backgroundColor: palette.blue,
        }}
      />

      {/* 좌하단 원 */}
      <div
        className="absolute rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: leftCircle.x - radius,
          top: leftCircle.y - radius,
          backgroundColor: palette.logoSand,
        }}
      />

      {/* 우하단 원 */}
      <div
        className="absolute rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: rightCircle.x - radius,
          top: rightCircle.y - radius,
          backgroundColor: palette.coral,
        }}
      />

      {/* 중앙 코어 원 */}
      <div
        className="absolute rounded-full"
        style={{
          width: centerCircleSize,
          height: centerCircleSize,
          left: centerCirclePos.x,
          top: centerCirclePos.y,
          backgroundColor: palette.logoCore,
        }}
      />
    </div>
  )
}