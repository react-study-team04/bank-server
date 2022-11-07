# 모임통장 백엔드

---

<br/><br/><br/><br/><br/>

# API명세

<br/>

## BASEURL: 3.36.227.33:3333

<br/><br/><br/>

### 핑퐁

> BASEURL/ping

<br/>

기대값

> pong

<br/><br/><br/><br/><br/>

### 회원가입

> BASEURL/signup

필수값

```
id: 아이디
password: 패스워드
name: 이름
```

<br/><br/><br/><br/><br/>

### 로그인

> BASEURL/signin

필수값

```
id: 아이디
password: 패스워드
```

반환값

```
idx
id
name
token [api 요청시 헤더에 token key값으로 날려주세요.]
```
