import { BellRing, ChevronRight } from 'lucide-react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

type ChipTone = 'neutral' | 'coral' | 'mint' | 'blue'

type HeroMetric = {
  label: string
  value: string
  accent?: 'coral' | 'ink'
}

type QuickActionItem = {
  title: string
  sub: string
}

type UpdateItem = {
  title: string
  meta: string
  tone?: ChipTone
}

const heroMetrics: HeroMetric[] = [
  { label: '장소', value: '여의도 공원' },
  { label: '회비', value: '오늘 마감', accent: 'coral' },
  { label: '공지', value: '2개 확인' },
]

const quickActions: QuickActionItem[] = [
  { title: '일정', sub: '응답하기' },
  { title: '회비', sub: '상태보기' },
  { title: '공지', sub: '바로보기' },
]

const updates: UpdateItem[] = [
  {
    title: '새 공지 2개',
    meta: '읽지 않은 공지가 있어요',
    tone: 'coral',
  },
  {
    title: '3월 회비가 확인완료 되었어요',
    meta: '오늘 오전 9:12',
    tone: 'mint',
  },
  {
    title: '토요일 러닝 일정 응답이 열렸어요',
    meta: '참석 여부를 선택해 주세요',
    tone: 'blue',
  },
]

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
    <section
      className="rounded-[24px] border bg-white p-4"
      style={{
        borderColor: palette.line,
        boxShadow: '0 8px 24px rgba(17,24,39,0.04)',
      }}
    >
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title ? (
            <h2
              className="text-[15px] font-semibold"
              style={{ color: palette.ink }}
            >
              {title}
            </h2>
          ) : (
            <div />
          )}

          {action ? (
            <button
              className="text-xs font-medium"
              style={{ color: palette.blue }}
            >
              {action}
            </button>
          ) : null}
        </div>
      )}

      {children}
    </section>
  )
}

function StatusChip({
  label,
  tone = 'neutral',
}: {
  label: string
  tone?: ChipTone
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

function QuickActionCard({
  title,
  sub,
}: {
  title: string
  sub: string
}) {
  return (
    <button
      className="rounded-2xl px-3 py-3 text-center transition-transform active:scale-[0.99]"
      style={{
        backgroundColor: palette.bgMuted,
        color: palette.text,
      }}
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
  tone?: ChipTone
}) {
  const chipLabel =
    tone === 'coral'
      ? '중요'
      : tone === 'mint'
        ? '완료'
        : tone === 'blue'
          ? '일정'
          : null

  return (
    <button className="flex w-full items-center justify-between py-1 text-left">
      <div>
        <div className="text-sm font-medium" style={{ color: palette.ink }}>
          {title}
        </div>
        <div className="mt-1 text-xs" style={{ color: palette.muted }}>
          {meta}
        </div>
      </div>

      <div className="ml-3 flex items-center gap-2">
        {chipLabel ? <StatusChip label={chipLabel} tone={tone} /> : null}
        <ChevronRight size={16} color="#9CA3AF" />
      </div>
    </button>
  )
}

export default function HomePage() {
  return (
    <div
      style={{
        backgroundColor: palette.bgSoft,
        minHeight: '100%',
      }}
    >
      {/* 상단 헤더 */}
      <div style={{ backgroundColor: palette.signature }}>
        <div className="px-5 pb-5 pt-4 text-white">
          <div className="mb-3 flex items-center justify-between text-[11px] text-white/80">
            <span>9:41</span>
            <BellRing size={16} />
          </div>

          <div className="flex items-center gap-3">
            <SyncleMark size={42} />
            <div>
              <div className="text-xs text-white/75">
                내가 해야 할 것을 가장 빠르게
              </div>
              <div className="text-lg font-semibold">내 홈</div>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="space-y-4 p-4">
        {/* 히어로 슬롯 */}
        <section
          className="overflow-hidden rounded-[28px] border bg-white"
          style={{ borderColor: palette.line }}
        >
          <div
            className="px-4 pb-4 pt-3 text-white"
            style={{
              background:
                'linear-gradient(45deg, #DB7D69 0%, #DB7D69 50%, #C96A7A 75%, #B85E74 100%)',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-white/75">이번 주 하이라이트</div>
                <div className="mt-1 text-xl font-semibold">
                  토요일 저녁 러닝
                </div>
                <div className="mt-2 text-sm leading-5 text-white/85">
                  장소 변경, 회비 마감, 새 공지처럼 중요한 정보가 이곳에서
                  바뀌어요
                </div>
              </div>

              <div className="rounded-full bg-white/18 px-3 py-1 text-xs font-medium text-white">
                D-2
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-px"
            style={{ backgroundColor: palette.line }}
          >
            {heroMetrics.map((item) => (
              <div key={item.label} className="bg-white px-3 py-3">
                <div className="text-[11px]" style={{ color: palette.muted }}>
                  {item.label}
                </div>
                <div
                  className="mt-1 text-sm font-semibold"
                  style={{
                    color:
                      item.accent === 'coral' ? palette.coral : palette.ink,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

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
            {quickActions.map((item) => (
              <QuickActionCard
                key={item.title}
                title={item.title}
                sub={item.sub}
              />
            ))}
          </div>
        </Surface>

        {/* 최근 업데이트 */}
        <Surface title="최근 업데이트" action="더보기">
          <div className="space-y-3">
            {updates.map((item, index) => (
              <div key={item.title}>
                <UpdateRow
                  title={item.title}
                  meta={item.meta}
                  tone={item.tone ?? 'neutral'}
                />
                {index < updates.length - 1 ? (
                  <div
                    className="mt-3 h-px"
                    style={{ backgroundColor: palette.line }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  )
}