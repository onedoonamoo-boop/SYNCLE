import React from 'react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * SynclePhoneFrame
 * 역할: 모든 화면에서 공통으로 사용하는 폰 프레임 + 상단 헤더 쉘
 * 입력:
 *   - title: 헤더 큰 제목 (예: "운영 홈")
 *   - subtitle: 헤더 작은 부제목 (예: "모임 운영을 가장 깔끔하게")
 *   - children: 화면 본문 콘텐츠
 *   - footer: 화면 하단 고정 영역 (CTA 버튼 등), 선택 사항
 * 출력: 320px 폰 프레임 + 민트 헤더 + 스크롤 가능한 본문 영역
 *
 * 수정 시 영향 범위: 헤더 스타일 변경 시 모든 플로우 화면에 영향
 */
type Props = {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function SynclePhoneFrame({ title, subtitle, children, footer }: Props) {
  return (
    <div
      className="w-[320px] rounded-[34px] border bg-white p-3"
      style={{
        borderColor: palette.line,
        boxShadow: '0 25px 60px rgba(34,48,58,0.08)',
      }}
    >
      <div
        className="relative min-h-[680px] overflow-hidden rounded-[28px]"
        style={{ backgroundColor: palette.bgSoft }}
      >
        {/* ── 상단 헤더 ──────────────────────────────── */}
        <div style={{ backgroundColor: palette.signature }}>
          <div className="px-5 pb-4 pt-4 text-white">
            {/* 상태바 모사 */}
            <div className="mb-2 flex items-center justify-between text-[11px] text-white/80">
              <span>9:41</span>
              <span style={{ letterSpacing: '0.08em', fontWeight: 600 }}>SYNCLE</span>
            </div>

            {/* 로고 + 타이틀 */}
            <div className="flex items-center gap-3">
              <SyncleMark size={40} />
              <div>
                <div className="text-xs text-white/75">{subtitle}</div>
                <div className="text-lg font-semibold text-white">{title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 본문 스크롤 영역 ───────────────────────── */}
        {/* footer가 있을 때 하단 여백을 더 확보 */}
        <div className={`p-4 ${footer ? 'pb-28' : 'pb-6'}`}>
          {children}
        </div>

        {/* ── 하단 고정 footer (CTA 버튼 등) ────────── */}
        {footer && (
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
