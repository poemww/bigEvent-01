$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取 form, layer对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码，还需要拿到密码，然后判断是否相等，如果失败则 return 并提示
            var pwd = $('.reg-box [name=password]').val()   //类选择器+属性选择器
            if (pwd != value) {
                return '两次密码不一致'
            }

        }
    })

    // 监听注册表单的提交事件发送Ajax请求；e=表单；'#form_reg [name=password]'属性选择器
    $('#form_reg').on('submit', function (e) {
        // 1.阻止表单的默认提交行为
        e.preventDefault()
        // 2.发起Ajax的post请求
        // 手动拼接表单提交的数据
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val(), repassword: $('#form_reg [name=repassword]').val() }
        $.post(options.url, data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)   //弹出提示
            } layer.msg('注册成功，请登录！')     //弹出提示
            // 模拟点击去登陆
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件发送Ajax请求；
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: options.url,    //利用 ajaxPrefilter函数的options.url拼接根地址
            method: 'POST',
            // 快速获取表单提交的数据 serialize必须指定name属性
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                } layer.msg('登录成功')
                // 将登陆成功得到的 token值保存到 localstorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })


})
