import { useMemo, useState } from 'react'
import {
  Check,
  ChevronRight,
  Copy,
  CircleHelp,
  WalletCards,
} from 'lucide-react'
import { synclePalette as palette } from '@/lib/synclePalette'

type FeeStatusTone = 'neutral' | 'coral' | 'mint' | 'blue'

type PaymentHistoryItem = {
  month: string
  amount: string
  paidAt: string
  statusLabel: string
  tone: FeeStatusTone
}

const historyItems: PaymentHistoryItem[] = [
  {
    month: '3월 정기회비',
    amount: '₩30,000',
    paidAt: '2026.03.02 확인완료',
    statusLabel: '완료',
    tone: 'mint',
  },
  {
    month: '2월 정기회비',
    amount: '₩30,000',
    paidAt: '2026.02.01 확인완료',
    statusLabel: '완료',
    tone: 'mint',
  },
  {
    month: '1월 신입 회비',
    amount: '₩10,000',
    paidAt: '2026.01.12 확인완료',
    statusLabel: '완료',
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
  tone?: FeeStatusTone
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

function SummaryCard({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: FeeStatusTone
}) {
  const valueColor =
    tone === 'coral'
      ? palette.coral
      : tone === 'mint'
        ? palette.successText
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

function HistoryRow({
  item,
}: {
  item: PaymentHistoryItem
}) {
  return (
    <button className="flex w-full items-center justify-between py-1 text-left">
      <div>
        <div className="text-sm font-medium" style={{ color: palette.ink }}>
          {item.month}
        </div>
        <div className="mt-1 text-xs" style={{ color: palette.muted }}>
          {item.paidAt}
        </div>
      </div>

      <div className="ml-3 flex items-center gap-2">
        <div className="text-sm font-semibold" style={{ color: palette.ink }}>
          {item.amount}
        </div>
        <StatusChip label={item.statusLabel} tone={item.tone} />
        <ChevronRight size={16} color="#9CA3AF" />
      </div>
    </button>
  )
}

export default function FeePage() {
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentStatus = useMemo(() => {
    if (submitted) {
      return {
        label: '확인 대기',
        tone: 'blue' as FeeStatusTone,
        description: '입금 알림을 보냈어요. 총무가 확인하면 완료로 바뀌어요.',
      }
    }

    return {
      label: '아직 미납',
      tone: 'coral' as FeeStatusTone,
      description: '입금 후 버튼을 누르면 총무 확인 대기로 넘어가요.',
    }
  }, [submitted])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('카카오뱅크 3333-12-3456789 김싱클')
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

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
          <div className="text-xs text-white/75">내가 낼 회비와 상태를 한 번에</div>
          <div className="mt-1 text-lg font-semibold">내 회비</div>
        </div>
      </div>

      {/* 본문 */}
      <div className="space-y-4 p-4">
        {/* 현재 납부 카드 */}
        <section
          className="overflow-hidden rounded-[28px] border bg-white"
          style={{ borderColor: palette.line }}
        >
          <div
            className="px-4 pb-4 pt-3"
            style={{ backgroundColor: palette.bg }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs" style={{ color: palette.muted }}>
                  이번 달 납부 항목
                </div>
                <div className="mt-1 text-xl font-semibold" style={{ color: palette.ink }}>
                  4월 정기회비
                </div>
                <div className="mt-2 text-sm" style={{ color: palette.text }}>
                  모임 운영비 · 음료비 포함
                </div>
              </div>

              <StatusChip label={currentStatus.label} tone={currentStatus.tone} />
            </div>

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <div className="text-[11px]" style={{ color: palette.muted }}>
                  납부 금액
                </div>
                <div className="mt-1 text-[32px] font-semibold" style={{ color: palette.ink }}>
                  ₩30,000
                </div>
              </div>

              <div className="rounded-full px-3 py-1 text-xs font-medium" style={{
                backgroundColor: palette.warnBg,
                color: palette.warnText,
              }}>
                4월 29일 마감
              </div>
            </div>

            <div
              className="mt-4 rounded-2xl p-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-[11px]" style={{ color: palette.muted }}>
                안내
              </div>
              <div className="mt-1 text-sm leading-6" style={{ color: palette.text }}>
                {currentStatus.description}
              </div>
            </div>
          </div>
        </section>

        {/* 계좌 정보 + 액션 */}
        <Surface title="입금 계좌">
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: palette.line, backgroundColor: palette.bg }}
          >
            <div className="flex items-center gap-2">
              <WalletCards size={16} color={palette.blue} />
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                카카오뱅크 3333-12-3456789
              </div>
            </div>

            <div className="mt-2 text-sm" style={{ color: palette.text }}>
              예금주 김싱클
            </div>

            <button
              onClick={handleCopy}
              className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor: palette.infoBg,
                color: palette.infoText,
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? '복사 완료' : '계좌 복사'}
            </button>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={submitted}
            className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-default disabled:opacity-60"
            style={{ backgroundColor: palette.ink }}
          >
            {submitted ? '입금 알림 보냄' : '입금했어요'}
          </button>

          <div className="mt-3 flex items-start gap-2">
            <CircleHelp size={15} color={palette.muted} className="mt-0.5" />
            <p className="text-xs leading-5" style={{ color: palette.muted }}>
              실제 자동이체나 실시간 계좌 확인이 아니라, 입금 후 운영진이 직접 확인하는 흐름이에요.
            </p>
          </div>
        </Surface>

        {/* 요약 */}
        <Surface title="이번 달 요약">
          <div className="grid grid-cols-3 gap-2">
            <SummaryCard
              label="내 상태"
              value={submitted ? '확인 대기' : '미납'}
              tone={submitted ? 'blue' : 'coral'}
            />
            <SummaryCard label="지난달" value="완료" tone="mint" />
            <SummaryCard label="누적 미납" value="0건" />
          </div>
        </Surface>

        {/* 최근 납부 내역 */}
        <Surface title="최근 납부 내역" action="전체">
          <div className="space-y-3">
            {historyItems.map((item, index) => (
              <div key={`${item.month}-${item.amount}`}>
                <HistoryRow item={item} />
                {index < historyItems.length - 1 ? (
                  <div
                    className="mt-3 h-px"
                    style={{ backgroundColor: palette.line }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </Surface>

        {/* 하단 안내 */}
        <Surface title="도움말">
          <div className="space-y-3">
            <div
              className="rounded-2xl p-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                회비 상태는 언제 바뀌나요?
              </div>
              <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
                총무가 입금 내역을 확인하면 ‘확인 대기’에서 ‘완료’로 바뀌어요.
              </div>
            </div>

            <div
              className="rounded-2xl p-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-sm font-medium" style={{ color: palette.ink }}>
                금액이 다르거나 문의가 있으면?
              </div>
              <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
                운영진에게 바로 문의하거나 공지의 회비 안내를 다시 확인해 주세요.
              </div>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  )
}