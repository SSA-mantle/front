<!-- src/views/MyPageView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content mypage">
      <!-- 1. Profile Section -->
      <section class="mypage__profile card">
        <div class="profile-info">
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text">
            <h1 class="username">{{ nickname }}님</h1>
            <p class="user-desc">{{ email }}</p>
          </div>
        </div>
        <router-link to="/profile/edit" class="btn-edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon">
            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.02.12-.106.152-.192.201l-2.415.854c-.12.043-.21.063-.326.063-.413 0-.827-.15-1.17-.461L2.83 4.19a1.875 1.875 0 0 0-2.652 2.652l1.857 2.118c.31.343.46.757.46 1.17 0 .117-.02.207-.063.327l-.854 2.414c-.05.087-.082.173-.202.193L-.073 14.77c-.904.152-1.567.934-1.567 1.85 0 .917.663 1.699 1.567 1.85l1.545.253c.12.02.152.106.201.192l.854 2.415c.043.12.063.21.063.326 0 .413-.15.827-.461 1.17l-2.118 1.857a1.875 1.875 0 0 0 2.652 2.652l2.118-1.857c.343-.31.757-.46 1.17-.46.117 0 .207.02.327.063l2.414.854c.087.05.173.082.193.202l.253 1.545c.152.904.934 1.567 1.85 1.567.917 0 1.699-.663 1.85-1.567l.253-1.545c.02-.12.106-.152.192-.201l2.415-.854c.12-.043.21-.063.326-.063.413 0 .827.15 1.17.461l2.118 1.857a1.875 1.875 0 0 0 2.652-2.652l-1.857-2.118c-.31-.343-.46-.757-.46-1.17 0-.117.02-.207.063-.327l.854-2.414c.05-.087.082-.173.202-.193l1.545-.253c.904-.152 1.567-.934 1.567-1.85 0-.917-.663-1.699-1.567-1.85l-1.545-.253c-.12-.02-.152-.106-.201-.192l-.854-2.415c-.043-.12-.063-.21-.063-.326 0-.413.15-.827.461-1.17l2.118-1.857a1.875 1.875 0 0 0-2.652-2.652l-2.118 1.857c-.343.31-.757.46-1.17.46-.117 0-.207-.02-.327-.063l-2.414-.854c-.087-.05-.173-.082-.193-.202L12.928 2.25Z" clip-rule="evenodd" />
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          </svg>
          정보수정
        </router-link>
      </section>

      <!-- 2. Stats Section -->
      <section class="mypage__stats">
        <div class="stat-card card">
          <div class="stat-card__icon icon-blue">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
            </svg>
            <span>총 게임</span>
          </div>
          <div class="stat-card__value text-blue">142</div>
        </div>

        <div class="stat-card card">
          <div class="stat-card__icon icon-green">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.657 0 3.107.936 3.903 2.327l2.25 4a2.25 2.25 0 0 1-3.906 2.196L12 8.75l-2.247 2.023A2.25 2.25 0 0 1 5.847 8.578l2.25-4a2.25 2.25 0 0 1 .506-.78ZM2.25 13.5a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v1.5a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-1.5Zm7.114 4.886A.75.75 0 0 0 10.5 19.5h3a.75.75 0 0 0 1.136-1.114l-2.022-2.247C12.385 15.89 12.196 15.75 12 15.75s-.385.14-.614.389l-2.022 2.247Z" clip-rule="evenodd" />
            </svg>
            <span>완료</span>
          </div>
          <div class="stat-card__value text-green">118</div>
        </div>

        <div class="stat-card card">
          <div class="stat-card__icon icon-indigo">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clip-rule="evenodd" />
            </svg>
            <span>승률</span>
          </div>
          <div class="stat-card__value text-indigo">83.1%</div>
        </div>

        <div class="stat-card card">
          <div class="stat-card__icon icon-orange">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
            </svg>
            <span>최고 순위</span>
          </div>
          <div class="stat-card__value text-orange">2위</div>
        </div>

        <div class="stat-card card">
          <div class="stat-card__icon icon-purple">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.941a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.174.75.75 0 0 1-1.334-.69 12.7 12.7 0 0 1 6.163-5.858l.484-1.086-4.251 1.63a.75.75 0 0 1-.537-1.4l5.941-2.28h.001ZM8.5 4.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75Zm-5.32 5.923a.75.75 0 0 1 1.05.109 25.56 25.56 0 0 1 2.375 3.197.75.75 0 1 1-1.305.742 24.06 24.06 0 0 0-2.23-3 0 75.75 0 0 1-.109-1.05Zm15.82 1.487a.75.75 0 0 1 .11 1.05 25.29 25.29 0 0 1-2.936 3.653.75.75 0 0 1-1.12-1.002 23.79 23.79 0 0 0 2.766-3.44.75.75 0 0 1 .129-.26Z" clip-rule="evenodd" />
            </svg>
            <span>평균 시도</span>
          </div>
          <div class="stat-card__value text-purple">9.3</div>
        </div>

        <div class="stat-card card">
           <div class="stat-card__icon icon-red">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.177 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
            </svg>
            <span>연속 기록</span>
          </div>
          <div class="stat-card__value text-red">7일</div>
        </div>
      </section>

      <!-- 3. Achievements Section -->
      <section class="mypage__achievements">
        <h2 class="section-title">업적</h2>
        <div class="achievement-grid">
           <!-- Achievement items match the image -->
          <div class="achievement-card card completed">
            <div class="medal-icon bg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="info">
              <h3>첫 승리</h3>
              <p>첫 게임 완료</p>
            </div>
          </div>

          <div class="achievement-card card completed">
             <div class="medal-icon bg-blue">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="info">
               <h3>연속 도전자</h3>
              <p>7일 연속 플레이</p>
            </div>
          </div>

          <div class="achievement-card card completed">
             <div class="medal-icon bg-blue">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="info">
               <h3>완벽주의자</h3>
              <p>5회 이하로 정답 맞추기</p>
            </div>
          </div>

          <div class="achievement-card card completed">
             <div class="medal-icon bg-blue">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
              </svg>
            </div>
             <div class="info">
               <h3>랭커</h3>
              <p>상위 10위 안에 들기</p>
            </div>
          </div>

          <div class="achievement-card card completed">
             <div class="medal-icon bg-blue">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="info">
               <h3>백전백승</h3>
              <p>100게임 완료</p>
            </div>
          </div>
          
           <div class="achievement-card card locked">
             <div class="medal-icon bg-gray">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
              </svg>
            </div>
             <div class="info">
               <h3>전설의 시작</h3>
              <p>1위 달성</p>
            </div>
          </div>

        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

