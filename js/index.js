/**
 * Created by zhousg on 2016/2/21.
 */
$(function(){
    banner();
    tabs();
    /*������ʾ��Ҫ�Լ���ʼ��*/
    /*
    * ע�� ������tools��ʱ��Ҫʹ�� ��ѡ����
    * ��Ϊ  tooltip ԭ���Ƕ�̬�����ͬ��Ԫ��
    */
    $('[data-toggle="tooltip"]').tooltip();
});
/*��ͼƬ����Ӧ*/
var banner = function(){
    var myData = '';
    /*
    * 1.��Ҫ��ȡ����
    * 2.�ж���Ļ�Ĵ�С  768px���¶����ƶ���
    * 3.��Ⱦ��html
    * 4.��html��Ⱦ��ҳ�浱��
    *
    * ҳ��ı�ߴ��ʱ����Ҫ������Ⱦ
    *��
    * 5.����window��resize
    * 6.�ж���Ļ�Ĵ�С
    * 7.��Ⱦhtml
    * 8.��html��Ⱦ��ҳ�浱��
    *
    * */


    /*
    * �״��
    * 1.��Ҫ  http��ʽ��  ��Ҫ�����http��������
    * 2.Ҫ��Ҫ���·������   �����ʹ�õ�������һ��Ҫ �Ĺ���
    * 3.html���û����Ⱦ���ֲ�ͼ����  �ᱨ��
    * 4.ע�����html�Ľṹ��ȷ
    * */
    /*1.��Ҫ��ȡ����*/
    var getBannerData = function(callback){
        /*������������ݾͲ�������*/
        if(myData){
            callback && callback(myData);
            return false;
        }
        $.ajax({
            /*����json�ַ���*/
            /*
            * ����·����д��
            * ���·����д��   js/index.json
            *
            * */
            url:'js/index.json',
            type:'get',
            data:{},
            /*���󷵻����ݵ�������json  txt html*/
            contentType:'json',
            success:function(data){
                myData = data;
                callback && callback(data);
            }
        });
    };
    /*��Ⱦҳ��*/
    function renderHtml(){
        /*����ajax*/
        getBannerData(function(data){
            // console.log(data);
            var datas = JSON.parse(data);
            // console.log(datas);
            /*ҵ���߼�*/
            /*2.�ж���Ļ�Ĵ�С  768px���¶����ƶ���*/
            /*
             * $('div')[0]  $('div').get(0);
             * */
            /*��Ļ���*/
            var width = $(window).width();
            /*һ�����ֲ���  һ���ǵ�*/
            var html = "",point = "";
            /*�������ƶ��豸*/
            /*3.��Ⱦ��html*/
            if(width < 768){
                /*ƴ��html*/
                /*
                 *
                 * <div class="item active">
                 <!--�ƶ�������-->
                 <a href="" class="img_box hidden-xs" style="background-image: url(images/slide_01_2000x410.jpg)"></a>
                 <!--���ƶ��� ����Ӧ
                 a �����Ҫ100% img ���100%
                 -->
                 <!--С �� ��  ����-->
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
                    /*��һ��ͼƬ����active*/
                    html += '<div class="item '+(i == 0 ? "active":"")+'">';
                    html += '<a href="" class="img_mobile hidden-sm hidden-md hidden-lg">';
                    html += '<img src="'+datas[i].img+'" alt=""/>';
                    html += '</a></div>';

                    point += '<li data-target="#wjs_banner" data-slide-to="'+i+'" class="'+(i == 0 ? "active":"")+'"></li>';
                }
            }else{
                for(var i = 0 ; i < datas.length ; i ++ ){
                    /*��һ��ͼƬ����active*/
                    html += '<div class="item '+(i == 0 ? "active":"")+'">';
                    html += '<a href="" class="img_box hidden-xs" style="background-image: url('+datas[i].bac+')"></a>';
                    html += '</div>';

                    point += '<li data-target="#wjs_banner" data-slide-to="'+i+'" class="'+(i == 0 ? "active":"")+'"></li>';
                }
            }
            /*�ַ����ǲ���ƴ�����*/
            /*4.��html��Ⱦ��ҳ�浱��*/
            /*append() 4?*/
            $('#wjs_banner').find('.carousel-indicators').html(point);//��
            $('#wjs_banner').find('.carousel-inner').html(html);//ͼƬ
        });
    }

    /*��resize�¼� window*/
    $(window).on('resize',function(){
        /*������Ⱦҳ��*/
        renderHtml();
    }).trigger('resize');
    /*trigger ����ִ��ί�ɵ�����¼�*/

    /*����Ҫʵ�ִ����ֻ��Ļ����л�*/
    /*��¼X�Ĳ���*/
    var startX = 0,moveX = 0,distanceX = 0,isMove = false;
    $('#wjs_banner').on('touchstart',function(e){
        /*originalEvent jquery �ṩ�����ǵ�touch�¼�*/
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        if(Math.abs(distanceX) > 44 && isMove ){
            /*������*/
            if(distanceX > 0){
                /*���һ�*/
                $('#wjs_banner').carousel('prev');
            }else{
                /*����*/
                $('#wjs_banner').carousel('next');
            }
        };
        /*���ñ���*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = 0;
    });
};
/*��Ʒ�Ŀ��*/
var tabs = function(){
    /*
    * ��ȡ���е�li�Ŀ��
    * ����ul�Ŀ��
    * ��Ҫul��������
    * */

    /*��ȡ����*/
    var parent = $('.wjs_product_tabs_box');
    var child = parent.find('ul.nav-tabs');
    var lis = child.find('li');
    /*�������е�li�Ŀ�ȵĺ�*/
    var width = 0;
    $.each(lis,function(){
        width += $(this).innerWidth();
    });
    // console.log(width);
    /*����ul�Ŀ��*/
    child.width(width);
    /*��������*/
    itcast.iScroll({
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:50
    });
}


