import React, { useState } from 'react'
import { CreditCard, Clock3, ChevronRight } from 'lucide-react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * FeePage
 * 역할: 회비 플로우 — 입금했어요 → 확인중 → 납부완료 3단계 관리
 * 입력: 없음 (추후 groupId + feeId 기반 Firestore 쿼리로 교체)
 * 출력: 스텝 인디케이터 + 현재 단계별 UI
 *
 * 수정 시 영향 범위:
 *   - 스텝 전환 로직: setCurrentStep → Firestore 상태 업데이트로 교체
 *   - MEMBERS 더미 데이터: Firebase 멤버 컬렉션 쿼리로 교체
 */

type FeeStep = 0 | 1 | 2

const STEP_META: { title: string; sub: string }[] = [
  { title: '입금했어요',  sub: '멤버 액션'       },
  { title: '확인중',     sub: '운영진 확인 대기' },
  { title: '납부완료',   sub: '운영진 처리'      },
]

// 더미 멤버 데이터 (2단계에서 Firestore로 교체)
const MEMBERS = [
  { name: '유준호', state: '확인중',   stateBg: '#F3F4F6',        stateColor: '#6B7280' },
  { name: '김민지', state: '납부완료', stateBg: palette.successBg, stateColor: palette.successText },
  { name: '이준호', state: '미납',    stateBg: palette.warnBg,    stateColor: palette.warnText   },
] as const

export default function FeePage() {
  const [currentStep, setCurrentStep] = useState<FeeStep>(1)

  return (
    <div>
      {/* 헤더 */}
      <div style={{ backgroundColor: palette.signature }}>
        <div className="px-5 pb-5 pt-4 text-white">
          <div className="mb-3 flex items-center justify-between text-[11px] text-white/80">
            <span>9:41</span>
            <span style={{ letterSpacing: '0.08em', fontWeight: 600 }}>SYNCLE</span>
          </div>
          <div className="flex items-center gap-3">
            <SyncleMark size={42} />
            <div>
              <div className="text-xs text-white/75">{STEP_META[currentStep].sub}</div>
              <div className="text-lg font-semibold">{STEP_META[currentStep].title}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 스텝 인디케이터 */}
        <div className="flex items-center justify-center gap-2">
          {STEP_META.map((meta, idx) => {
            const isDone    = idx < currentStep
            const isActive  = idx === currentStep

            return (
              <React.Fragment key={meta.title}>
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={() => setCurrentStep(idx as FeeStep)}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors"
                    style={{
                      background:   isDone ? palette.successBg : isActive ? palette.signature : '#fff',
                      borderColor:  isDone ? palette.successText : isActive ? palette.signature : palette.line,
                      color:        isDone ? palette.successText : isActive ? '#fff' : palette.muted,
                    }}
                  >
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <span
                    className="text-[10px]"
                    style={{
                      color:      isActive ? palette.signature : palette.muted,
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {meta.title}
                  </span>
                </button>

                {/* 스텝 연결선 */}
                {idx < STEP_META.length - 1 && (
                  <div
                    className="mb-4 h-0.5 w-10 rounded-full transition-colors"
                    style={{ backgroundColor: idx < currentStep ? palette.signature : palette.line }}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* 스텝 0: 입금 정보 입력 */}
        {currentStep === 0 && (
          <div
            className="rounded-[20px] border bg-white p-4"
            style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
          >
            <h3 className="mb-3 text-[15px] font-semibold" style={{ color: palette.ink }}>입금 정보</h3>
            {[
              { label: '입금자명', value: '유준호'    },
              { label: '금액',    value: '₩30,000'  },
              { label: '입금 시각', value: '오늘 09:12' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="mb-2 rounded-2xl px-4 py-3"
                style={{ backgroundColor: palette.bgMuted }}
              >
                <div className="text-[10px]" style={{ color: palette.muted }}>{label}</div>
                <div className="mt-0.5 text-sm font-medium" style={{ color: palette.ink }}>{value}</div>
              </div>
            ))}
            <button
              className="mt-2 w-full rounded-2xl py-3.5 text-sm font-semibold text-white"
              style={{ backgroundColor: palette.ink }}
              onClick={() => setCurrentStep(1)}
            >
              입금 완료 알리기
            </button>
          </div>
        )}

        {/* 스텝 1: 확인 대기 */}
        {currentStep === 1 && (
          <>
            <div
              className="rounded-[20px] border bg-white p-4"
              style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
            >
              <h3 className="mb-3 text-[15px] font-semibold" style={{ color: palette.ink }}>상태 안내</h3>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl flex-shrink-0"
                  style={{ backgroundColor: palette.bgMuted, color: palette.muted }}
                >
                  <Clock3 size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: palette.ink }}>운영진 확인을 기다리는 중</div>
                  <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>운영진이 확인하면 납부완료로 바뀌어요.</div>
                </div>
              </div>
            </div>

            <button
              className="w-full rounded-2xl py-3.5 text-sm font-semibold text-white"
              style={{ backgroundColor: palette.ink }}
              onClick={() => setCurrentStep(2)}
            >
              운영진: 납부 확인하기
            </button>
          </>
        )}

        {/* 스텝 2: 멤버 납부 현황 */}
        {currentStep === 2 && (
          <div
            className="rounded-[20px] border bg-white p-4"
            style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold" style={{ color: palette.ink }}>멤버별 납부 상태</h3>
              <span className="text-xs font-medium" style={{ color: palette.blue }}>전체보기</span>
            </div>

            {MEMBERS.map((member, idx) => (
              <div key={member.name}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: palette.bgMuted, color: palette.text }}
                    >
                      <CreditCard size={18} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: palette.ink }}>{member.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: member.stateBg, color: member.stateColor }}
                    >
                      {member.state}
                    </span>
                    <ChevronRight size={16} color="#9CA3AF" />
                  </div>
                </div>
                {idx < MEMBERS.length - 1 && (
                  <div className="h-px" style={{ backgroundColor: palette.line }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
