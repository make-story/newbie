import '../css/index.css';

const template: string = `
<!-- drag //-->
<div id="columns">
	<div class="column" draggable="true">A</div>
	<div class="column" draggable="true">B</div>
	<div class="column" draggable="true">C</div>
</div>
<div style="clear: both;"></div>
<button id="add_column">추가!</button>
<div>
	<button id="top_button">Top(prev)</button>
	<button id="down_button">Down(next)</button>
	<div id="radio_test">
		<div class="column" draggable="true">
			<input type="radio" name="draggable" value="">
			<div>A</div>
		</div>
		<div class="column" draggable="true">
			<input type="radio" name="draggable" value="">
			<div>B</div>
		</div>
		<div class="column" draggable="true">
			<input type="radio" name="draggable" value="">
			<div>C</div>
		</div>
	</div>
</div>
`;
const $root = document.querySelector('#root');
if($root) {
	//$root.textContent = 'TEST!';
	$root.innerHTML = template;
}

/*
[리팩토링]
class 로 변환해야 한다.

*/



// 마우스 좌표
interface MouseOffset {
	readonly left: number,
	readonly top: number
};
const getMouseOffset = (event: any): MouseOffset => {
	let left: number = event.clientX;
	let top: number = event.clientY;
	
	left += window.scrollX; 
	top += window.scrollY;
	
	return { left, top };
};
//export { getMouseOffset };


// 드래그 미지원 브라우저 대응 
// 라디오 버튼 선택 후 위/아래 이동 버튼 
const setMoveRadio = ($target: any, type: string): void => {
	// type: top, down
	// 라디오 element 상위 [draggable="true"] 속성 검색
	// 검색된 element 의 type(top, down) 위치의 element 기준 이동
	let $draggable: any = $target && $target.querySelectorAll('[draggable="true"]');
	let $radio: any = $target && $target.querySelectorAll('[type="radio"][name="draggable"]');
	let $element: any;
	let indexChecked: number = -1;

	// 유효성
	if(!$draggable || !$radio) {
		return;
	}

	// 선택된 라디오 index 값
	$radio && [ ...$radio ].some(($element, index, list) => {
		if($element.checked) {
			indexChecked = index;
			return false;
		}
	});
	
	//console.log('$target', $target);
	//console.log('$draggable', $draggable);
	//console.log('$radio', $radio);
	//console.log('indexChecked', indexChecked);

	if(type === 'top' && $draggable[indexChecked-1]) {
		// brfore
		$element = $draggable[indexChecked-1];
		$element.parentNode.insertBefore($draggable[indexChecked], $element); 
	}else if(type === 'down' && $draggable[indexChecked+1]) {
		// after
		$element = $draggable[indexChecked+1];
		$element.parentNode.insertBefore($draggable[indexChecked], $element.nextSibling); 
	}
};
//export { setMoveRadio };

const $radioTest: any = document.querySelector('#radio_test');
const $topButton: any = document.querySelector('#top_button');
const $downButton: any = document.querySelector('#down_button');
$topButton.addEventListener('click', (event: any): void => setMoveRadio($radioTest, 'top'));
$downButton.addEventListener('click', (event: any): void => setMoveRadio($radioTest, 'down'));



/*
https://developer.mozilla.org/ko/docs/Web/API/HTML_%EB%93%9C%EB%9E%98%EA%B7%B8_%EC%95%A4_%EB%93%9C%EB%A1%AD_API
https://developer.mozilla.org/ko/docs/Web/API/HTML_%EB%93%9C%EB%9E%98%EA%B7%B8_%EC%95%A4_%EB%93%9C%EB%A1%AD_API/Drag_operations

// draggable
// https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/draggable

// 드래그 이벤트
// 시작
dragstart: 드래그하기 시작했을 때 발생
// 진행
drag: 드래그 할 때 발생
dragenter: 드롭 대상위에 올라갔을 때 발생
dragover: 드롭 대상 위로 지나갈 때 발생 (매 수백 밀리초마다 발생한다.)
dragleave: 적합한 드롭 대상에서 벗어났을 때 발생
// 종료
drop: 드롭 대상에 드롭했을 때 발생
dragend: 드래그를 끝냈을 때 발생한다. (마우스 버튼을 떼거나 ESC 키를 누를 때) 
dragexit: 더 이상 드래그의 직접적인 대상이 아닐 때 발생

// dataTransfer
// https://developer.mozilla.org/ko/docs/Web/API/DataTransfer
*/

