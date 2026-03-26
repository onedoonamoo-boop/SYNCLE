
import { Outlet } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'

/**
 * AppLayout
 * 역할: 로그인 후 메인 앱 레이아웃 쉘
 *       상단에 Outlet(각 페이지), 하단에 BottomNav 고정
 * 입력: 없음 (react-router의 Outlet이 자식 라우트 렌더링)
 * 출력: 전체 높이를 채우는 flex 컬럼 레이아웃
 *
 * 수정 시 영향 범위:
 *   - 전체 앱 레이아웃 변경 시 이 파일
 *   - 인증 가드(P1) 추가 시 여기에 useAuth 체크 삽입 예정
 */
export default function AppLayout() {
  return (
    <div className="flex h-full flex-col bg-[#F8FAFC]">
      {/* 각 라우트 화면이 여기에 렌더됨 */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      {/* 하단 탭 고정 */}
      <BottomNav />
    </div>
  )
}
