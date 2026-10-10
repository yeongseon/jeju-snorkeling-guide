import './style.css'
import { checklist, filterPlaces, places, safetyItems } from './data.js'

const app = document.querySelector('#app')
const storageKey = 'jeju-snorkeling-guide-checklist-v1'
const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
const state = {
  tab: 'home',
  region: '전체',
  search: '',
  transport: false,
  rental: false,
  selected: null,
  checked: new Set(Array.isArray(saved) ? saved.filter((id) => checklist.some((item) => item.id === id)) : []),
}

const sections = [
  { id: 'home', label: '시작' },
  { id: 'places', label: '장소' },
  { id: 'prepare', label: '준비' },
  { id: 'safety', label: '안전' },
]

function icon(name) {
  const paths = {
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    wave: '<path d="M2 15c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 2 2M2 20c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`
}

function navigation(mobile = false) {
  return `<nav class="${mobile ? 'bottom-nav' : 'nav'}" aria-label="주요 메뉴">${sections.map(({ id, label }) => `<button type="button" data-tab="${id}" class="nav-item ${state.tab === id ? 'is-current' : ''}" ${state.tab === id ? 'aria-current="page"' : ''}>${label}</button>`).join('')}</nav>`
}

function placeCard(place) {
  return `<article class="place-card"><div class="place-art place-art--${place.shade}" aria-hidden="true"><span>${place.region}</span><div class="place-art__horizon"></div></div><div class="place-card__body"><div class="place-card__heading"><h3>${place.name}</h3><span class="status">현장 정보 미확인</span></div><p>${place.region} · 가이드북에 수록된 장소</p><button type="button" class="text-action" data-place="${place.id}">정보 상태 살펴보기 ${icon('arrow')}</button></div></article>`
}

function home() {
  return `<section class="hero"><div class="hero__copy"><p class="eyebrow">HRA 수업용 정적 웹서비스</p><h1>처음 떠나는 제주 바다,<br><em>준비부터 장소 탐색까지.</em></h1><p>원문에 나온 여섯 장소를 살펴보고 준비물과 안전 확인 항목을 정리하세요. 시설·교통 정보는 확인되지 않았습니다.</p><button type="button" class="primary-action" data-tab="places">여섯 장소 살펴보기 ${icon('arrow')}</button><p class="hero__fine">현재 안전이나 현장 운영을 판정하지 않습니다.</p></div><div class="hero__visual" aria-hidden="true"><div class="visual-sun"></div><div class="visual-wave visual-wave--back"></div><div class="visual-wave visual-wave--front"></div><span>JEJU / FIELD NOTES</span></div></section><section class="intro-strip"><div><span>01</span><strong>6곳의 이름과 지역</strong><p>원문 4쪽의 목록을 기반으로 구성</p></div><div><span>02</span><strong>직접 고르는 준비물</strong><p>이 브라우저에만 체크 상태 보관</p></div><div><span>03</span><strong>안전을 위한 확인</strong><p>현장·공식 정보를 방문 전 재확인</p></div></section><section class="section-preview"><div><p class="eyebrow">탐색 시작</p><h2>어디로 갈지보다<br>무엇을 확인할지 먼저.</h2><p>PDF가 말하지 않는 시설 정보는 미확인으로 남겼습니다. 확실하지 않은 추천을 만들지 않는 것도 좋은 서비스 설계입니다.</p><button class="text-action" type="button" data-tab="places">장소 목록으로 이동 ${icon('arrow')}</button></div><div class="preview-card"><span>가이드북 수록지</span><strong>제주의 6곳</strong><p>구좌·김녕 / 제주 서쪽 / 서귀포</p><div class="preview-card__line"></div><small>현장 시설과 운영 여부는 방문 전 확인</small></div></section>`
}

function placeList() {
  const results = filterPlaces(state)
  const uncertain = state.transport || state.rental
  return `<section class="page-intro"><p class="eyebrow">장소 탐색</p><h1>제주의 여섯 장소</h1><p>이름과 지역은 가이드북에서 가져왔습니다. 교통·대여·시설 정보는 현재 검증되지 않아 추천 조건에 포함하지 않습니다.</p></section><div class="search-row"><label for="place-search">장소 이름 검색</label><input id="place-search" type="search" placeholder="장소 이름을 입력하세요" value="${state.search}" autocomplete="off" /></div><div class="filters"><div class="filter-group" aria-label="지역 선택"><span>지역</span>${['전체', '구좌·김녕', '제주 서쪽', '서귀포'].map((region) => `<button type="button" data-region="${region}" aria-pressed="${state.region === region}">${region}</button>`).join('')}</div><div class="filter-group" aria-label="추가 조건"><span>확인하고 싶은 조건</span><button type="button" data-filter="transport" aria-pressed="${state.transport}">대중교통</button><button type="button" data-filter="rental" aria-pressed="${state.rental}">현장 대여</button></div></div>${uncertain ? `<div class="empty-result" role="status"><span>정보 확인 필요</span><h2>조건이 확인된 장소가 아직 없습니다</h2><p>가이드북에는 모든 장소의 교통·대여 여부가 검증된 목록으로 정리돼 있지 않습니다. 일치한다고 추정해 추천하지 않습니다.</p><button class="secondary-action" type="button" data-clear-filters>추가 조건 지우고 전체 보기</button></div>` : results.length ? `<p class="result-count">${results.length}곳 표시 · 안전 순위가 아닙니다</p><div class="place-grid">${results.map(placeCard).join('')}</div>` : `<div class="empty-result" role="status"><h2>이름에 맞는 장소가 없습니다</h2><p>검색어를 지우거나 지역을 전체로 바꿔 보세요.</p></div>`}`
}

function detail() {
  const place = places.find((item) => item.id === state.selected)
  if (!place) return placeList()
  const unknown = [
    ['장비 대여', '현장 대여 여부와 비용을 확인해야 합니다.'],
    ['샤워·편의시설', '운영 여부와 이용 조건을 확인해야 합니다.'],
    ['대중교통·주차', '정류장·이동 경로·주차 허용 구역을 확인해야 합니다.'],
    ['안전요원·운영', '현장 안전 관리와 출입 제한 상태를 확인해야 합니다.'],
  ]
  return `<section class="detail-head"><button type="button" class="back-action" data-back>${icon('back')} 목록으로 돌아가기</button><p class="eyebrow">${place.region} · PDF 4쪽에 수록</p><h1>${place.name}</h1><p>원문 표기 그대로 옮겼습니다. 공식 명칭과 방문 조건은 별도 검증 대상입니다.</p></section><div class="detail-layout"><div class="detail-art place-art place-art--${place.shade}" aria-label="실제 장소 사진이 아닌 추상 색면"><span>실제 장소 사진 아님</span><div class="place-art__horizon"></div></div><div class="detail-note"><span class="status">장소 정보 검증 전</span><h2>추천이 아닌 확인 목록입니다</h2><p>현재 기상·조류·수심이나 시설 운영 여부를 이 서비스가 판단하지 않습니다. 방문 전에 공식 및 현장 안내를 확인하세요.</p></div></div><h2 class="subheading">방문 전에 확인할 정보</h2><div class="facts-grid">${unknown.map(([title, text]) => `<div class="fact"><span>미확인</span><h3>${title}</h3><p>${text}</p></div>`).join('')}</div><div class="source-note">출처: HRA 19기 2조 가이드북 4쪽의 장소명·지역. 시설별 최신 상태는 별도 검증이 필요합니다.</div>`
}

function preparation() {
  const count = state.checked.size
  const percent = Math.round((count / checklist.length) * 100)
  return `<section class="page-intro"><p class="eyebrow">출발 전 준비</p><h1>나의 준비물 체크</h1><p>필요한 장비는 활동 방식과 현장 조건에 따라 달라집니다. 이 목록은 스스로 점검할 수 있는 출발점이며, 대여 가능 여부는 보장하지 않습니다.</p></section><div class="progress-wrap"><div><strong>${count} / ${checklist.length} 확인</strong><span>${percent}%</span></div><progress value="${count}" max="${checklist.length}">${percent}%</progress><p>체크 상태는 현재 브라우저에만 보관됩니다.</p></div><div class="check-groups">${['물에서 쓸 장비', '물 밖 준비'].map((group) => `<section class="check-group"><h2>${group}</h2>${checklist.filter((item) => item.group === group).map((item) => `<label class="check-row"><input type="checkbox" data-check="${item.id}" ${state.checked.has(item.id) ? 'checked' : ''}/><span>${item.label}</span></label>`).join('')}</section>`).join('')}</div><div class="source-note">가이드북 3~4쪽 준비물 항목을 교육용으로 재구성했습니다. 장소별 대여·필수 여부는 현장에 확인하세요.</div>`
}

function safety() {
  return `<section class="page-intro"><p class="eyebrow">초행자를 위한 안전 확인</p><h1>바다에 들어가기 전, 다시 확인</h1><p>이 서비스는 실시간 해양 안전 판단 시스템이 아닙니다. 특정 장소·시간이 안전하다고 보장하지 않습니다.</p></section><div class="safety-lead"><span>${icon('wave')}</span><div><strong>오늘의 상태는 이 화면에서 알 수 없습니다</strong><p>현지 공식 안내와 안전요원, 기상·해양 정보를 방문 당일 다시 확인하세요.</p></div></div><ol class="safety-list">${safetyItems.map((text, index) => `<li><span>0${index + 1}</span><p>${text}</p></li>`).join('')}</ol><div class="source-note">가이드북의 일반 안전 항목을 참고하되, 특정 물때·수심·장소를 안전하다고 단정하는 표현은 제외했습니다.</div>`
}

function render() {
  app.innerHTML = `<header class="site-header"><div class="shell header-inner"><button type="button" class="brand" data-tab="home"><span class="brand-mark">${icon('wave')}</span><span>제주 스노클링 가이드<small>교육용 시제품</small></span></button>${navigation()}</div></header><main id="main" class="shell">${state.tab === 'home' ? home() : state.tab === 'places' ? state.selected ? detail() : placeList() : state.tab === 'prepare' ? preparation() : safety()}</main><footer class="site-footer"><div class="shell"><strong>제주 스노클링 가이드</strong><p>HRA 19기 2조의 2026년 가이드북을 바탕으로 만든 교육용 시제품. 장소별 최신 시설·안전 정보는 확인되지 않았습니다.</p></div></footer>${navigation(true)}`
}

app.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-tab]')
  if (tab) {
    state.tab = tab.dataset.tab
    state.selected = null
    render()
    window.scrollTo(0, 0)
    return
  }
  const place = event.target.closest('[data-place]')
  if (place) {
    state.selected = place.dataset.place
    render()
    window.scrollTo(0, 0)
    return
  }
  if (event.target.closest('[data-back]')) {
    state.selected = null
    render()
    return
  }
  const region = event.target.closest('[data-region]')
  if (region) {
    state.region = region.dataset.region
    render()
    return
  }
  const filter = event.target.closest('[data-filter]')
  if (filter) {
    state[filter.dataset.filter] = !state[filter.dataset.filter]
    render()
    return
  }
  if (event.target.closest('[data-clear-filters]')) {
    state.transport = false
    state.rental = false
    render()
  }
})

app.addEventListener('input', (event) => {
  if (event.target.id !== 'place-search') return
  const position = event.target.selectionStart
  state.search = event.target.value
  render()
  const input = document.querySelector('#place-search')
  input.focus()
  input.setSelectionRange(position, position)
})

app.addEventListener('change', (event) => {
  const input = event.target.closest('[data-check]')
  if (!input) return
  if (input.checked) state.checked.add(input.dataset.check)
  else state.checked.delete(input.dataset.check)
  localStorage.setItem(storageKey, JSON.stringify([...state.checked]))
  render()
})

render()
