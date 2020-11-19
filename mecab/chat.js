/*
-
기본 액션
> url 명령 실행

트리거 (단어 스토리)
> 단어입력

파라미터 (봇이 되묻기 후 받아야하는 정보)
> 되묻기 질문, 파라미터


-
1. 관리자가 명령실행을 위해 입력한 단어 DB 저장 - 추후 관련있는 것끼지 그룹화하여 검색범위 최적화
2. 사용자가 봇을 통해 입력한 문장 형태소 분석
3. DB 저장된 단어 리스트가져와서 가장 유사도가 높은 항목 추출
4. 사용자에게 실행여부 확인
5. 실행


-
https://www.youtube.com/watch?v=6yCD8nw2ZQM&feature=youtu.be
https://jfun.tistory.com/199?category=851249

category = {
	"주문" : ["주문", "배달"]
	"예약" : ["예약", "잡아줘"]
	"정보" : ["정보", "알려"]
}

entity = {
	"주문" : {"메뉴" : None, "장소" : None, "날짜" : None},
	"예약" : {"장소" : None, "날짜" : None},
	"정보" : {"대상" : None}
}


dict_entity = {
	'date' : ['오늘','내일','모래'],
	'loc' : ['판교','야탑'],
	'menu' : ['피자','햄버거'],
	'hotel' : ['호텔','여관','민박'],
	'travel' : ['여행','관광','카페']
}


형태소 분석
preprocessed = mecab.pos(입력 데이터)


예: '판교에 지금 주문해줘'
[('판교', 'NNG'), ('에', 'JKB'), ('지금', 'NNG'), ('피자', 'NNG'), ('주문', 'NNG'), ('해', 'XSV+EC'), ('줘', 'VX+EC')]


1. Intent 도출(Rule Based) - Char CNN ?
category 정보에 기반하여 비교하며 값 추출
주문

2. NER 도출 (Rule Based) - LSTM 기법 ?
menu = ['피자', '햄버거', '치킨']
loc = ['판교', '야탑', '서현']
date = ['지금', '내일', '모레']

3. Dictionary 기반 slot 구성
slot_value = entity['주문']
for pos_tag in preprocessed :
	if pos_tag[i] in ['NNG', 'NNP', 'SL', 'MAG'] :
		if pos_tag[0] in menu :
			slot_value['메뉴'] = pos_tag[0]
		elif pos_tag[0] in loc :
			slot_value['장소'] = pos_tag[0]
		elif pos_tag[0] in date :
			slot_value['날짜'] = pos_tag[0]
			
4. 빈 slot 검색
slot_value 에서 비어있는 값을 찾고, 해당 값을 다시 질문(사용자에게 값 요구)해야 한다.


-
Intent 와 NER 모델 ?
*/