// 드래그 대상 
const $columns: any = document.querySelector('#columns'); // 내부 [draggable="true"]

// input 추가
const $addColumn: HTMLElement | null = document.querySelector('#add_column');
if($addColumn) {
	$addColumn.addEventListener('click', (event: any): void => {
		const div = document.createElement('div');
		const min = 1;
		const max = 50;
		const random = Math.floor(Math.random() * (max - min)) + min;

		div.setAttribute('class', 'column');
		div.setAttribute('draggable', 'true');
		div.textContent = `${random}`;
		$columns.appendChild(div);
	})
}



// 드래그 시작
$columns.addEventListener('dragstart', (event: any): void => {
	console.log('dragstart : 드래그하기 시작했을 때 발생', event);
	// jQuery 의 경우 event.originalEvent.xxx 형태로 접근

	// element 고유값 생성
	const $target = event.target;
	const code: string = 'drag-'+(new Date()).getTime();
	$target.setAttribute('data-drag-code', code);

	// 드래그 종류
	// dragstart 이벤트 리스너의 effectAllowed 속성을 설정함으로써, 어떤 것을 허용할 것인지를 지정할 수 있습니다.
	// 특정한 유형의 작업을 제외시키고 싶지 않다면 이 속성을 조정할 필요가 없습니다.
	// copy: 드래그되는 데이터가 현재 위치에서 드랍되는 위치로 복사될 것임을 나타냅니다. 
	// move: 드래그되는 데이터가 이동될 것임을 나타내고, 
	// link: 특정 형태의 관계(relationship)나 연결(connection)이 소스와 드랍되는 위치 사이에 생성될 것임을 나타냅니다.
	/*
	none: 어떤 작업도 허용하지 않음.
	copy: 복사만 허용
	move: 이동만 허용
	link: 연결만 허용
	copyMove: 복사 또는 이동만 허용
	copyLink: 복사 또는 연결만 허용
	linkMove: 연결 또는 이동만 허용
	all: 복사, 이동 및 연결 모두 허용
	*/
	event.dataTransfer.effectAllowed = 'move';

	// 드래그 효과
	// dropEffect 프로퍼티는 드래그 앤 드롭 도중에 사용자에게 피드백 (보통 시각적인)을 제공하기 위해 사용
	// dragenter 또는 dragover 이벤트가 발생하는 동안 dropEffect 속성을 변경가능 
	/*
	none: 현재 위치에 드롭을 할 수 없습니다.
	copy: 현재 위치에서 드롭하는 위치로 데이터가 복사될 것을 암시합니다.
	move: 현재 위치에서 드롭하는 위치로 데이터가 이동할 것을 암시합니다.
	link: 드래그하는 위치와 드롭하는 위치 간의 일종의 관계나 연결이 맺어진 다는 것을 암시합니다.
	*/
	event.dataTransfer.dropEffect = "move";

	// 드래그 데이터
	// mime type: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types
	/*
	Text: text/plain
	Links: text/uri-list, and text/plain
	HTML: text/html
	*/
	// event.dataTransfer.setData(format, data) : 해당 오브젝트의 mimetype 과 할당된 데이터들이 인자들로 전달
	event.dataTransfer.setData("text/plain", code);
	//event.dataTransfer.setData("text/html", "<p>Example paragraph</p>");
	//event.dataTransfer.setData("text/uri-list", "http://developer.mozilla.org");
	//event.dataTransfer.setData("text/plain", "http://developer.mozilla.org/api");

	// 드래그 이미지로 사용할 이미지
	// 참고: img.src 를 존재하는 이미지로 바꾸지 않으면 기본 드래그 이미지를 사용합니다.
	/*let img = new Image(); 
	img.src = 'example.gif'; 
	event.dataTransfer.setDragImage(img, 10, 10);*/

	//this.style.opacity = '0.4';v
});


