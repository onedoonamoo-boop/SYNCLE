
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * SyncleMark
 * 역할: SYNCLE 앱 아이콘 마크 (3원 인터락 구조) 렌더링
 * 입력: size - 아이콘 크기(px), 기본값 42
 * 출력: 정사각형 rounded div 안에 3개의 원 + 중앙 흰 원
 *
 * 수정 시 영향 범위: SynclePhoneFrame 헤더, 온보딩 화면, 앱 아이콘
 */
type Props = {
  size?: number
}

export default function SyncleMark({ size = 42 }: Props) {
  // 각 원의 반지름: size 대비 비율로 유지
  const radius = size * 0.22
  const center = size / 2

  // 3원의 중심 좌표 (상단 / 좌하단 / 우하단 삼각 배치)
  const topCircle   = { x: center,        y: size * 0.34 }
  const leftCircle  = { x: size * 0.34,   y: size * 0.60 }
  const rightCircle = { x: size * 0.66,   y: size * 0.60 }

  // 중앙 흰 원: 3원 교차 지점을 강조
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
        borderRadius: size * 0.28,         // 앱 아이콘 비율 유지
        backgroundColor: palette.signature,
        flexShrink: 0,
      }}
    >
      {/* 상단 원: 모임관리 (blue) */}
      <div
        className="absolute rounded-full"
        style={{
          width:  radius * 2,
          height: radius * 2,
          left:   topCircle.x - radius,
          top:    topCircle.y - radius,
          backgroundColor: palette.blue,
        }}
      />

      {/* 좌하단 원: 회비관리 (neutral gray) */}
      <div
        className="absolute rounded-full"
        style={{
          width:  radius * 2,
          height: radius * 2,
          left:   leftCircle.x - radius,
          top:    leftCircle.y - radius,
          backgroundColor: '#D1D5DB',
        }}
      />

      {/* 우하단 원: 일정·투표 (coral) */}
      <div
        className="absolute rounded-full"
        style={{
          width:  radius * 2,
          height: radius * 2,
          left:   rightCircle.x - radius,
          top:    rightCircle.y - radius,
          backgroundColor: palette.coral,
        }}
      />

      {/* 중앙 흰 원: SYNC 교차점 강조 */}
      <div
        className="absolute rounded-full"
        style={{
          width:  centerCircleSize,
          height: centerCircleSize,
          left:   centerCirclePos.x,
          top:    centerCirclePos.y,
          backgroundColor: '#FFFFFF',
        }}
      />
    </div>
  )
}
