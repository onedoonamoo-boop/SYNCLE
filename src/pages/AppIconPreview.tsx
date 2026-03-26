import React from 'react'
import SyncleMark from '@/components/SyncleMark'
import { synclePalette as palette } from '@/lib/synclePalette'

function IconTile({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-[28px] border bg-white p-5"
      style={{
        borderColor: palette.line,
        boxShadow: '0 12px 32px rgba(17,24,39,0.06)',
      }}
    >
      <div className="mb-4">
        <div className="text-base font-semibold" style={{ color: palette.ink }}>
          {title}
        </div>
        <div className="mt-1 text-sm leading-6" style={{ color: palette.muted }}>
          {subtitle}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function AppIconPreview() {
  const iconBg =
    'linear-gradient(45deg, #DB7D69 0%, #DB7D69 50%, #C96A7A 75%, #B85E74 100%)'

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
            style={{ backgroundColor: '#FDEDEA', color: palette.coral }}
          >
            SYNCLE App Icon Preview
          </div>

          <h1 className="mt-4 text-4xl font-semibold" style={{ color: palette.ink }}>
            앱 아이콘 전용 버전
          </h1>

          <p className="mt-2 text-lg" style={{ color: palette.muted }}>
            코랄 5 : 플럼 5 배경 위에 로고를 크게 올린 앱 아이콘 시안
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <IconTile
            title="1안 · 권장 아이콘"
            subtitle="가장 기본형. 배경은 코랄-플럼 5:5, 로고는 크게."
          >
            <div
              className="flex items-center justify-center rounded-[36px] p-8"
              style={{ background: iconBg }}
            >
              <SyncleMark size={152} />
            </div>
          </IconTile>

          <IconTile
            title="2안 · 라운드 강조"
            subtitle="조금 더 부드럽고 홈 화면 아이콘 같은 느낌."
          >
            <div
              className="flex items-center justify-center rounded-[40px] p-8"
              style={{ background: iconBg }}
            >
              <div
                className="rounded-[44px] p-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              >
                <SyncleMark size={144} />
              </div>
            </div>
          </IconTile>

          <IconTile
            title="3안 · 축소 미리보기"
            subtitle="작게 보였을 때도 형태가 유지되는지 확인."
          >
            <div className="flex h-full flex-col justify-center">
              <div
                className="flex items-end justify-center gap-5 rounded-[36px] p-8"
                style={{ background: iconBg }}
              >
                <SyncleMark size={56} />
                <SyncleMark size={80} />
                <SyncleMark size={112} />
              </div>
            </div>
          </IconTile>
        </div>
      </div>
    </div>
  )
}