// 드래그가 진행될 때
$columns.addEventListener('drag', (event: any): void => {
	//console.log('drag : 드래그 할 때 발생', event);

	event.preventDefault();

	// 드래그가 진행되고 있는 위치 표시
	// ...
});
$columns.addEventListener('dragenter', (event: any): void => {
	//console.log('dragenter : 드롭 대상위에 올라갔을 때 발생', event);
	
	// dragenter and dragover 두 이벤트 모두에서 preventDefault() 메서드를 호출하는 것은 그 위치에 드랍이 허용되는 것을 나타냅니다. 
	event.preventDefault();

	// element 좌표
	//let top = this.offsetTop;
	//let left = this.offsetLeft;
	let html: string = event.dataTransfer.getData('html');
});
$columns.addEventListener('dragover', (event: any): void => {
	//console.log('dragover : 드롭 대상 위로 지나갈 때 발생 (매 수백 밀리초마다 발생한다.)', event);
	
	// dragenter and dragover 두 이벤트 모두에서 preventDefault() 메서드를 호출하는 것은 그 위치에 드랍이 허용되는 것을 나타냅니다. 
	event.preventDefault();

	// dragenter 와 dragover 이벤트가 발생되는 동안의 피드백을 제어한다. 
	// 사용자가 어떤 요소에 마우스를 올리면, 커서가 어떤 타입의 동작이 일어날 것인지를 알려줄 것이다.(예 : 복사, 이동 등) 
	event.dataTransfer.dropEffect = 'move';  // none, copy, link, move
});
$columns.addEventListener('dragleave', (event: any): void => {
	//console.log('dragleave : 드롭 가능한 영역에서 벗어났을 때 발생', event);
});


// 드롭(drop)의 처리
$columns.addEventListener('drop', (event: any): void => {
	console.log('drop : 드롭 대상에 드롭했을 때 발생', event);

	let $target: any = event.target; // [draggable="true"]
	let $currentTarget: any = event.currentTarget;
	let $draggable: any = $currentTarget.querySelectorAll('[draggable="true"]');
	let code: string;
	let $drag: any;
	let indexTarget: number = -1, indexDrag: number = -1;

	//console.log('$target', $target);
	
	// 정상적인 실행을 위해서는 handleDragOver 함수에서 preventDefault() 기본 기능 정지를 해줘야 한다.
	event.preventDefault();

	// 값(상태)에 따라 드래그엔드롭 또는 이동 등 작업을 진행한다.
	//console.log('effectAllowed', event.dataTransfer.effectAllowed);

	// 대상의 고유값(id 등) 정보를 가져온다.
	code = event.dataTransfer.getData("text");
	$drag = $currentTarget.querySelector(`[data-drag-code="${code}"]`); // 드래그 되고 있는 요소

	// 유효성 검사
	if(!$drag || !$draggable) {
		return;
	}

	// 특정 영역으로 이동시킬 때
	//$currentTarget.appendChild($element); 

	// 위치 찾기
	[ ...$draggable ].forEach(($element, index, list) => {
		if($element.isEqualNode($target)) {
			indexTarget = index;
		}
		if($element.isEqualNode($drag)) {
			indexDrag = index;
		}
	});
	//console.log('indexTarget', indexTarget);
	//console.log('indexDrag', indexDrag);

	// 위치에 따라 앞/뒤로 이동
	if(0 <= indexTarget && 0 <= indexDrag) {
		if(indexTarget < indexDrag) {
			// brfore
			$target.parentNode.insertBefore($drag, $target); 
		}else if(indexDrag < indexTarget) {
			// after
			$target.parentNode.insertBefore($drag, $target.nextSibling); 
		}
	}
});
$columns.addEventListener('dragend', (event: any): void => {
	//console.log('dragend : 드래그를 끝냈을 때 발생한다. (마우스 버튼을 떼거나 ESC 키를 누를 때)', event);
});
$columns.addEventListener('dragexit', (event: any): void => {
	//console.log('dragexit : 더 이상 드래그의 직접적인 대상이 아닐 때 발생', event);
});