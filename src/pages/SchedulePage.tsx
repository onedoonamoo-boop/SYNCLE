import { useState } from 'react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'
import { CalendarDays, ChevronRight } from 'lucide-react'

type AttendState = '참석' | '미정' | '불참' | null

function Surface({
  title,
  action,
  children,
}: {
  title?: string
  action?: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-[24px] border bg-white p-4"
      style={{
        borderColor: palette.line,
        boxShadow: '0 8px 24px rgba(17,24,39,0.04)',
      }}
    >
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title ? (
            <div className="text-[15px] font-semibold" style={{ color: palette.ink }}>
              {title}
            </div>
          ) : (
            <div />
          )}
          {action ? (
            <button className="text-xs font-medium" style={{ color: palette.blue }}>
              {action}
            </button>
          ) : null}
        </div>
      )}
      {children}
    </div>
  )
}

function StatusChip({
  label,
  tone = 'neutral',
}: {
  label: string
  tone?: 'neutral' | 'coral' | 'mint' | 'blue'
}) {
  const tones = {
    neutral: { bg: palette.bgMuted, color: palette.muted },
    coral: { bg: palette.warnBg, color: palette.warnText },
    mint: { bg: palette.successBg, color: palette.successText },
    blue: { bg: palette.infoBg, color: palette.infoText },
  }

  const t = tones[tone]

  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ backgroundColor: t.bg, color: t.color }}
    >
      {label}
    </span>
  )
}

function SummaryRow({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'neutral' | 'coral' | 'mint' | 'blue'
}) {
  const colorMap = {
    neutral: palette.muted,
    coral: palette.warnText,
    mint: palette.successText,
    blue: palette.infoText,
  }

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm" style={{ color: palette.ink }}>
        {label}
      </span>
      <span className="text-sm font-semibold" style={{ color: colorMap[tone] }}>
        {value}
      </span>
    </div>
  )
}

export default function SchedulePage() {
  const [attend, setAttend] = useState<AttendState>(null)

  const attendOptions: {
    label: Exclude<AttendState, null>
    selectedBg: string
    selectedColor: string
    tone: 'mint' | 'blue' | 'coral'
  }[] = [
    {
      label: '참석',
      selectedBg: palette.signature,
      selectedColor: '#FFFFFF',
      tone: 'mint',
    },
    {
      label: '미정',
      selectedBg: palette.infoBg,
      selectedColor: palette.infoText,
      tone: 'blue',
    },
    {
      label: '불참',
      selectedBg: palette.warnBg,
      selectedColor: palette.warnText,
      tone: 'coral',
    },
  ]

  return (
    <div>
      {/* 공통 민트 헤더 */}
      <div style={{ backgroundColor: palette.signature }}>
        <div className="px-5 pb-5 pt-4 text-white">
          <div className="mb-3 flex items-center justify-between text-[11px] text-white/80">
            <span>9:41</span>
            <span style={{ letterSpacing: '0.08em', fontWeight: 600 }}>SYNCLE</span>
          </div>

          <div className="flex items-center gap-3">
            <SyncleMark size={42} />
            <div>
              <div className="text-xs text-white/75">응답 중심 구조</div>
              <div className="text-lg font-semibold">일정</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* 기본 히어로 슬롯 */}
        <div
          className="rounded-[28px] border bg-white p-4"
          style={{ borderColor: palette.line }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs" style={{ color: palette.muted }}>
                이번 주 일정
              </div>
              <div className="mt-1 text-xl font-semibold" style={{ color: palette.ink }}>
                토요일 저녁 러닝
              </div>
              <div className="mt-2 text-sm" style={{ color: palette.muted }}>
                3월 29일 오후 7시 · 여의도 한강공원
              </div>
            </div>

            <StatusChip label="D-2" tone="blue" />
          </div>

          <div
            className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl"
            style={{ backgroundColor: palette.line }}
          >
            <div className="bg-white px-3 py-3">
              <div className="text-[11px]" style={{ color: palette.muted }}>
                장소
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.ink }}>
                여의도 공원
              </div>
            </div>
            <div className="bg-white px-3 py-3">
              <div className="text-[11px]" style={{ color: palette.muted }}>
                시간
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.ink }}>
                오후 7:00
              </div>
            </div>
            <div className="bg-white px-3 py-3">
              <div className="text-[11px]" style={{ color: palette.muted }}>
                상태
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.ink }}>
                응답 필요
              </div>
            </div>
          </div>
        </div>

        {/* 참석 선택 */}
        <Surface title="참석 여부 선택">
          <div className="grid grid-cols-3 gap-2">
            {attendOptions.map(({ label, selectedBg, selectedColor }) => {
              const selected = attend === label

              return (
                <button
                  key={label}
                  onClick={() => setAttend(label)}
                  className="rounded-2xl px-3 py-3 text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: selected ? selectedBg : palette.bgMuted,
                    color: selected ? selectedColor : palette.text,
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3" style={{ backgroundColor: palette.bgMuted }}>
            <div>
              <div className="text-[11px]" style={{ color: palette.muted }}>
                내 현재 응답
              </div>
              <div className="mt-1 text-sm font-medium" style={{ color: palette.ink }}>
                {attend ?? '아직 선택하지 않았어요'}
              </div>
            </div>

            {attend ? (
              <StatusChip
                label={attend}
                tone={attend === '참석' ? 'mint' : attend === '미정' ? 'blue' : 'coral'}
              />
            ) : (
              <ChevronRight size={16} color="#9CA3AF" />
            )}
          </div>
        </Surface>

        {/* 일정 정보 */}
        <Surface title="일정 정보">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: palette.infoBg, color: palette.infoText }}
            >
              <CalendarDays size={18} />
            </div>

            <div>
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                3월 러닝 모임
              </div>
              <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
                한강공원에서 함께 달리고 가볍게 뒤풀이까지 진행하는 주간 모임
              </div>
            </div>
          </div>
        </Surface>

        {/* 참석 현황 */}
        <Surface title="참석 현황" action="전체보기">
          <div>
            <SummaryRow label="참석" value="12명" tone="mint" />
            <div className="h-px" style={{ backgroundColor: palette.line }} />
            <SummaryRow label="불참" value="3명" tone="coral" />
            <div className="h-px" style={{ backgroundColor: palette.line }} />
            <SummaryRow label="미응답" value="5명" tone="blue" />
          </div>
        </Surface>
      </div>
    </div>
  )
}