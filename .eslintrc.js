/*
-
ESLint 설치
$ npm install -g eslint 
$ npm install -D eslint-config-airbnb-base eslint-plugin-import
eslint: ESLint 코어
eslint-config-airbnb: Airbnb의 eslint 스타일 가이드
eslint-plugin-import: ES2015+의 import/export 구문을 지원

$ eslint --init
.eslintrc.js 파일 생성됨

-
Prettier 설치
$ npm i -D prettier 
ESLint 와 함께 사용
$ npm i -D eslint-plugin-prettier eslint-config-prettier
*/
module.exports = {
    // 환경(env): 프로젝트의 사용 환경을 설정한다.
	env: {
		browser: true,
		es2020: true,
		// node: true는 webpack.config.js 빌드시 node 환경도 적용
		node: true,
	},
	// 코드 포맷을 prettier로 설정
	plugins: ["prettier"],
	// ESLint가 무시할 디렉토리, 파일을 설정
	ignorePatterns: ["node_modules/"],
	// 확장(extends): 다른 ESLint 설정을 확장해서 사용할때 설정한다.
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	// 파서 옵션(parserOptions): ESLint 사용을 위해 지원하려는 Javascript 언어 옵션을 설정할 수 있다.
	parserOptions: {
		// 자바스크립트 버전
		ecmaVersion: 11,
		sourceType: "module",
	},
	// 규칙(rules): 프로젝트에서 자체적으로 덮어쓰고 싶은 규칙을 정의할 때 사용한다.
	// https://eslint.org/docs/rules/
	rules: {
		// prettier에 맞게 룰을 설정
		"prettier/prettier": "error"
	},
};