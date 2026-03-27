import { useNavigate } from 'react-router-dom'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

/**
 * LoginPage
 * 역할: 인증 전 진입 화면
 * 현재 단계: Google / Kakao 버튼 UI와 라우팅 흐름만 확인
 * 다음 단계:
 * - Supabase OAuth 연결
 * - 로그인 성공 시 /groups 이동
 * - Naver 로그인은 2차 작업으로 추가
 */
function SocialButton({
  label,
  bg,
  color,
  borderColor,
  onClick,
}: {
  label: string
  bg: string
  color: string
  borderColor?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl px-4 py-3 text-sm font-semibold"
      style={{
        backgroundColor: bg,
        color,
        border: borderColor ? `1px solid ${borderColor}` : 'none',
      }}
    >
      {label}
    </button>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: palette.bgSoft }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[420px] flex-col justify-center">
        <div
          className="rounded-[32px] border bg-white px-6 py-8"
          style={{
            borderColor: palette.line,
            boxShadow: '0 16px 40px rgba(17,24,39,0.06)',
          }}
        >
          {/* 상단 브랜딩 */}
          <div className="flex flex-col items-center text-center">
            <SyncleMark size={72} />

            <div className="mt-6 text-[28px] font-semibold tracking-[-0.03em]" style={{ color: palette.ink }}>
              SYNCLE
            </div>

            <p
              className="mt-3 text-sm leading-6"
              style={{ color: palette.muted }}
            >
              흩어진 모임 운영을
              <br />
              하나의 흐름으로 이어보세요
            </p>
          </div>

          {/* 안내 문구 */}
          <div
            className="mt-8 rounded-2xl p-4"
            style={{ backgroundColor: palette.bgMuted }}
          >
            <div className="text-sm font-medium" style={{ color: palette.ink }}>
              먼저 로그인해 주세요
            </div>
            <div className="mt-1 text-xs leading-5" style={{ color: palette.muted }}>
              로그인 후 내가 속한 모임을 선택해서 바로 들어갈 수 있어요.
            </div>
          </div>

          {/* 소셜 로그인 버튼 */}
          <div className="mt-6 space-y-3">
            <SocialButton
              label="Google로 계속하기"
              bg={palette.bg}
              color={palette.ink}
              borderColor={palette.line}
              onClick={() => navigate('/groups')}
            />

            <SocialButton
              label="Kakao로 계속하기"
              bg="#FEE500"
              color="#191919"
              onClick={() => navigate('/groups')}
            />
          </div>

          {/* 하단 참고 */}
          <div className="mt-6 text-center text-xs leading-5" style={{ color: palette.muted }}>
            지금은 로그인 UI와 흐름만 먼저 연결한 상태예요.
            <br />
            다음 단계에서 Supabase OAuth를 붙일 예정이에요.
          </div>
        </div>
      </div>
    </div>
  )
}