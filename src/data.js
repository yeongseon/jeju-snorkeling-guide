export const places = [
  { id: 'conan', name: '코난비치', region: '구좌·김녕', shade: 'a' },
  { id: 'segi', name: '세기알해변', region: '구좌·김녕', shade: 'b' },
  { id: 'panpo', name: '판포포구', region: '제주 서쪽', shade: 'c' },
  { id: 'wolryeong', name: '월령포구', region: '제주 서쪽', shade: 'd' },
  { id: 'dorippal', name: '도리빨해변', region: '서귀포', shade: 'e' },
  { id: 'gangjeong', name: '강정천', region: '서귀포', shade: 'f' },
]

export const checklist = [
  { id: 'mask', label: '스노클링 수경', group: '물에서 쓸 장비' },
  { id: 'vest', label: '구명조끼', group: '물에서 쓸 장비' },
  { id: 'shoes', label: '아쿠아슈즈', group: '물에서 쓸 장비' },
  { id: 'towel', label: '수건과 여벌 옷', group: '물 밖 준비' },
  { id: 'water', label: '식수와 간식', group: '물 밖 준비' },
  { id: 'sun', label: '자외선 차단 물품', group: '물 밖 준비' },
]

export const safetyItems = [
  '출발 전 최신 기상, 파도, 조류와 물때를 공식 정보로 확인하세요.',
  '현장의 출입 제한, 안전요원 안내와 운영 여부를 확인하세요.',
  '장비 상태를 점검하고 혼자 활동하지 마세요.',
  '상황이 위험하거나 불확실하면 입수하지 말고 활동을 중단하세요.',
]

export function filterPlaces({ region = '전체', search = '', transport = false, rental = false } = {}) {
  if (transport || rental) return []
  const term = search.trim().toLocaleLowerCase('ko')
  return places.filter((place) => (region === '전체' || place.region === region) && (!term || place.name.toLocaleLowerCase('ko').includes(term)))
}