const authStore = useAuthStore();
const nickname = computed(() => authStore.user?.nickname || '알 수 없음');
const email = computed(() => authStore.user?.email || '');
</script>

<style lang="scss" scoped>
.mypage {
  max-width: 1000px;
  margin: 1.5rem auto 4rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  // 공통 카드 스타일
  .card {
     background: white;
     border-radius: 1rem;
     padding: 1.5rem;
     border: 1px solid var(--color-border);
     box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  // 1. 프로필 섹션
  &__profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .profile-info {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1rem;
        background-color: #3b82f6; // Blue 500
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
            width: 2rem;
            height: 2rem;
        }
      }

      .text {
        .username {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-heading);
          margin: 0;
          line-height: 1.2;
        }
        .user-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          margin: 0;
        }
      }
    }

    .btn-edit {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      background-color: #f3f4f6; // Gray 100
      color: #4b5563; // Gray 600
      border-radius: 0.75rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: #e5e7eb; // Gray 200
      }

      .icon {
        width: 1.1rem;
        height: 1.1rem;
      }
    }
  }

  // 2. 통계 섹션
  &__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    .stat-card {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      
      &__icon {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text-muted);
        font-weight: 600;
        font-size: 0.9rem;

        svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        &.icon-blue svg { color: #3b82f6; }
        &.icon-green svg { color: #10b981; }
        &.icon-indigo svg { color: #6366f1; }
        &.icon-orange svg { color: #f59e0b; }
        &.icon-purple svg { color: #a855f7; }
        &.icon-red svg { color: #ef4444; }
      }

      &__value {
        font-size: 2rem;
        font-weight: 800;
        line-height: 1;

        &.text-blue { color: #3b82f6; }
        &.text-green { color: #10b981; }
        &.text-indigo { color: #6366f1; }
        &.text-orange { color: #f59e0b; }
        &.text-purple { color: #a855f7; }
        &.text-red { color: #ef4444; }
      }
    }
  }

  // 3. 업적 섹션
  &__achievements {
    .section-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--color-text-heading);
        margin-bottom: 1rem;
        padding-left: 0.5rem;
    }

    .achievement-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .achievement-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      border: 1px solid #e0f2fe; // Light blue border for completed
      background-color: #f0f9ff; // Light blue background

      &.completed {
         .medal-icon {
            background-color: #3b82f6; // Blue 500
            color: white;
         }
      }

      &.locked {
        background-color: #f9fafb; // Gray 50
        border-color: var(--color-border);
        
        .medal-icon {
            background-color: #e5e7eb; // Gray 200
            color: white;
        }

        .info h3, .info p {
             color: #9ca3af; // Gray 400
        }
      }

      .medal-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        svg {
            width: 1.5rem;
            height: 1.5rem;
        }
      }

      .info {
        h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.25rem;
        }
        p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .mypage {
    &__stats {
      grid-template-columns: 1fr;
    }
    
    &__achievements .achievement-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
