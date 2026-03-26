# SYNCLE — 모임 회비·운영 앱

## 프로젝트 구조

```
src/
├── lib/
│   └── synclePalette.ts       # 컬러 디자인 토큰
├── components/
│   ├── SyncleMark.tsx          # 로고 마크 (3원 인터락)
│   ├── SynclePhoneFrame.tsx    # 폰 프레임 + 헤더 쉘
│   ├── AppLayout.tsx           # 메인 레이아웃 (BottomNav 포함)
│   └── BottomNav.tsx           # 하단 탭 네비게이션
├── pages/
│   ├── LoginPage.tsx           # 소셜 로그인 + 모임 입장 분기
│   ├── HomePage.tsx            # 운영 홈 대시보드
│   ├── FeePage.tsx             # 회비 플로우 (3단계 스텝)
│   ├── SchedulePage.tsx        # 일정 참석 응답
│   ├── MemberPage.tsx          # 멤버 목록 + 권한 편집
│   └── MorePage.tsx            # 모임 설정 + 모듈 ON/OFF
├── router/
│   └── index.tsx               # React Router 설정
├── index.css                   # Tailwind 디렉티브 + 전역 스타일
└── main.tsx                    # React 앱 진입점
```

## 1단계 셋업 (현재)

```bash
npm install
npm run dev
```

→ http://localhost:5173 에서 실행

## 2단계 예정 — Firebase 연결

1. Firebase 프로젝트 생성 후 `src/lib/firebase.ts` 추가
2. `synclePalette.ts` 옆에 `firebaseConfig.ts` 추가
3. 각 페이지의 더미 데이터(MONTHLY_STATS, MEMBERS 등) → Firestore 쿼리로 교체
4. LoginPage의 `handleSocialLogin` → `signInWithPopup(provider)` 으로 교체

## 3단계 예정 — 모듈 ON/OFF + 권한 체크

- `features` 객체 기반 탭/버튼 조건부 렌더링 (BottomNav에서 처리)
- `permissions` 기반 운영진/일반 멤버 UI 분기
- AppLayout에 `useAuth` 인증 가드 추가

## 더미 데이터 교체 위치 요약

| 파일 | 더미 상수 | 교체 대상 |
|------|-----------|----------|
| HomePage.tsx | MONTHLY_STATS, TASK_ITEMS | Firestore group summary doc |
| FeePage.tsx | MEMBERS | Firestore members + feeStatus |
| SchedulePage.tsx | 하드코딩 일정 정보 | Firestore schedules collection |
| MemberPage.tsx | MEMBERS, PERMISSIONS | Firestore members + roles |
| MorePage.tsx | FEATURES | Firestore group.features |
