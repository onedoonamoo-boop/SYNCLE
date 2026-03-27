import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Users,
} from 'lucide-react'
import { synclePalette as palette } from '@/lib/synclePalette'

type AttendState = '참석' | '미정' | '불참' | null
type Tone = 'neutral' | 'coral' | 'mint' | 'blue'

type AgendaItem = {
  time: string
  title: string
  sub: string
}

type UpcomingItem = {
  title: string
  meta: string
  tone?: Tone
}

const agendaItems: AgendaItem[] = [
  {
    time: '19:00',
    title: '집합 및 인원 확인',
    sub: '여의도 한강공원 2번 출입구 앞',
  },
  {
    time: '19:15',
    title: '가벼운 스트레칭',
    sub: '초보자도 같이 진행해요',
  },
  {
    time: '19:30',
    title: '러닝 시작',
    sub: '한강 코스 약 5km',
  },
]

const upcomingItems: UpcomingItem[] = [
  {
    title: '4월 6일 아침 러닝',
    meta: '오전 9시 · 반포 한강공원',
    tone: 'blue',
  },
  {
    title: '4월 13일 주말 번개',
    meta: '오후 6시 · 장소 추후 공지',
    tone: 'neutral',
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
  tone?: Tone
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

function ResponseButton({
  label,
  selected,
  onClick,
}: {
  label: Exclude<AttendState, null>
  selected: boolean
  onClick: () => void
}) {
  const selectedStyle =
    label === '참석'
      ? {
          backgroundColor: palette.successBg,
          borderColor: palette.successText,
          color: palette.successText,
        }
      : label === '불참'
        ? {
            backgroundColor: palette.warnBg,
            borderColor: palette.warnText,
            color: palette.warnText,
          }
        : {
            backgroundColor: palette.infoBg,
            borderColor: palette.infoText,
            color: palette.infoText,
          }

  return (
    <button
      onClick={onClick}
      className="rounded-2xl border px-3 py-3 text-sm font-semibold transition-transform active:scale-[0.99]"
      style={
        selected
          ? selectedStyle
          : {
              backgroundColor: palette.bg,
              borderColor: palette.line,
              color: palette.text,
            }
      }
    >
      {label}
    </button>
  )
}

function SummaryCard({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: Tone
}) {
  const valueColor =
    tone === 'mint'
      ? palette.successText
      : tone === 'coral'
        ? palette.warnText
        : tone === 'blue'
          ? palette.infoText
          : palette.ink

  return (
    <div
      className="rounded-2xl p-3"
      style={{ backgroundColor: palette.bgMuted }}
    >
      <div className="text-[11px]" style={{ color: palette.muted }}>
        {label}
      </div>
      <div className="mt-1 text-base font-semibold" style={{ color: valueColor }}>
        {value}
      </div>
    </div>
  )
}

function AgendaRow({ item }: { item: AgendaItem }) {
  return (
    <div className="flex gap-3">
      <div
        className="w-[52px] rounded-2xl px-2 py-2 text-center text-xs font-semibold"
        style={{
          backgroundColor: palette.bgMuted,
          color: palette.ink,
        }}
      >
        {item.time}
      </div>

      <div className="flex-1 rounded-2xl px-3 py-2" style={{ backgroundColor: palette.bg }}>
        <div className="text-sm font-medium" style={{ color: palette.ink }}>
          {item.title}
        </div>
        <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
          {item.sub}
        </div>
      </div>
    </div>
  )
}

function UpcomingRow({ item }: { item: UpcomingItem }) {
  const chipLabel =
    item.tone === 'blue'
      ? '예정'
      : item.tone === 'coral'
        ? '중요'
        : null

  return (
    <button className="flex w-full items-center justify-between py-1 text-left">
      <div>
        <div className="text-sm font-medium" style={{ color: palette.ink }}>
          {item.title}
        </div>
        <div className="mt-1 text-xs" style={{ color: palette.muted }}>
          {item.meta}
        </div>
      </div>

      <div className="ml-3 flex items-center gap-2">
        {chipLabel ? <StatusChip label={chipLabel} tone={item.tone} /> : null}
        <ChevronRight size={16} color="#9CA3AF" />
      </div>
    </button>
  )
}

export default function SchedulePage() {
  const [attend, setAttend] = useState<AttendState>(null)

  const baseCounts = {
    참석: 11,
    미정: 3,
    불참: 2,
  }

  const responseMeta = useMemo(() => {
    if (attend === '참석') {
      return {
        label: '참석 예정',
        tone: 'mint' as Tone,
        description: '좋아요. 운영진에게 참석으로 반영돼요.',
      }
    }

    if (attend === '불참') {
      return {
        label: '불참',
        tone: 'coral' as Tone,
        description: '불참으로 반영됐어요. 일정은 계속 확인할 수 있어요.',
      }
    }

    if (attend === '미정') {
      return {
        label: '미정',
        tone: 'blue' as Tone,
        description: '아직 고민 중으로 반영돼요. 나중에 다시 바꿀 수 있어요.',
      }
    }

    return {
      label: '응답 전',
      tone: 'neutral' as Tone,
      description: '참석 여부를 선택하면 운영진과 멤버 현황에 반영돼요.',
    }
  }, [attend])

  const summaryCounts = useMemo(() => {
    const counts = {
      참석: baseCounts.참석,
      미정: baseCounts.미정,
      불참: baseCounts.불참,
    }

    if (attend === null) return counts

    counts[attend] += 1
    return counts
  }, [attend])

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
          <div className="text-xs text-white/75">다가오는 일정과 내 응답</div>
          <div className="mt-1 text-lg font-semibold">일정</div>
        </div>
      </div>

      {/* 본문 */}
      <div className="space-y-4 p-4">
        {/* 대표 일정 카드 */}
        <section
          className="overflow-hidden rounded-[28px] border bg-white"
          style={{ borderColor: palette.line }}
        >
          <div
            className="px-4 pb-4 pt-3 text-white"
            style={{ backgroundColor: palette.signature }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-white/75">다가오는 메인 일정</div>
                <div className="mt-1 text-xl font-semibold">3월 러닝 모임</div>
                <div className="mt-2 text-sm leading-5 text-white/85">
                  이번 주 토요일 저녁, 한강에서 함께 달리는 정기 모임이에요.
                </div>
              </div>

              <div className="rounded-full bg-white/18 px-3 py-1 text-xs font-medium text-white">
                D-2
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/14 px-3 py-3">
                <div className="flex items-center gap-2 text-[11px] text-white/70">
                  <CalendarDays size={13} />
                  날짜
                </div>
                <div className="mt-1 text-sm font-semibold">3월 29일 토요일</div>
              </div>

              <div className="rounded-2xl bg-white/14 px-3 py-3">
                <div className="flex items-center gap-2 text-[11px] text-white/70">
                  <Clock3 size={13} />
                  시간
                </div>
                <div className="mt-1 text-sm font-semibold">오후 7:00</div>
              </div>

              <div className="rounded-2xl bg-white/14 px-3 py-3">
                <div className="flex items-center gap-2 text-[11px] text-white/70">
                  <MapPin size={13} />
                  장소
                </div>
                <div className="mt-1 text-sm font-semibold">여의도 한강공원</div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs" style={{ color: palette.muted }}>
                  내 응답 상태
                </div>
                <div className="mt-1">
                  <StatusChip
                    label={responseMeta.label}
                    tone={responseMeta.tone}
                  />
                </div>
              </div>

              {attend === '참석' ? (
                <div
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: palette.successBg,
                    color: palette.successText,
                  }}
                >
                  <Check size={13} />
                  응답 반영됨
                </div>
              ) : null}
            </div>

            <div
              className="mt-4 rounded-2xl p-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-sm leading-6" style={{ color: palette.text }}>
                {responseMeta.description}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <ResponseButton
                label="참석"
                selected={attend === '참석'}
                onClick={() => setAttend('참석')}
              />
              <ResponseButton
                label="미정"
                selected={attend === '미정'}
                onClick={() => setAttend('미정')}
              />
              <ResponseButton
                label="불참"
                selected={attend === '불참'}
                onClick={() => setAttend('불참')}
              />
            </div>
          </div>
        </section>

        {/* 참석 현황 */}
        <Surface title="참석 현황">
          <div className="grid grid-cols-3 gap-2">
            <SummaryCard label="참석" value={`${summaryCounts.참석}명`} tone="mint" />
            <SummaryCard label="미정" value={`${summaryCounts.미정}명`} tone="blue" />
            <SummaryCard label="불참" value={`${summaryCounts.불참}명`} tone="coral" />
          </div>

          <div
            className="mt-4 rounded-2xl p-3"
            style={{ backgroundColor: palette.bgMuted }}
          >
            <div className="flex items-center gap-2">
              <Users size={15} color={palette.blue} />
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                현재 총 17명이 응답했어요
              </div>
            </div>
            <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
              이 화면은 회원도 전체 흐름을 가볍게 볼 수 있게 두고, 상세 명단은 관리자 레이어에서 더 깊게 보는 구조로 가면 돼.
            </div>
          </div>
        </Surface>

        {/* 일정 세부 진행 */}
        <Surface title="일정 진행">
          <div className="space-y-3">
            {agendaItems.map((item) => (
              <AgendaRow key={`${item.time}-${item.title}`} item={item} />
            ))}
          </div>
        </Surface>

        {/* 준비물 / 참고 */}
        <Surface title="참고">
          <div className="space-y-3">
            <div
              className="rounded-2xl p-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                준비물
              </div>
              <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
                러닝화, 가벼운 복장, 물 한 병 정도만 챙기면 돼요.
              </div>
            </div>

            <div
              className="rounded-2xl p-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                우천 시 안내
              </div>
              <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
                비가 많이 오면 일정 변경 공지가 올라오고, 홈 화면 하이라이트도 함께 바뀌어요.
              </div>
            </div>
          </div>
        </Surface>

        {/* 다음 일정 */}
        <Surface title="다음 일정" action="전체">
          <div className="space-y-3">
            {upcomingItems.map((item, index) => (
              <div key={`${item.title}-${item.meta}`}>
                <UpcomingRow item={item} />
                {index < upcomingItems.length - 1 ? (
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