#!/bin/sh
# 指定 shell 类型
# start/stop nginx && node service, list the node(3000) && nginx(7177) port processes
echo YlonelY Hello~

# display options
# 3 params 1. title 2. array options 3. array's length
function READ_USER_INPUT() {
  title=$1
  options=$2
  maxValue=$3
  echo "${title}"
  # for circle
  for option in ${options[*]}; do
    echo "${option}"
  done
  read sort

  # 判读输入值是否为一个数字，如果为0，则证明是一个数字类型
  expr $sort "+" 10 &> /dev/null
  if [[ $? -eq 0 ]]; then
    # 判断输入是否在边界范围内
    if [[ $sort -gt 0 && $sort -le $maxValue ]]; then
      return $sort
    else
      echo -n "Input Error: Out Of Range!"
      READ_USER_INPUT "$title" "${options[*]}" $maxValue
    # fi 用来标示语句结束
    fi
  # 不为数字则直接进行提示
  else
    echo -n "Input Error: Select Sort Number!"
    READ_USER_INPUT "$title" "${options[*]}" $maxValue
  fi
}

# 定义 shell 内数组
options_label="Select what you want about the shell script:"
options_value=("1.start" "2.stop" "3.list-pid" "4.reload-node-server")

READ_USER_INPUT "${options_label}" "${options_value[*]}" ${#options_value[*]}

# $?获得上一次操作的返回值
option_select=$?

if [[ $option_select -eq 1 ]]; then
    # main category
    cd ~
    nginx -s stop
    cd ~
    nginx
    # compile react
    cd /Users/yango/Growup/YlonelY-GrowingUp/react-app
    npm run build
    # node category
    cd /Users/yango/Growup/YlonelY-GrowingUp/koa-app
    npm run dev
elif [[ $option_select -eq 2 ]]; then
    cd ~
    nginx -s stop
    cd ~
    lsof -i :3000
    # -n 默认设置不换行
    echo -n "Input PID to kill the process: "
    read pid
    kill -9 ${pid}
    echo YlonelY Bye~
elif [[ $option_select -eq 3 ]]; then
    echo "port 3000 running process"
    lsof -i :3000
    echo "port 7177 running process"
    lsof -i :7177
elif [[ $option_select -eq 4 ]]; then
    cd ~
    lsof -i :3000
    # -n 默认设置不换行
    echo -n "Input PID to kill the node process: "
    read pid
    kill -9 ${pid}
    cd /Users/yango/Growup/YlonelY-GrowingUp/koa-app
    npm run server
fi
