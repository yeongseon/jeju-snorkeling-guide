# 제주 스노클링 가이드 디자인 기준

## 0. Research Log

- Embedded references: `airbnb`, `apple`, `aside`를 비교하고 여행 탐색의 정보 우선순위는 Airbnb에서 참고하되 색과 사진 구성은 복제하지 않는다. Layer A는 `taste-skill`을 선택했다.
- Lazyweb/Imagen: 현재 세션에서 해당 도구가 제공되지 않아 생략. 제공된 가이드북은 콘텐츠 출처이지 UI 화면 레퍼런스가 아니다.
- UI source: 원문 4쪽의 장소 목록 및 3~7쪽의 준비·안전 항목. 현장 사진 사용 권리가 확인되지 않아 사진 대신 비장소성 색면·유형 그래픽을 쓴다.

## 1. Atmosphere & Identity

흰 종이 위 해수면의 청량한 색과 넉넉한 공간을 사용한다. 관광 광고보다 초행자의 의사결정 보조에 가깝다. 장소 카드는 실제 사진이 없음을 숨기지 않고 이름과 정보 상태를 먼저 보여 준다.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---|---|
| Main surface | `--paper` | `#F7FBFB` | 전체 배경 |
| Elevated surface | `--white` | `#FFFFFF` | 카드·입력 |
| Deep water | `--ink` | `#103744` | 제목·본문 |
| Secondary text | `--muted` | `#506D77` | 부연 |
| Primary accent | `--sea` | `#087D8C` | 행동·선택 |
| Accent hover | `--sea-dark` | `#065D69` | 호버 |
| Soft accent | `--sea-pale` | `#DBF1F0` | 보조 면 |
| Warm cue | `--sand` | `#F3E8C9` | 안내 면 |
| Hairline | `--line` | `#D7E5E6` | 구분 |
| Status unknown | `--unknown` | `#6A5A31` | 미확인 글자 |

선택한 조건은 색만으로 표현하지 않고 라벨과 선택 상태를 함께 사용한다.

## 3. Typography

한국어 우선: `Pretendard`, `Apple SD Gothic Neo`, `Malgun Gothic`, sans-serif. 외부 폰트가 로드되지 않아도 폭이 크게 달라지지 않도록 여유를 둔다. 제목 48/36/26px, 카드 제목 21px, 본문 16~18px, 보조 14px. 행간 1.45~1.65. 본문 14px 아래로 내리지 않는다.

## 4. Spacing & Layout

4px 기반, 간격은 8/12/16/24/32/48/72px. 콘텐츠 최대 폭 1180px. 모바일 16px 좌우, 태블릿 24px, 데스크톱 32px. 780px 아래 목록은 한 열, 내비게이션은 하단으로 이동한다. 주 콘텐츠는 문서 스크롤을 사용한다.

## 5. Components

- **Top navigation / mobile bottom navigation**: 네 탭(시작·장소·준비·안전). 현재 탭에 텍스트 강조와 `aria-current`. 키보드 포커스가 보인다.
- **Place card**: 이름·지역·미확인 상태·상세 버튼. 전체 카드가 암묵적인 링크가 아니라 명시적 버튼을 사용한다. hover는 정보 밀도를 바꾸지 않는다.
- **Filter control**: 지역, 대중교통, 대여 조건. 선택은 `aria-pressed`로 노출한다. 확인된 정보가 없을 때 빈 결과 상태가 원인을 알려 준다.
- **Checklist item**: 명시적 체크박스, 라벨, 선택 상태. 저장 상태는 같은 브라우저에만 적용된다.
- **Info row**: 확인/미확인을 문장으로 적고 근거 상태를 함께 표시한다. 존재하지 않는 수치나 장소 사진을 꾸미지 않는다.
- **Primary CTA**: 바다색 면, 흰 글자, 명확한 동사. default/hover/active/focus 스타일, 44px 이상 높이.

## 6. Motion & Interaction

기능 상태 전환에만 150~220ms 투명도/transform을 사용한다. 장식용 무한 모션은 없다. `prefers-reduced-motion`일 때 위치 이동 없이 즉시 상태를 표시한다. 버튼 누름은 같은 프레임에 반응한다.

## 7. Depth & Surface

기본은 종이와 흰 카드의 톤 차이, 상세 패널만 얕은 그림자. 카드 16px, 입력·버튼 10px, pill 999px. 사진을 흉내 내는 일러스트는 사용하지 않는다.

## 8. Accessibility Constraints & Accepted Debt

WCAG 2.2 AA를 목표로 본문 대비와 키보드 조작을 확인한다. 버튼과 링크는 의미 있는 텍스트를 사용한다. 정보 미확인은 색상과 함께 텍스트로 반복한다. 실시간 해양 정보, 현장 시설 검증, 지도 좌표는 제공되지 않으며 서비스에 이 한계를 표시한다. 외부 배포·현장 데이터 검증은 이 데모의 범위 밖이다.
