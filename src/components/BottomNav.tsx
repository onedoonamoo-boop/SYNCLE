
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Receipt, CalendarDays, Users, Ellipsis } from 'lucide-react'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * BottomNav
 * 역할: 앱 하단 탭 네비게이션 바
 * 입력: 없음 (현재 경로를 useLocation으로 자동 감지)
 * 출력: 5탭 고정 하단 바 (홈/회비/일정/멤버/더보기)
 *
 * 수정 시 영향 범위:
 *   - 탭 추가/삭제: 이 파일만 수정
 *   - 탭 활성 경로 변경: TAB_ITEMS 배열의 path 값 수정
 *   - 모듈 ON/OFF (P1): features prop을 받아 탭 조건부 렌더링으로 확장 예정
 */

const TAB_ITEMS = [
  { path: '/',         label: '홈',    icon: Home         },
  { path: '/fee',      label: '회비',  icon: Receipt      },
  { path: '/schedule', label: '일정',  icon: CalendarDays },
  { path: '/member',   label: '멤버',  icon: Users        },
  { path: '/more',     label: '더보기', icon: Ellipsis    },
] as const

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div
      className="flex justify-around border-t bg-white px-2 pt-2 pb-5"
      style={{ borderColor: palette.line }}
    >
      {TAB_ITEMS.map(({ path, label, icon: Icon }) => {
        const isActive = pathname === path

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1 px-3 py-1"
            style={{ color: isActive ? palette.signature : '#9CA3AF' }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span
              className="text-[10px]"
              style={{ fontWeight: isActive ? 700 : 500 }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
