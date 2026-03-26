import React from 'react'

import { ChevronRight, ShieldCheck } from 'lucide-react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * MemberPage
 * 역할: 멤버 목록 + 역할 뱃지 + 체크박스 기반 권한 편집
 * 입력: 없음 (추후 Firestore members 컬렉션으로 교체)
 * 출력: 멤버 리스트 카드 + 권한 항목 체크박스
 */

const MEMBERS = [
  { name: '유준호', role: '운영진',   roleBg: '#EEF6F5', roleColor: '#2F7D7A' },
  { name: '김민지', role: '일반 멤버', roleBg: '#F3F4F6', roleColor: '#6B7280' },
  { name: '최현우', role: '일반 멤버', roleBg: '#F3F4F6', roleColor: '#6B7280' },
] as const

const PERMISSIONS = ['회비 관리', '일정 관리', '공지 발송', '가입 승인', '설정 변경', '운영 로그 보기']

export default function MemberPage() {
  const [permStates, setPermStates] = React.useState<boolean[]>(
    PERMISSIONS.map((_, i) => i < 3),  // 첫 3개 기본 활성
  )

  function togglePerm(idx: number) {
    setPermStates(prev => prev.map((v, i) => (i === idx ? !v : v)))
  }

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
              <div className="text-xs text-white/75">운영진 확인</div>
              <div className="text-lg font-semibold">멤버 목록</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 멤버 리스트 */}
        <div className="rounded-[20px] border bg-white p-4" style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[15px] font-semibold" style={{ color: palette.ink }}>멤버 현황</h3>
            <span className="text-xs font-medium" style={{ color: palette.blue }}>전체보기</span>
          </div>
          {MEMBERS.map((m, idx) => (
            <div key={m.name}>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl" style={{ backgroundColor: palette.bgMuted }}>
                    <ShieldCheck size={16} color={palette.muted} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: palette.ink }}>{m.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: m.roleBg, color: m.roleColor }}>{m.role}</span>
                  <ChevronRight size={16} color="#9CA3AF" />
                </div>
              </div>
              {idx < MEMBERS.length - 1 && <div className="h-px" style={{ backgroundColor: palette.line }} />}
            </div>
          ))}
        </div>

        {/* 권한 편집 (김민지 기준) */}
        <div className="rounded-[20px] border bg-white p-4" style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.04)' }}>
          <h3 className="mb-3 text-[15px] font-semibold" style={{ color: palette.ink }}>권한 항목 (김민지)</h3>
          {PERMISSIONS.map((label, idx) => (
            <div key={label}>
              <label className="flex cursor-pointer items-center justify-between py-2">
                <span className="text-sm" style={{ color: palette.ink }}>{label}</span>
                <input
                  type="checkbox"
                  checked={permStates[idx]}
                  onChange={() => togglePerm(idx)}
                  className="h-4 w-4 cursor-pointer"
                  style={{ accentColor: palette.signature }}
                />
              </label>
              {idx < PERMISSIONS.length - 1 && <div className="h-px" style={{ backgroundColor: palette.line }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
