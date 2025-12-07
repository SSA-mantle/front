<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <section class="app-footer__section">
        <h2 class="app-footer__logo">SSA-mantle</h2>
        <p class="app-footer__text">유사도를 기반으로 정답 단어를 찾는 게임입니다.</p>
        <p class="app-footer__copyright">© 2025 SSA-mantle. All rights reserved.</p>
      </section>

      <section class="app-footer__section">
        <h3 class="app-footer__heading">팀 정보</h3>
        <p class="app-footer__text">소속: SSAFY 14기 서울 9반</p>
        <p class="app-footer__text">팀명: Pigeon3</p>
        <p class="app-footer__text">팀원 : 길태환, 윤승혁, 오민재</p>
      </section>

      <section class="app-footer__section">
        <h3 class="app-footer__heading">문의</h3>
        <p class="app-footer__text">📧 pigeon3@ssafy.com</p>
        <p class="app-footer__text">💻 GitHub</p>
      </section>
    </div>

    <div class="app-footer__bottom">이 게임은 SSAFY 교육생들을 위해 Pigeon3 팀이 제작했습니다.</div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-footer {
  background-color: #020617;
  color: #e5e7eb;
  padding-top: 2rem; // 위쪽 여백
  margin-top: 2.5rem;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2.25rem; // 좌우/아래 여백
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 2.5rem;
  }

  &__section {
    font-size: 1rem; // 전체 글자 크기
  }

  &__logo {
    margin: 0 0 0.6rem;
    font-size: 1.3rem;
    font-weight: 700;
  }

  &__text {
    margin: 0.18rem 0;
    color: #9ca3af;
    line-height: 1.5;
  }

  &__copyright {
    margin-top: 0.9rem;
    font-size: 1rem;
    color: #6b7280;
  }

  &__heading {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;
  }

  &__bottom {
    border-top: 1px solid #1f2933;
    padding: 1rem 2rem 1.4rem;
    text-align: center;
    font-size: 0.85rem; // 하단 문구 글자 크기
    color: #9ca3af;
  }
}
</style>
