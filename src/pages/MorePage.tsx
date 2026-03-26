import React from 'react'
import { Settings2, Lock, Globe } from 'lucide-react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * MorePage
 * 역할: 더보기 탭 — 모임 설정, 모듈 ON/OFF, 공개 정책 설정
 * 입력: 없음 (추후 Firestore group settings 문서로 교체)
 * 출력: 기본 정보 카드 + 사용 기능 토글 + 공개 범위 선택
 *
 * 수정 시 영향 범위:
 *   - FEATURES 더미 → Firestore group.features 객체로 교체
 *   - 공개 범위 선택 → group.joinPolicy 필드로 저장
 */

const FEATURES = ['회비', '일정', '공지', '읽음 확인', '가입 승인']

export default function MorePage() {
  const [featureStates, setFeatureStates] = React.useState<boolean[]>(
    FEATURES.map(() => true),
  )
  const [joinPolicy, setJoinPolicy] = React.useState<'private' | 'public'>('private')

  function toggleFeature(idx: number) {
    setFeatureStates(prev => prev.map((v, i) => (i === idx ? !v : v)))
  }

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
              <div className="text-xs text-white/75">모임 성격 정의</div>
              <div className="text-lg font-semibold">모임 설정</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 기본 정보 */}
        <div
          className="rounded-[20px] border bg-white p-4"
          style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
        >
          <h3 className="mb-3 text-[15px] font-semibold" style={{ color: palette.ink }}>기본 정보</h3>
          {[
            { label: '모임 이름', value: '한강 러닝 크루' },
            { label: '카테고리', value: '운동 / 러닝' },
            { label: '소개',     value: '주말 저녁마다 함께 달리는 러닝 모임' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="mb-2 rounded-2xl px-4 py-3"
              style={{ backgroundColor: palette.bgMuted }}
            >
              <div className="text-[10px]" style={{ color: palette.muted }}>{label}</div>
              <div className="mt-0.5 text-sm" style={{ color: palette.ink }}>{value}</div>
            </div>
          ))}
        </div>

        {/* 사용 기능 모듈 ON/OFF */}
        <div
          className="rounded-[20px] border bg-white p-4"
          style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Settings2 size={15} color={palette.muted} />
            <h3 className="text-[15px] font-semibold" style={{ color: palette.ink }}>사용 기능</h3>
          </div>
          {FEATURES.map((label, idx) => (
            <div key={label}>
              <label className="flex cursor-pointer items-center justify-between py-2.5">
                <span className="text-sm" style={{ color: palette.ink }}>{label}</span>
                <input
                  type="checkbox"
                  checked={featureStates[idx]}
                  onChange={() => toggleFeature(idx)}
                  className="h-4 w-4 cursor-pointer"
                  style={{ accentColor: palette.signature }}
                />
              </label>
              {idx < FEATURES.length - 1 && (
                <div className="h-px" style={{ backgroundColor: palette.line }} />
              )}
            </div>
          ))}
        </div>

        {/* 공개 범위 */}
        <div
          className="rounded-[20px] border bg-white p-4"
          style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}
        >
          <h3 className="mb-3 text-[15px] font-semibold" style={{ color: palette.ink }}>공개 범위</h3>

          {[
            {
              key:   'private' as const,
              icon:  <Lock size={18} />,
              title: '비공개 모임',
              sub:   '초대 링크나 코드가 있어야만 접근 가능',
              iconBg: palette.bgMuted,
              iconColor: palette.text,
            },
            {
              key:   'public' as const,
              icon:  <Globe size={18} />,
              title: '공개 모임',
              sub:   '검색에서 노출되며 누구나 가입 요청 가능',
              iconBg: palette.infoBg,
              iconColor: palette.infoText,
            },
          ].map(({ key, icon, title, sub, iconBg, iconColor }) => {
            const isSelected = joinPolicy === key
            return (
              <button
                key={key}
                onClick={() => setJoinPolicy(key)}
                className="mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all"
                style={{
                  backgroundColor: isSelected ? '#EEF6F5' : palette.bgSoft,
                  border: `2px solid ${isSelected ? palette.signature : 'transparent'}`,
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl flex-shrink-0"
                  style={{ backgroundColor: iconBg, color: iconColor }}
                >
                  {icon}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: palette.ink }}>{title}</div>
                  <div className="mt-0.5 text-xs" style={{ color: palette.muted }}>{sub}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
