import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'

// ── 페이지 lazy import (초기 번들 크기 최소화) ─────────────────────────────
// React.lazy를 사용하면 각 페이지는 해당 라우트 진입 시점에 로드됨
import { lazy, Suspense } from 'react'
import React from 'react'

const HomePage         = lazy(() => import('@/pages/HomePage'))
const FeePage          = lazy(() => import('@/pages/FeePage'))
const SchedulePage     = lazy(() => import('@/pages/SchedulePage'))
const MemberPage       = lazy(() => import('@/pages/MemberPage'))
const MorePage         = lazy(() => import('@/pages/MorePage'))
const LoginPage        = lazy(() => import('@/pages/LoginPage'))

/**
 * 로딩 폴백: 페이지 전환 중 빈 화면 방지
 * 추후 스켈레톤 UI로 교체 예정
 */
function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: '#61AEBB', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

function WithSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

/**
 * router
 * 역할: 앱 전체 라우팅 구조 정의
 *
 * 현재 구조:
 *   /login          → 로그인 (인증 전)
 *   /               → 홈 (AppLayout 하위)
 *   /fee            → 회비
 *   /schedule       → 일정
 *   /member         → 멤버
 *   /more           → 더보기
 *
 * P1 확장 시:
 *   - 인증 가드 추가: AppLayout에 useAuth 체크 삽입
 *   - 모임 선택 라우트: /group/:groupId/* 구조로 중첩 라우팅 추가 예정
 */
export const router = createBrowserRouter([
  {
    // 인증 전 라우트
    path: '/login',
    element: <WithSuspense><LoginPage /></WithSuspense>,
  },
  {
    // 메인 앱 라우트 (BottomNav 포함)
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <WithSuspense><HomePage /></WithSuspense>,
      },
      {
        path: '/fee',
        element: <WithSuspense><FeePage /></WithSuspense>,
      },
      {
        path: '/schedule',
        element: <WithSuspense><SchedulePage /></WithSuspense>,
      },
      {
        path: '/member',
        element: <WithSuspense><MemberPage /></WithSuspense>,
      },
      {
        path: '/more',
        element: <WithSuspense><MorePage /></WithSuspense>,
      },
    ],
  },
])
