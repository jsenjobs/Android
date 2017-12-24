1 通过RequestBuilder构造相应的RestfulBase对象
2 调用RequestBase的
        keep()   加到任务池
        keep(RequestCallBack requestCallBack)   加到任务池并设置监听接口
        releaseAll()    加入到任务池并立刻执行任务池
        releaseAll(RequestCallBack requestCallBack)     加入到任务池设置监听接口并立刻执行任务池
        releaseSelf()   不加入到任务池立刻执行
        releaseSelf(RequestCallBack requestCallBack)    不加入到任务池设置监听接口立刻执行

        执行方法

回调方式 1  可以在调用以上方法执行时传入回调接口;
        2   在SimpleNotifyPool中注册全局的监听接口;
