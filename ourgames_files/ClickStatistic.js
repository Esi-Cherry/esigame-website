$(function () {
    $('.datastatistic').click(function () {
        var type = $(this).attr('data-statistickey');
        var url = '/admin/ClickStatistic/index?key=' + type;
        $.get(url, { }, function () { });
    })
})