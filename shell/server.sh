#!/bin/bash

# $ sh shell/server.sh <GIT_BRANCH> <BUILD>
# $ sh shell/server.sh master 빌드번호

#SHELL_PATH=`pwd -P`
PROJECT_PATH="/home"
PROJECT_NAME="newbie"
APP_NAME="Newbie"
#SOCKET_NAME="Newbie-socket"
if [ -n "$1" ];
	then

	# "env" 프론트 빌드 도구에서 해당 빌드 번호를 가져다 사용할 수 있도록 환경변수 값 설정 
	#export BUILD_NUMBER=$2

	# "branch"
	if [ "develop" == "$1" ] || [ "origin/develop" == "$1" ];
		then
		PROJECT_PATH=$PROJECT_PATH/$PROJECT_NAME.test
		APP_NAME=$APP_NAME-develop
		#SOCKET_NAME=$SOCKET_NAME-develop
		source ./env/test.env; 
	elif [ "master" == "$1" ] || [ "origin/master" == "$1" ];
		then
		PROJECT_PATH=$PROJECT_PATH/$PROJECT_NAME
		APP_NAME=$APP_NAME-master
		#SOCKET_NAME=$SOCKET_NAME-master
		source ./env/production.env;
	else 
		echo "Git 브랜치 조건확인이 필요합니다."
		exit;
	fi

	# "node process"
	#PID=`ps -ef | grep -v 'grep' | grep 'node' | grep '/Users/ysm0203/Development/node/webpagetest.git/servers/main.js' | awk '{print $2}'`
	#if [ -n "$PID" ];
	#	then
		# "kill -9 프로세스 ID로 프로세스 중지."
		# "ps -ef 프로세스 전체출력."
		# "grep 'PROCESS_NAME' 프로세스 이름 검색."
		# "awk '{print $2}' 위에서 검색된 줄에서 2번째 항목(PID) 출력."
	#	kill -9 "$PID"
	#fi
	PM2=`$PROJECT_PATH/node_modules/pm2/bin/pm2 list | grep "$APP_NAME" | awk '{print $4}'`
	if [ -n "$PM2" ];
		then
		$PROJECT_PATH/node_modules/pm2/bin/pm2 delete "$PM2"
	fi
	#PM2=`$PROJECT_PATH/node_modules/pm2/bin/pm2 list | grep "$SOCKET_NAME" | awk '{print $4}'`
	#if [ -n "$PM2" ];
		#then
		#$PROJECT_PATH/node_modules/pm2/bin/pm2 delete "$PM2"
	#fi

	# "node start"
	#BUILD_ID=dontKillMe ACTIVE=test BUILD_NUMBER=${BUILD} nohup node servers/main.js &
	$PROJECT_PATH/node_modules/pm2/bin/pm2 start $PROJECT_PATH/servers/main.js --name "$APP_NAME"
	#$PROJECT_PATH/node_modules/pm2/bin/pm2 start $PROJECT_PATH/servers/websocket.js --name "$SOCKET_NAME"

	# 설정값 초기화(제거)
	#unset BUILD_NUMBER
else 
	echo "설정값 확인이 필요합니다."
fi
exit;