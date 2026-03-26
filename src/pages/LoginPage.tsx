
import { useNavigate } from 'react-router-dom'
import { KeyRound, PlusCircle } from 'lucide-react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * LoginPage
 * 역할: 소셜 로그인 + 로그인 후 모임 입장 분기 화면
 * 입력: 없음 (추후 Firebase Auth SDK로 교체)
 * 출력: 카카오/구글/네이버 소셜 버튼 + 초대코드 입력 / 새 모임 만들기 분기
 *
 * 수정 시 영향 범위:
 *   - handleKakaoLogin 등 → Firebase Auth signInWithPopup(provider)로 교체
 *   - 로그인 성공 시 navigate('/') → 모임 유무 체크 후 분기 예정
 */

export default function LoginPage() {
  const navigate = useNavigate()

  // TODO: Firebase Auth 연결 시 실제 소셜 로그인 함수로 교체
  function handleSocialLogin(provider: string) {
    console.log(`${provider} 로그인 시도 (미구현 — Firebase Auth 연결 필요)`)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6" style={{ backgroundColor: palette.bgSoft }}>
      {/* 로고 영역 */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <SyncleMark size={64} />
        <div className="text-center">
          <div
            className="text-2xl font-semibold"
            style={{ color: palette.ink, letterSpacing: '0.12em' }}
          >
            SYNCLE
          </div>
          <div className="mt-1 text-sm" style={{ color: palette.muted }}>
            모임 회비·운영을 한 번에
          </div>
        </div>
      </div>

      {/* 소셜 로그인 카드 */}
      <div
        className="w-full max-w-sm rounded-[24px] border bg-white p-5"
        style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.06)' }}
      >
        <h2 className="mb-4 text-[15px] font-semibold" style={{ color: palette.ink }}>
          소셜 로그인으로 시작
        </h2>

        {/* 카카오 */}
        <button
          onClick={() => handleSocialLogin('kakao')}
          className="mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold"
          style={{ backgroundColor: '#FEE500', color: '#191600' }}
        >
          <span className="text-base">💬</span>
          카카오로 시작하기
        </button>

        {/* 구글 */}
        <button
          onClick={() => handleSocialLogin('google')}
          className="mb-2 flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold"
          style={{ backgroundColor: '#fff', color: palette.ink, borderColor: palette.line }}
        >
          <span className="text-base">🔍</span>
          구글로 시작하기
        </button>

        {/* 네이버 */}
        <button
          onClick={() => handleSocialLogin('naver')}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold"
          style={{ backgroundColor: '#03C75A', color: '#fff' }}
        >
          <span className="text-base">🟢</span>
          네이버로 시작하기
        </button>
      </div>

      {/* 입장 분기 카드 */}
      <div
        className="mt-3 w-full max-w-sm rounded-[24px] border bg-white p-5"
        style={{ borderColor: palette.line, boxShadow: '0 8px 24px rgba(17,24,39,0.06)' }}
      >
        <h2 className="mb-4 text-[15px] font-semibold" style={{ color: palette.ink }}>
          어떻게 시작할까요?
        </h2>

        {/* 초대코드 입력 */}
        <button
          onClick={() => navigate('/')}
          className="mb-2 flex w-full items-center justify-between rounded-2xl px-4 py-3.5"
          style={{ backgroundColor: palette.bgSoft }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: palette.bgMuted, color: palette.text }}
            >
              <KeyRound size={18} />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium" style={{ color: palette.ink }}>초대코드 입력</div>
              <div className="mt-0.5 text-xs" style={{ color: palette.muted }}>초대받은 모임에 바로 입장</div>
            </div>
          </div>
          <span style={{ color: palette.muted }}>›</span>
        </button>

        {/* 새 모임 만들기 */}
        <button
          onClick={() => navigate('/')}
          className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5"
          style={{ backgroundColor: palette.bgSoft }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: palette.infoBg, color: palette.infoText }}
            >
              <PlusCircle size={18} />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium" style={{ color: palette.ink }}>새 모임 만들기</div>
              <div className="mt-0.5 text-xs" style={{ color: palette.muted }}>운영진으로 새 모임 시작</div>
            </div>
          </div>
          <span style={{ color: palette.muted }}>›</span>
        </button>
      </div>
    </div>
  )
}
