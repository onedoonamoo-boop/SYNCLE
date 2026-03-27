import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { synclePalette as palette } from '@/lib/synclePalette'
import { supabase } from '@/lib/supabase'

/**
 * GroupListPage
 * 역할: 로그인 후 사용자가 진입할 내 모임 리스트 화면
 * 현재 단계: Supabase 연결 전, mock 데이터로 라우팅 흐름만 확인
 * 다음 단계: group_members / groups 조회로 실제 데이터 교체
 */
type GroupItem = {
  id: string
  name: string
  description: string | null
  invite_code: string
}

export default function GroupListPage() {
  const navigate = useNavigate()
  const [groups, setGroups] = useState<GroupItem[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchGroups = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('groups')
      .select('id, name, description, invite_code')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('모임 목록 조회 실패:', error)
      setGroups([])
    } else {
      setGroups(data ?? [])
    }

    setLoading(false)
  }

  fetchGroups()
}, [])

  return (
    <div style={{ backgroundColor: palette.bgSoft, minHeight: '100vh' }}>
      {/* 상단 헤더 */}
      <div style={{ backgroundColor: palette.signature }}>
        <div className="px-5 pb-5 pt-4 text-white">
          <div className="text-xs text-white/75">로그인 후 진입 화면</div>
          <div className="mt-1 text-lg font-semibold">내 모임</div>
        </div>
      </div>

      {/* 본문 */}
      <div className="space-y-4 p-4">
        <section
          className="rounded-[24px] border bg-white p-4"
          style={{
            borderColor: palette.line,
            boxShadow: '0 8px 24px rgba(17,24,39,0.04)',
          }}
        >
          <h2
            className="text-[15px] font-semibold"
            style={{ color: palette.ink }}
          >
            참여 중인 모임
          </h2>

          <div className="mt-4 space-y-3">
            {loading ? (
  <div
    className="rounded-2xl px-4 py-5 text-sm"
    style={{ color: palette.muted, backgroundColor: palette.bgMuted }}
  >
    모임을 불러오는 중이에요...
  </div>
) : groups.length === 0 ? (
  <div
    className="rounded-2xl px-4 py-5 text-sm"
    style={{ color: palette.muted, backgroundColor: palette.bgMuted }}
  >
    아직 참여 중인 모임이 없어요.
  </div>
) : (
  groups.map((group) => (
    <button
      key={group.id}
      onClick={() => navigate('/')}
      className="w-full rounded-2xl border px-4 py-4 text-left"
      style={{
        borderColor: palette.line,
        backgroundColor: palette.bg,
      }}
    >
      <div
        className="text-sm font-semibold"
        style={{ color: palette.ink }}
      >
        {group.name}
      </div>

      <div
        className="mt-1 text-xs"
        style={{ color: palette.muted }}
      >
        {group.description || `초대코드: ${group.invite_code}`}
      </div>
    </button>
  ))
)}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="rounded-2xl px-4 py-4 text-sm font-semibold text-white"
            style={{ backgroundColor: palette.ink }}
          >
            모임 만들기
          </button>

          <button
            className="rounded-2xl border px-4 py-4 text-sm font-semibold"
            style={{
              borderColor: palette.line,
              backgroundColor: palette.bg,
              color: palette.ink,
            }}
          >
            초대코드 입력
          </button>
        </div>
      </div>
    </div>
  )
}