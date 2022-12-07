# 프로그래머스 데브코스 1차 프로젝트

이 프로젝트는 프로그래머스 데브코스 1차 프로젝트인 클론 코딩의 react 저장소 입니다.

[BE 저장소](https://github.com/park-se-jun/react-springboot-rest-api)


## 프로젝트 목적

프로그래머스 개인 프로젝트 인 [Spring Boot 상품 관리 API 구현](https://github.com/prgrms-be-devcourse/react-springboot-rest-api)을 강의 내용을 바탕으로 cloning 하고 API를 구현하는 1차 과제입니다.

저는 도메인을 영화로 변경한 후 DB 설계, API 설계, spring boot, react코드 작성을 진행하였습니다.

- 도메인에 맞는 DB를 생각하고 설계합니다.
- 사용자의 행동을 중심으로 도메인에 맞는 API 설계을 처음부터 끝까지 해봅니다.
- spring boot를 이용해 rest api 를 개발합니다.
- api에 대응하는 프론트엔드 개발도 진행합니다.
- react 및 spring boot의 사용법을 익힙니다



## 프로젝트 설계 방식

본 프로젝트를 진행하면서 저는 아래의 과정을 거쳐 개발을 진행 하였습니다.
1. figma를 활용한 페이지별 필요한 데이터 정리.
2. db 설계(erd 그리기)
3. 1번을 바탕으로 기능 설계 및 API 설계
4. API 개발
5. react 개발
6. 버그 수정

### 필요 데이터 정리
Figjam을 활용해 [MegaBox](https://www.megabox.co.kr/booking)와 생각해본 내용을 바탕으로 예상 화면을 뽑고,
해당 화면에서 사용자가 할 수 있는 상호작용을 정리한 후, 필요할 것으로 예상되는 데이터(스키마)를 산출헀습니다.
그리고 시간 상의 문제로 먼저 취해야할 부분을 선정 하여 우선순위를 두었습니다.

![상호작용정리](./docs/1차프로젝트%20설계%20-%20페이지%20구상.png)
![스키마정리](./docs/1%EC%B0%A8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%84%A4%EA%B3%84%20%EC%8A%A4%ED%82%A4%EB%A7%88.png)
### db 설계

사용자에게 보여지는 화면을 기준으로 생각한 스키마를 ER 다이어그램을 그리며 조금씩 고도화 시켰습니다.
![DB 고도화](./docs/erd%20%ED%9D%94%EC%A0%81/%EC%98%81%ED%99%94%20%EC%98%88%EB%A7%A4%20%EC%84%A4%EA%B3%84_221204_033737_5.jpg)


최종적으로 사용한 DB 구조는 다음과 같습니다.

![최종DB](./docs/%EC%B5%9C%EC%A2%85DB.png)

### 기능 정리,API 설계

기능을 정리한 것으로 바탕으로 생각한 API의 모습과 실제 구현한API의 모습은 다음과 같습니다. 우선순위에 따라 모든 사항을 구현하진 못했습니다. 

#### 설계 API
![설계API](./docs/api%EC%84%A4%EA%B3%84.png)


#### 구현된 API

##### `POST`
- Schedule
```
/api/schedules
```
- Reservation
```
/api/reservations
```
##### `GET`
- Health
```
/health
```
- Movie
```
/api/movies/active
```
- Theater
```
/api/theaters
```
- Schedule
```
/api/schedules?theaterId={theaderId}&date={date}&movieId={movieId}
```
```
/api/schedules/{scheduleId}
```
```
/api/schedules/{scheduleId}/seats
```
- Reservation
```
/api/reservation/lookup/{userPhone}
```
##### `PUT`
😭

##### `DELETE`
😭
### 개발 언어
- front-end
    - 프레임워크 : react
    - 주요 의존성:
        - axios
        - recoil
        - bootstrap
        - react-seat-picker
        - react-modal
- back-end
    - 프레임워크 : spring boot
    - 주요 의존성 :
        - spring-boot-starter-jdbc
        - spring-boot-starter-web



## 실제 프로젝트 화면

- 첫페이지
![첫페이지](./docs/%ED%99%94%EB%A9%B4%EA%B5%AC%EC%84%B1/%EC%B2%AB%ED%8E%98%EC%9D%B4%EC%A7%80.png)
- 좌석선택 페이지
![좌석선택](./docs/%ED%99%94%EB%A9%B4%EA%B5%AC%EC%84%B1/%EC%A2%8C%EC%84%9D%20%EC%84%A0%ED%83%9D.png)
- 예매 성공시 alert창
![예매성공](./docs/%ED%99%94%EB%A9%B4%EA%B5%AC%EC%84%B1/%EC%98%88%EB%A7%A4%EC%84%B1%EA%B3%B5.png)
- 조회 모달
![조회모달](./docs/%ED%99%94%EB%A9%B4%EA%B5%AC%EC%84%B1/%EC%A1%B0%ED%9A%8C%20%EB%AA%A8%EB%8B%AC.png)
- 조회 결과
![조회결과](./docs/%ED%99%94%EB%A9%B4%EA%B5%AC%EC%84%B1/%EC%A1%B0%ED%9A%8C%20%EA%B2%B0%EA%B3%BC.png)

## 느낀점

### 기억에 남는 trouble shooting

### 아쉬운점


## 향후 목표