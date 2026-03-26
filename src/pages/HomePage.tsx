
import { useNavigate } from 'react-router-dom'
import { Search, BellRing, ChevronRight } from 'lucide-react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * HomePage
 * 역할: 운영 홈 대시보드 — 이번 달 현황 요약 + 해야 할 일 목록
 * 입력: 없음 (추후 useGroupStore 또는 Firebase query로 교체)
 * 출력: 상단 헤더 + 현황 카드 + 할 일 리스트
 *
 * 수정 시 영향 범위:
 *   - 현황 데이터: MONTHLY_STATS 더미 → API 연결 시 교체
 *   - 할 일 목록: TASK_ITEMS 더미 → Firebase Firestore 쿼리로 교체
 */

// ── 더미 데이터 (2단계 Firebase 연결 시 교체) ──────────────────────────────
const MONTHLY_STATS = {
  totalBalance: '₩486,500',
  payRate:      '78%',
  unpaidCount:  '7명',
  scheduleCount:'3개',
}

const TASK_ITEMS = [
  { label: '미납 멤버 확인',       sub: '오늘 리마인드 추천',  color: palette.coral,     path: '/fee'      },
  { label: '4월 정기회비 생성',    sub: '아직 요청 전',        color: palette.signature, path: '/fee'      },
  { label: '다가오는 일정 참석 체크', sub: '12명 응답 대기',   color: palette.blue,      path: '/schedule' },
] as const

// ── 서브 컴포넌트 ──────────────────────────────────────────────────────────

/** 통계 칸 하나 */
function StatBox({
  label,
  value,
  bgColor,
  textColor,
}: {
  label: string
  value: string
  bgColor: string
  textColor: string
}) {
  return (
    <div className="rounded-2xl px-3 py-3" style={{ backgroundColor: bgColor }}>
      <div className="text-[11px]" style={{ color: palette.muted }}>{label}</div>
      <div className="mt-1 text-lg font-semibold" style={{ color: textColor }}>{value}</div>
    </div>
  )
}

// ── 메인 컴포넌트 ──────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
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
              <div className="text-xs text-white/75">모임 운영을 가장 깔끔하게</div>
              <div className="text-lg font-semibold">운영 홈</div>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="p-4 space-y-4">
        {/* 검색 */}
        <div
          className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-3"
          style={{ borderColor: palette.line }}
        >
          <Search size={18} color={palette.muted} />
          <span className="text-sm" style={{ color: palette.muted }}>회비, 일정, 멤버 검색</span>
        </div>

        {/* 이번 달 현황 카드 */}
        <div
          className="rounded-[20px] border bg-white p-4"
          style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[15px] font-semibold" style={{ color: palette.ink }}>이번 달 현황</span>
            <span className="text-xs font-medium cursor-pointer" style={{ color: palette.blue }}>상세</span>
          </div>

          <div className="text-xs" style={{ color: palette.muted }}>총 잔액</div>
          <div
            className="mt-1 mb-4 text-[30px] font-semibold"
            style={{ color: palette.ink, letterSpacing: '-0.03em' }}
          >
            {MONTHLY_STATS.totalBalance}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatBox label="납부율"  value={MONTHLY_STATS.payRate}       bgColor="#EEF6F5" textColor="#2F7D7A" />
            <StatBox label="미납"    value={MONTHLY_STATS.unpaidCount}   bgColor={palette.warnBg}  textColor={palette.warnText}  />
            <StatBox label="일정"    value={MONTHLY_STATS.scheduleCount} bgColor={palette.infoBg}  textColor={palette.infoText}  />
          </div>
        </div>

        {/* 해야 할 일 카드 */}
        <div
          className="rounded-[20px] border bg-white p-4"
          style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[15px] font-semibold" style={{ color: palette.ink }}>해야 할 일</span>
            <span className="text-xs font-medium cursor-pointer" style={{ color: palette.blue }}>전체보기</span>
          </div>

          {TASK_ITEMS.map((item, idx) => (
            <div key={item.label}>
              <button
                className="flex w-full items-center justify-between py-2 text-left"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <div className="text-sm font-medium" style={{ color: palette.ink }}>{item.label}</div>
                    <div className="mt-0.5 text-xs" style={{ color: palette.muted }}>{item.sub}</div>
                  </div>
                </div>
                <ChevronRight size={16} color="#9CA3AF" />
              </button>

              {/* 마지막 아이템 아래엔 구분선 없음 */}
              {idx < TASK_ITEMS.length - 1 && (
                <div className="h-px" style={{ backgroundColor: palette.line }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
