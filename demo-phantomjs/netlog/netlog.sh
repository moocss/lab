#!/bin/bash

date_now=$(date +%Y%m%d%H%M);
# echo ${data_now};

# str='http://www.jd.com/$首页'
#echo ${str:'$'}

# STR="A good beginning is half done." 
# echo $STR | cut -d ' ' -f 1      

# a="one$$two,three,four"
# #要将$a分割开，可以这样：
# OLD_IFS="$IFS"
# IFS="$$"
# arr=($a)
# IFS="$OLD_IFS"
# STR='xxxs';
# for s in ${arr[@]}
# do
# ${STR}=${STR}" ""$s"	
# # echo "$s"
# done


webUrlList=(
'http://www.jd.com/$首页'
'http://channel.jd.com/1320-2641.html$列表'
'http://list.jd.com/list.html?cat=9987,653,655$列表2'
'http://list.jd.com/list.html?cat=1320,1581,2648&go=0$列表3'
'http://search.jd.com/Search?keyword=iphone6&enc=utf-8$搜索'

http://channel.jd.com/fashion.html
http://channel.jd.com/beautysale.html
http://channel.jd.com/chaoshi.html
http://www.jd.hk/
http://red.jd.com/
http://tuan.jd.com/
http://paimai.jd.com/
http://jr.jd.com/
http://smart.jd.com/

http://channel.jd.com/electronic.html
http://shouji.jd.com/
http://shuma.jd.com/
http://mobile.jd.com/
http://diannao.jd.com/
http://channel.jd.com/home.html
http://channel.jd.com/furniture.html
http://channel.jd.com/decoration.html
http://channel.jd.com/kitchenware.html
http://channel.jd.com/1315-1342.html
http://channel.jd.com/1315-1343.html
http://channel.jd.com/1315-1345.html
http://channel.jd.com/jewellery.html
http://channel.jd.com/beauty.html
http://channel.jd.com/shoes.html
http://channel.jd.com/bag.html
http://channel.jd.com/watch.html
http://channel.jd.com/1672-2615.html
http://channel.jd.com/sports.html
http://car.jd.com/
http://channel.jd.com/auto.html
http://baby.jd.com
http://channel.jd.com/toys.html
http://channel.jd.com/food.html
http://channel.jd.com/wine.html
http://channel.jd.com/freshfood.html
http://china.jd.com
http://channel.jd.com/health.html
http://book.jd.com/
http://mvd.jd.com/
http://e.jd.com/ebook.html
http://caipiao.jd.com/
http://trip.jd.com/
http://chongzhi.jd.com/
http://piao.jd.com/
http://licai.jd.com/
http://z.jd.com/
http://baitiao.jd.com/activity/third
http://bao.jd.com/
)

webUrlList2=(
http://tuan.jd.com
http://chongzhi.jd.com
http://movie.jd.com
http://caipiao.jd.com
http://jipiao.jd.com
http://piao.jd.com
http://jiaofei.jd.com
http://hotel.jd.com
http://trip.jd.com
http://game.jd.com
http://wan.jd.com
http://zuche.jd.com
http://dujia.jd.com
http://menpiao.jd.com　
http://mobile.jd.com/
http://pinpaijie.jd.com/
http://app.jd.com/
http://help.jd.com/index.html
http://giftcard.jd.com/market/index.action
http://fuwu.jd.com/
http://gongyi.jd.com
http://sale.jd.com/act/p02usy1TPBex.html
)


function getUrlNetlog(){
	echo 'loading...'

	echo '//'`date +%Y-%m-%d_%H:%M` > result.json;

	echo '[' >> result.json;

	for webUrl in ${webUrlList[*]}
	do
		# if [$folder]
		# then
			echo $webUrl
			# phantomjs netlog.js $webUrl
		# fi
	done
	
	echo ']' >> result.json;
	echo 'done...'
}

#getUrlNetlog

