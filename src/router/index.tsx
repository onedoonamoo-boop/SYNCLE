import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/AppLayout'
import { lazy, Suspense } from 'react'
import React from 'react'

const SplashPage      = lazy(() => import('@/pages/SplashPage'))
const HomePage        = lazy(() => import('@/pages/HomePage'))
const FeePage         = lazy(() => import('@/pages/FeePage'))
const SchedulePage    = lazy(() => import('@/pages/SchedulePage'))
const MemberPage      = lazy(() => import('@/pages/MemberPage'))
const MorePage        = lazy(() => import('@/pages/MorePage'))
const LoginPage       = lazy(() => import('@/pages/LoginPage'))
const GroupListPage   = lazy(() => import('@/pages/GroupListPage'))


function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
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
 *  * 임시 추가 라우트:
 *   /splash         → 스플래시 프리뷰
 *   /groups         → 모임 리스트 프리뷰
 * P1 확장 시:
 *   - 인증 가드 추가: AppLayout에 useAuth 체크 삽입
 *   - 모임 선택 라우트: /group/:groupId/* 구조로 중첩 라우팅 추가 예정
 */

export const router = createBrowserRouter([
  {
    path: '/splash',
    element: (
      <WithSuspense>
        <SplashPage />
      </WithSuspense>
    ),
  },
  {
    path: '/login',
    element: (
      <WithSuspense>
        <LoginPage />
      </WithSuspense>
    ),
  },
  {
    path: '/groups',
    element: (
      <WithSuspense>
        <GroupListPage />
      </WithSuspense>
    ),
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <WithSuspense>
            <HomePage />
          </WithSuspense>
        ),
      },
      {
        path: '/fee',
        element: (
          <WithSuspense>
            <FeePage />
          </WithSuspense>
        ),
      },
      {
        path: '/schedule',
        element: (
          <WithSuspense>
            <SchedulePage />
          </WithSuspense>
        ),
      },
      {
        path: '/member',
        element: (
          <WithSuspense>
            <MemberPage />
          </WithSuspense>
        ),
      },
      {
        path: '/more',
        element: (
          <WithSuspense>
            <MorePage />
          </WithSuspense>
        ),
      },
    ],
  },
])