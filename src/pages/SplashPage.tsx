import SyncleMark from '@/components/SyncleMark'

export default function SplashPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        background:
          'linear-gradient(45deg, #DB7D69 0%, #DB7D69 50%, #C96A7A 75%, #B85E74 100%)',
      }}
    >
      <div className="flex w-full max-w-[440px] flex-col items-center text-center">
        <div className="mb-8">
          <SyncleMark size={96} />
        </div>

        <div className="text-white">
          <div className="text-[40px] font-semibold tracking-[-0.04em]">
            SYNCLE
          </div>
          <div className="mt-3 text-base text-white/82">
            흩어진 모임 운영을 하나의 흐름으로
          </div>
        </div>

        <div className="mt-10 rounded-full bg-white/16 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          Coral Gradient Splash
        </div>
      </div>
    </div>
  )
}