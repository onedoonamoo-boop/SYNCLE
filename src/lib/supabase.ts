import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

### 5단계 — 구글 로그인 설정

**Supabase 대시보드에서:**
1. **Authentication → Providers → Google** 켜기
2. Client ID, Client Secret 필요 → [Google Cloud Console](https://console.cloud.google.com) 에서 발급

**Google Cloud Console에서:**
1. 새 프로젝트 생성
2. **API 및 서비스 → 사용자 인증 정보 → OAuth 2.0 클라이언트 ID** 생성
3. 승인된 리디렉션 URI에 추가:
```
https://[your-project-ref].supabase.co/auth/v1/callback