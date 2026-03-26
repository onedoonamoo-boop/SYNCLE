import { BellRing, ChevronRight } from 'lucide-react'
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

function QuickAction({
  title,
  sub,
}: {
  title: string
  sub: string
}) {
  return (
    <button
      className="rounded-2xl px-3 py-3 text-center"
      style={{ backgroundColor: palette.bgMuted, color: palette.text }}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-[11px]">{sub}</div>
    </button>
  )
}

function UpdateRow({
  title,
  meta,
  tone = 'neutral',
}: {
  title: string
  meta: string
  tone?: 'neutral' | 'coral' | 'mint' | 'blue'
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <div className="text-sm font-medium" style={{ color: palette.ink }}>
          {title}
        </div>
        <div className="mt-1 text-xs" style={{ color: palette.muted }}>
          {meta}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {tone !== 'neutral' ? (
          <StatusChip
            label={
              tone === 'coral'
                ? '중요'
                : tone === 'blue'
                  ? '일정'
                  : '완료'
            }
            tone={tone}
          />
        ) : null}
        <ChevronRight size={16} color="#9CA3AF" />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* 상단 헤더: 전 화면 공통 민트 단색 */}
      <div style={{ backgroundColor: palette.signature }}>
        <div className="px-5 pb-5 pt-4 text-white">
          <div className="mb-3 flex items-center justify-between text-[11px] text-white/80">
            <span>9:41</span>
            <BellRing size={16} />
          </div>

          <div className="flex items-center gap-3">
            <SyncleMark size={42} />
            <div>
              <div className="text-xs text-white/75">내가 해야 할 것을 가장 빠르게</div>
              <div className="text-lg font-semibold">내 홈</div>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="space-y-4 p-4">
        {/* 히어로 슬롯: 강조 상태에서만 코랄 그라데이션 */}
        <div
          className="overflow-hidden rounded-[28px] border bg-white"
          style={{ borderColor: palette.line }}
        >
          <div
            className="px-4 pb-4 pt-3 text-white"
            style={{
              background:
                'linear-gradient(45deg, #DB7D69 0%, #DB7D69 70%, #C96A7A 88%, #B85E74 100%)',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-white/75">이번 주 하이라이트</div>
                <div className="mt-1 text-xl font-semibold">토요일 저녁 러닝</div>
                <div className="mt-2 text-sm text-white/85">
                  장소 변경, 회비 마감, 새 공지 같은 중요한 정보가 이곳에서 바뀌어요
                </div>
              </div>

              <div className="rounded-full bg-white/18 px-3 py-1 text-xs font-medium text-white">
                D-2
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-px" style={{ backgroundColor: palette.line }}>
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
                회비
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.coral }}>
                오늘 마감
              </div>
            </div>

            <div className="bg-white px-3 py-3">
              <div className="text-[11px]" style={{ color: palette.muted }}>
                공지
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: palette.ink }}>
                2개 확인
              </div>
            </div>
          </div>
        </div>

        {/* 내 회비 + 새 공지 */}
        <div className="grid grid-cols-2 gap-3">
          <Surface title="내 회비">
            <div className="text-xs" style={{ color: palette.muted }}>
              4월 정기회비
            </div>
            <div className="mt-2 text-2xl font-semibold" style={{ color: palette.ink }}>
              ₩30,000
            </div>
            <div className="mt-3">
              <StatusChip label="아직 미납" tone="coral" />
            </div>

            <button
              className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: palette.ink }}
            >
              입금했어요
            </button>
          </Surface>

          <Surface title="새 공지" action="전체">
            <div className="text-sm font-medium" style={{ color: palette.ink }}>
              이번 주 모임 공지
            </div>
            <div className="mt-2 text-xs leading-5" style={{ color: palette.muted }}>
              집합 장소와 시작 시간이 바뀌었어요
            </div>

            <div
              className="mt-4 rounded-2xl p-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-[11px]" style={{ color: palette.muted }}>
                읽지 않은 공지
              </div>
              <div className="mt-1 text-lg font-semibold" style={{ color: palette.ink }}>
                2개
              </div>
            </div>
          </Surface>
        </div>

        {/* 바로 할 수 있는 것 */}
        <Surface title="바로 할 수 있는 것">
          <div className="grid grid-cols-3 gap-2">
            <QuickAction title="일정" sub="응답하기" />
            <QuickAction title="회비" sub="상태보기" />
            <QuickAction title="공지" sub="바로보기" />
          </div>
        </Surface>

        {/* 최근 업데이트 */}
        <Surface title="최근 업데이트" action="더보기">
          <div className="space-y-3">
            <UpdateRow
              title="새 공지 2개"
              meta="읽지 않은 공지가 있어요"
              tone="coral"
            />
            <div className="h-px" style={{ backgroundColor: palette.line }} />
            <UpdateRow
              title="3월 회비가 확인완료 되었어요"
              meta="오늘 오전 9:12"
              tone="mint"
            />
          </div>
        </Surface>
      </div>
    </div>
  )
}