comci.getSchoolNumber(학교명)    
결괏값은 아래와 같은 배열, 비동기 함수이다   
[{"name":"동패중학교(경기)","number":68346},{"name":"동패고등학교(경기)","number":34178}]    
   
comci.getTimeTable(학교번호, 학년, 반, 다음주_시간표_여부)   
결괏값은 아래와 같은 배열이고, 이 함수는 비동기 함수이다.    
{"수업시간":["1(09:05)","2(10:05)","3(11:05)","4(12:05)","5(14:00)","6(15:00)","7(16:00)","8(17:00)"],"시간표":[["통과(이숙)","한국사(최재)","영어(정다)","수학(심진)","미술(황지)","국어(유신)","통사(김준)"],["기가(권효)","영어(정다)","진직(윤선)","과탐(이숙)","체육(김현)","수학(심진)","국어(유신)"],["창독(조승)","통사(김준)","영어(정다)","통과(이숙)","한국사(최재)","수학(심진)","미술(황지)"],["국어(유신)","기가(권효)","미술(황지)","영어(정다)","체육(김현)","수학(심진)","한국사(최재)"],["통사(김준)","통과(이숙)","국어(유신)","창체(창체)","창체(창체)","창체(창체)"],[]]}

comci.sortTable(위 함수의 값)   
기본적으로 시간표를 정리해준다. 동기적으로 처리된다.   
리턴값은 다음과 같다.   
월   
1(09:05)|통과(이숙)   
2(10:05)|한국사(최재)   
3(11:05)|영어(정다)   
4(12:05)|수학(심진)   
5(14:00)|미술(황지)   
6(15:00)|국어(유신)   
7(16:00)|통사(김준)   
   
   
화   
1(09:05)|기가(권효)   
2(10:05)|영어(정다)   
3(11:05)|진직(윤선)   
4(12:05)|과탐(이숙)   
5(14:00)|체육(김현)   
6(15:00)|수학(심진)   
7(16:00)|국어(유신)   
   
   
수   
1(09:05)|창독(조승)   
2(10:05)|통사(김준)   
3(11:05)|영어(정다)   
4(12:05)|통과(이숙)   
5(14:00)|한국사(최재)   
6(15:00)|수학(심진)   
7(16:00)|미술(황지)   
   
   
목   
1(09:05)|국어(유신)   
2(10:05)|기가(권효)   
3(11:05)|미술(황지)   
4(12:05)|영어(정다)   
5(14:00)|체육(김현)   
6(15:00)|수학(심진)   
7(16:00)|한국사(최재)   
   
   
금   
1(09:05)|통사(김준)   
2(10:05)|통과(이숙)   
3(11:05)|국어(유신)   
4(12:05)|창체(창체)   
5(14:00)|창체(창체)   
6(15:00)|창체(창체)   
   
   
토   
   
   
   
일   
   
참고로, 에러 처리 따윈 귀찮아서 하지 않았으므로 알아서 처리해주길
