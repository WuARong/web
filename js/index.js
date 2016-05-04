/**
 * Created by zhousg on 2016/2/21.
 */
$(function(){
    banner();
    tabs();
    /*工具提示需要自己初始化*/
    /*
    * 注意 在试用tools的时候不要使用 序选着器
    * 因为  tooltip 原理是动态添加了同级元素
    */
    $('[data-toggle="tooltip"]').tooltip();
});
/*做图片的响应*/
var banner = function(){
    var myData = '';
    /*
    * 1.需要获取数据
    * 2.判断屏幕的大小  768px以下都市移动端
    * 3.渲染成html
    * 4.把html渲染在页面当中
    *
    * 页面改变尺寸的时候需要重新渲染
    *；
    * 5.监听window的resize
    * 6.判断屏幕的大小
    * 7.渲染html
    * 8.把html渲染在页面当中
    *
    * */


    /*
    * 易错点
    * 1.需要  http形式打开  不要用你的http服务器打开
    * 2.要主要你的路径文提   如果你使用的是中文一定要 改过来
    * 3.html如果没有渲染在轮播图当中  会报错
    * 4.注意你的html的结构正确
    * */
    /*1.需要获取数据*/
    var getBannerData = function(callback){
        /*如果缓存了数据就不请求了*/
        if(myData){
            callback && callback(myData);
            return false;
        }
        $.ajax({
            /*返回json字符串*/
            /*
            * 绝对路径的写法
            * 相对路径的写法   js/index.json
            *
            * */
            url:'js/index.json',
            type:'get',
            data:{},
            /*请求返回数据的类型是json  txt html*/
            contentType:'json',
            success:function(data){
                myData = data;
                callback && callback(data);
            }
        });
    };
    /*渲染页面*/
    function renderHtml(){
        /*调用ajax*/
        getBannerData(function(data){
            // console.log(data);
            var datas = JSON.parse(data);
            // console.log(datas);
            /*业务逻辑*/
            /*2.判断屏幕的大小  768px以下都市移动端*/
            /*
             * $('div')[0]  $('div').get(0);
             * */
            /*屏幕宽度*/
            var width = $(window).width();
            /*一个是轮播项  一个是点*/
            var html = "",point = "";
            /*它就是移动设备*/
            /*3.渲染成html*/
            if(width < 768){
                /*拼接html*/
                /*
                 *
                 * <div class="item active">
                 <!--移动端隐藏-->
                 <a href="" class="img_box hidden-xs" style="background-image: url(images/slide_01_2000x410.jpg)"></a>
                 <!--在移动端 自适应
                 a 宽度需要100% img 宽度100%
                 -->
                 <!--小 中 大  隐藏-->
                 <a href="" class="img_mobile hidden-sm hidden-md hidden-lg">
                 <img src="images/slide_01_640x340.jpg" alt=""/>
                 </a>
                 </div>
                 *
                 * */

                /*
                 *
                 * <li data-target="#wjs_banner" data-slide-to="0" class="active"></li>*/
                for(var i = 0 ; i < datas.length ; i ++ ){
                    /*第一张图片才有active*/
                    html += '<div class="item '+(i == 0 ? "active":"")+'">';
                    html += '<a href="" class="img_mobile hidden-sm hidden-md hidden-lg">';
                    html += '<img src="'+datas[i].img+'" alt=""/>';
                    html += '</a></div>';

                    point += '<li data-target="#wjs_banner" data-slide-to="'+i+'" class="'+(i == 0 ? "active":"")+'"></li>';
                }
            }else{
                for(var i = 0 ; i < datas.length ; i ++ ){
                    /*第一张图片才有active*/
                    html += '<div class="item '+(i == 0 ? "active":"")+'">';
                    html += '<a href="" class="img_box hidden-xs" style="background-image: url('+datas[i].bac+')"></a>';
                    html += '</div>';

                    point += '<li data-target="#wjs_banner" data-slide-to="'+i+'" class="'+(i == 0 ? "active":"")+'"></li>';
                }
            }
            /*字符串是不是拼接完成*/
            /*4.把html渲染在页面当中*/
            /*append() 4?*/
            $('#wjs_banner').find('.carousel-indicators').html(point);//点
            $('#wjs_banner').find('.carousel-inner').html(html);//图片
        });
    }

    /*绑定resize事件 window*/
    $(window).on('resize',function(){
        /*重新渲染页面*/
        renderHtml();
    }).trigger('resize');
    /*trigger 立即执行委派的这个事件*/

    /*我们要实现触屏手机的滑动切换*/
    /*记录X的参数*/
    var startX = 0,moveX = 0,distanceX = 0,isMove = false;
    $('#wjs_banner').on('touchstart',function(e){
        /*originalEvent jquery 提供给我们的touch事件*/
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        if(Math.abs(distanceX) > 44 && isMove ){
            /*滑动过*/
            if(distanceX > 0){
                /*向右滑*/
                $('#wjs_banner').carousel('prev');
            }else{
                /*向左滑*/
                $('#wjs_banner').carousel('next');
            }
        };
        /*重置变量*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = 0;
    });
};
/*产品的宽度*/
var tabs = function(){
    /*
    * 获取所有的li的宽度
    * 设置ul的宽度
    * 需要ul滑动起来
    * */

    /*获取对象*/
    var parent = $('.wjs_product_tabs_box');
    var child = parent.find('ul.nav-tabs');
    var lis = child.find('li');
    /*计算所有的li的宽度的和*/
    var width = 0;
    $.each(lis,function(){
        width += $(this).innerWidth();
    });
    // console.log(width);
    /*设置ul的宽度*/
    child.width(width);
    /*滑动方法*/
    itcast.iScroll({
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:50
    });
}


