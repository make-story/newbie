# 프로젝트명 `newbie` (대화형 명령 실행기)
  
> `MeCab` 형태소 분석기 활용  
https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/  
  
> 정리자료(형태소분석기)  
http://makestory.net/media/#/view/75  
  
----------  
  
-  “커맨드 라인(CLI)에서 대화형 명령실행을 지원하는 도구들 처럼, 시놀리지 등 채팅 메시지를 통한 대화형 명령 실행 도구”  
사용자가 입력(문장)한 메시지를 읽어들여, 분석(서버)하고, 사용자 의도를 파악(형태소, 데이터학습)하여, 사용자가 하고자하는(원하는) 최종 결과에 도달(실행) 할 수 있도록 다시 묻거나(선택 또는 입력) 다시 분석하는 과정을 반복할 수 있습니다.  
사용자가 입력(문장)한 것에 대해, 관련 시나리오가 없을 경우, 입력 내용(문장)을 DB에 저장하고, 관리자 페이지에 해당 리스트를 노출한다. (시나리오 생성이 필요하다는 것을 관리자가 인지할 수 있도록 한다)  

- 사용자 메시지 입력 -> 서버 전송 -> 형태소 분석 -> 기존 저장된 시나리오와 유사도 파악 -> 시나리오 실행절차에 따라 진행 (응답 또는 계속 진행)  
