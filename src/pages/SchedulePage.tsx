import { useState } from 'react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'
import { CalendarDays } from 'lucide-react'

/**
 * SchedulePage
 * 역할: 일정 플로우 — 일정 생성 + 멤버 참석 응답 + 운영진 현황 확인
 * 입력: 없음 (추후 Firestore schedules 컬렉션으로 교체)
 * 출력: 일정 정보 카드 + 참석/미정/불참 선택 버튼 + 현황 요약
 */
type AttendState = '참석' | '미정' | '불참' | null

export default function SchedulePage() {
  const [attend, setAttend] = useState<AttendState>(null)

  const attendOptions: { label: AttendState; bg: string; color: string }[] = [
    { label: '참석', bg: palette.signature, color: '#fff'             },
    { label: '미정', bg: palette.bgMuted,   color: palette.text       },
    { label: '불참', bg: palette.warnBg,    color: palette.warnText   },
  ]

  return (
    <div>
      <div style={{ backgroundColor: palette.signature }}>
        <div className="px-5 pb-5 pt-4 text-white">
          <div className="mb-3 flex items-center justify-between text-[11px] text-white/80">
            <span>9:41</span>
            <span style={{ letterSpacing: '0.08em', fontWeight: 600 }}>SYNCLE</span>
          </div>
          <div className="flex items-center gap-3">
            <SyncleMark size={42} />
            <div>
              <div className="text-xs text-white/75">멤버 응답</div>
              <div className="text-lg font-semibold">일정 참석</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 일정 정보 */}
        <div className="rounded-[20px] border bg-white p-4" style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}>
          <h3 className="mb-3 text-[15px] font-semibold" style={{ color: palette.ink }}>일정 정보</h3>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl flex-shrink-0" style={{ backgroundColor: palette.infoBg, color: palette.infoText }}>
              <CalendarDays size={18} />
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: palette.ink }}>3월 러닝 모임</div>
              <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>3월 29일 오후 7시 · 여의도 한강공원</div>
            </div>
          </div>
        </div>

        {/* 참석 선택 */}
        <div className="grid grid-cols-3 gap-2">
          {attendOptions.map(({ label, bg, color }) => (
            <button
              key={label}
              onClick={() => setAttend(label)}
              className="rounded-2xl py-3 text-sm font-semibold border-2 transition-all"
              style={{
                backgroundColor: attend === label ? bg : palette.bgMuted,
                color:           attend === label ? color : palette.muted,
                borderColor:     attend === label ? bg : 'transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 현황 요약 */}
        <div className="rounded-[20px] border bg-white p-4" style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}>
          <h3 className="mb-3 text-[15px] font-semibold" style={{ color: palette.ink }}>참석 현황</h3>
          {[
            { label: '참석',   value: '12명', color: palette.successText },
            { label: '불참',   value: '3명',  color: palette.warnText    },
            { label: '미응답', value: '5명',  color: palette.muted       },
          ].map(({ label, value, color }, idx, arr) => (
            <div key={label}>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm" style={{ color: palette.ink }}>{label}</span>
                <span className="text-sm font-semibold" style={{ color }}>{value}</span>
              </div>
              {idx < arr.length - 1 && <div className="h-px" style={{ backgroundColor: palette.line }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
