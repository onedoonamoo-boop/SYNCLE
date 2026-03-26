import { CreditCard, ChevronRight } from 'lucide-react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

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

function FeeRow({
  name,
  state,
  tone,
}: {
  name: string
  state: string
  tone: 'neutral' | 'coral' | 'mint'
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: palette.bgMuted, color: palette.text }}
        >
          <CreditCard size={18} />
        </div>
        <span className="text-sm font-medium" style={{ color: palette.ink }}>
          {name}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <StatusChip label={state} tone={tone} />
        <ChevronRight size={16} color="#9CA3AF" />
      </div>
    </div>
  )
}

const MEMBERS = [
  { name: '유준호', state: '확인중', tone: 'neutral' as const },
  { name: '김민지', state: '납부완료', tone: 'mint' as const },
  { name: '이준호', state: '미납', tone: 'coral' as const },
]

export default function FeePage() {
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
              <div className="text-xs text-white/75">상태 확인과 바로 액션</div>
              <div className="text-lg font-semibold">회비</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* 기본 히어로: 뉴트럴 */}
        <div
          className="rounded-[28px] border bg-white p-4"
          style={{ borderColor: palette.line }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs" style={{ color: palette.muted }}>
                이번 달 회비
              </div>
              <div className="mt-1 text-2xl font-semibold" style={{ color: palette.ink }}>
                ₩30,000
              </div>
              <div className="mt-2 text-sm" style={{ color: palette.muted }}>
                4월 정기회비 · 오늘까지 납부
              </div>
            </div>

            <StatusChip label="아직 미납" tone="coral" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl" style={{ backgroundColor: palette.line }}>
            <div className="bg-white px-3 py-3">
              <div className="text-[11px]" style={{ color: palette.muted }}>
                계좌
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.ink }}>
                모임통장
              </div>
            </div>
            <div className="bg-white px-3 py-3">
              <div className="text-[11px]" style={{ color: palette.muted }}>
                마감
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.coral }}>
                오늘
              </div>
            </div>
            <div className="bg-white px-3 py-3">
              <div className="text-[11px]" style={{ color: palette.muted }}>
                상태
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.ink }}>
                미납
              </div>
            </div>
          </div>
        </div>

        {/* 내 액션 */}
        <Surface title="내 액션">
          <div className="space-y-3">
            <div
              className="rounded-2xl px-4 py-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-[11px]" style={{ color: palette.muted }}>
                입금자명
              </div>
              <div className="mt-1 text-sm font-medium" style={{ color: palette.ink }}>
                유준호
              </div>
            </div>

            <div
              className="rounded-2xl px-4 py-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-[11px]" style={{ color: palette.muted }}>
                입금 금액
              </div>
              <div className="mt-1 text-sm font-medium" style={{ color: palette.ink }}>
                ₩30,000
              </div>
            </div>

            <button
              className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: palette.ink }}
            >
              입금했어요
            </button>
          </div>
        </Surface>

        {/* 상태 안내 */}
        <Surface title="현재 상태">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                운영진 확인 대기 중
              </div>
              <div className="mt-1 text-xs" style={{ color: palette.muted }}>
                확인되면 납부완료로 바뀌어요
              </div>
            </div>
            <StatusChip label="확인중" tone="neutral" />
          </div>
        </Surface>

        {/* 운영용 상태 목록 */}
        <Surface title="멤버별 납부 상태" action="전체보기">
          <div>
            {MEMBERS.map((member, idx) => (
              <div key={member.name}>
                <FeeRow name={member.name} state={member.state} tone={member.tone} />
                {idx < MEMBERS.length - 1 ? (
                  <div className="h-px" style={{ backgroundColor: palette.line }} />
                ) : null}
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  )
}