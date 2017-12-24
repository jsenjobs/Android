package org.chaosstudio.lib.net.http2;

import android.content.Context;
import android.os.Build;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.chaosstudio.lib.net.http2.utils.HttpMethod;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by jsen on 2017/8/20.
 */

public class HttpManager {

    // 请求唯一入口
    public Http2Request build(HttpMethod httpMethod, String url) {
        return new Http2Request(this, httpMethod, url);
    }

    /**
     * okHttp同步请求
     */
    byte[] execSync(Http2Request restRequest) {
        switch (restRequest.method) {
            case GETJSON:
            case GET:
                return execGetSync(restRequest.url, restRequest.params, restRequest.headers);
            case POSTJSON:
                return execPostSync(restRequest.url, restRequest.params, restRequest.headers);
            case FORM:
                return execPostFormSync(restRequest.url, restRequest.params, restRequest.headers);
        }
        return null;
    }

    /**
     * okHttp异步请求
     * @param callBack 请求返回数据回调
     **/
    <T> Call execAsync(Http2Request restRequest, Http2Request.ReqCallBack<T> callBack) {
        Call call = null;
        switch (restRequest.method) {
            case GETJSON:
                call = requestGetAsync(restRequest, callBack);
                break;
            case POSTJSON:
                call = requestPostByAsync(restRequest, callBack);
                break;
            case FORM:
                call = requestPostByAsycWithForm(restRequest, callBack);
                break;
            case GET:
                call = requestGetAsync(restRequest, callBack);
                break;
        }
        return call;
    }
    /**
     * okHttp get同步请求
     * @param url  接口地址
     * @param params   请求参数
     */
    private byte[] execGetSync(String url, Map<String, String> params, Map<String, String> headers) {
        try {
            //创建一个请求
            Request request = addHeaders(headers).url(String.format("%s?%s", url, HttpBuild.buildParams(params))).build();
            //创建一个Call
            final Call call = okClient.newCall(request);
            //执行请求
            final Response response = call.execute();


            if (response.isSuccessful()) {
                return response.body().bytes();
            } else {
                return null;
            }
        } catch (Exception e) {
            Log.e(TAG, e.toString());
            return null;
        }
    }

    /**
     * okHttp post同步请求
     * @param url  接口地址
     * @param params   请求参数
     */
    private byte[] execPostSync(String url, Map<String, String> params, Map<String, String> headers) {
        try {
            //创建一个请求实体对象 RequestBody
            RequestBody body = RequestBody.create(MEDIA_TYPE_JSON, HttpBuild.buildParams(params));
            //创建一个请求
            final Request request = addHeaders(headers).url(url).post(body).build();
            //创建一个Call
            final Call call = okClient.newCall(request);
            //执行请求
            Response response = call.execute();
            //请求执行成功
            if (response.isSuccessful()) {
                //获取返回数据 可以是String，bytes ,byteStream
                return response.body().bytes();
            } else {
                return response.body().bytes();
            }
        } catch (Exception e) {
            Log.e(TAG, e.toString());
            return "访问失败".getBytes();
        }
    }

    /**
     * okHttp post同步请求表单提交
     * @param url 接口地址
     * @param params 请求参数
     */
    private byte[] execPostFormSync(String url, Map<String, String> params, Map<String, String> headers) {
        try {
            if (params == null) {
                return "".getBytes();
            }
            //创建一个FormBody.Builder
            FormBody.Builder builder = new FormBody.Builder();
            for (String key : params.keySet()) {
                //追加表单信息
                builder.add(key, params.get(key));
            }
            //生成表单实体对象
            RequestBody formBody = builder.build();
            //创建一个请求
            final Request request = addHeaders(headers).url(url).post(formBody).build();
            //创建一个Call
            final Call call = okClient.newCall(request);
            //执行请求
            Response response = call.execute();
            if (response.isSuccessful()) {
                return response.body().bytes();
            } else {
                return response.body().bytes();
            }
        } catch (Exception e) {
            Log.e(TAG, e.toString());
            return "访问失败".getBytes();
        }
    }


    /**
     * okHttp get异步请求
     * @param callBack 请求返回数据回调
     */
    private <T> Call requestGetAsync(final Http2Request restRequest, final Http2Request.ReqCallBack<T> callBack) {
        String url = restRequest.url;
        Map<String, String> params = restRequest.params;
        Map<String, String> headers = restRequest.headers;
        try {
            String requestUrl = String.format("%s?%s", url, HttpBuild.buildParams(params));
            final Request request = addHeaders(headers).url(requestUrl).build();
            final Call call = okClient.newCall(request);

            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    e.printStackTrace();
                    failedCallBack("访问失败", restRequest.method, callBack);
                    e.printStackTrace();
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    successCallBack(response, restRequest.method, callBack);
                }
            });
            return call;
        } catch (Exception e) {
            e.printStackTrace();
            failedCallBack(e.getMessage(), restRequest.method, callBack);
        }
        return null;
    }

    /**
     * okHttp post异步请求
     * @param callBack 请求返回数据回调
     */
    private <T> Call requestPostByAsync(final Http2Request restRequest, final Http2Request.ReqCallBack<T> callBack) {
        String url = restRequest.url;
        Map<String, String> params = restRequest.params;
        Map<String, String> headers = restRequest.headers;
        try {
            RequestBody body = RequestBody.create(MEDIA_TYPE_JSON, HttpBuild.buildParams(params));
            final Request request = addHeaders(headers).url(url).post(body).build();
            final Call call = okClient.newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    failedCallBack("访问失败", restRequest.method, callBack);
                    e.printStackTrace();
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    successCallBack(response, restRequest.method, callBack);
                }
            });
            return call;
        } catch (Exception e) {
            e.printStackTrace();
            failedCallBack(e.getMessage(), restRequest.method, callBack);
        }
        return null;
    }

    /**
     * okHttp post异步请求表单提交
     * @param callBack 请求返回数据回调
     */
    private <T> Call requestPostByAsycWithForm(final Http2Request restRequest, final Http2Request.ReqCallBack<T> callBack) {
        String url = restRequest.url;
        Map<String, String> params = restRequest.params;
        Map<String, String> headers = restRequest.headers;
        try {
            if (params == null) {
                failedCallBack("Post参数为null", restRequest.method, callBack);
                return null;
            }

            FormBody.Builder builder = new FormBody.Builder();
            for (String key : params.keySet()) {
                builder.add(key, params.get(key));
            }
            RequestBody formBody = builder.build();
            final Request request = addHeaders(headers).url(url).post(formBody).build();
            final Call call = okClient.newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    failedCallBack("访问失败", restRequest.method, callBack);
                    Log.e(TAG, e.toString());
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    successCallBack(response, restRequest.method, callBack);
                }
            });
            return call;
        } catch (Exception e) {
            Log.e(TAG, e.toString());
            e.printStackTrace();
            failedCallBack(e.getMessage(), restRequest.method, callBack);
        }
        return null;
    }

    /**
     * 统一同意处理成功信息
     */
    private <T> void successCallBack(Response response, HttpMethod httpMethod, final Http2Request.ReqCallBack<T> callBack) throws IOException {
        if (callBack == null) return;
        if (response.isSuccessful()) {
            final String string = response.body().string();
            if (httpMethod.toString().endsWith("JSON")) {
                try {
                    final JSONObject jsonObject = JSON.parseObject(string);
                    handleSucceed(jsonObject, callBack);
                } catch (Exception e) {
                    e.printStackTrace();
                    faild.put("msg", "数据转换出处");
                    handleFaild(faild, callBack);
                }
            } else {
                handleSucceed(string, callBack);
            }
        } else {
            try{
                final String string = response.body().string();
                if (httpMethod.toString().endsWith("JSON")) {
                    try {
                        final JSONObject jsonObject = JSON.parseObject(string);
                        handleSucceed(jsonObject, callBack);
                    } catch (Exception e) {
                        e.printStackTrace();
                        faild.put("msg", "数据转换出处");
                        handleFaild(faild, callBack);
                    }
                } else {
                    handleSucceed(string, callBack);
                }
            } catch (Exception e) {
                e.printStackTrace();
                if (httpMethod.toString().endsWith("JSON")) {
                    faild.put("msg", "服务器错误");
                    handleFaild(faild, callBack);
                } else {
                    handleFaild("服务器错误", callBack);
                }
            }
        }
    }
    private void handleSucceed(final Object result, @NonNull final Http2Request.ReqCallBack callBack) {
        okHandler.post(new Runnable() {
            @Override
            public void run() {
                callBack.onReqSuccess(result);
            }
        });
    }
    /**
     * 统一处理失败信息
     */
    private <T> void failedCallBack(String result, HttpMethod httpMethod, final Http2Request.ReqCallBack<T> callBack) {
        if (callBack == null) return;
        if (httpMethod.toString().endsWith("JSON")) {
            faild.put("msg", result);
            handleFaild(faild, callBack);
        } else {
            handleFaild(result, callBack);
        }
    }
    private void handleFaild(final Object result, @NonNull final Http2Request.ReqCallBack callBack) {
        okHandler.post(new Runnable() {
            @Override
            public void run() {
                callBack.onReqFailed(result);
            }
        });
    }

    /**
     * 统一为请求添加头信息
     */
    private Request.Builder addHeaders(Map<String, String> headers) {
        Request.Builder builder = new Request.Builder()
                .addHeader("Connection", "keep-alive")
                .addHeader("platform", "2")
                .addHeader("phoneModel", Build.MODEL)
                .addHeader("systemVersion", Build.VERSION.RELEASE)
                .addHeader("appVersion", "3.2.0");
        if (headers!=null) {
            for (Map.Entry<String, String> entry:headers.entrySet()) {
                builder.addHeader(entry.getKey(), entry.getValue());
            }
        }
        return builder;
    }



    private OkHttpClient okClient;
    private Handler okHandler;
    private JSONObject faild;

    /**
     * 初始化RequestManager
     */
    public HttpManager(Context context) {
        //初始化OkHttpClient
        okClient = new OkHttpClient().newBuilder()
                .connectTimeout(10, TimeUnit.SECONDS)//设置超时时间
                .readTimeout(10, TimeUnit.SECONDS)//设置读取超时时间
                .writeTimeout(10, TimeUnit.SECONDS)//设置写入超时时间
                .build();
        //初始化Handler
        okHandler = new Handler(context.getMainLooper());
        faild = new JSONObject();
        faild.put("code", 1);
        faild.put("msg", "unknown");
    }


    private static HttpManager mInstance;
    private static final String TAG = HttpManager.class.getSimpleName();
    /**
     * 获取单例引用
     *
     * @return
     */
    public static HttpManager getInstance(Context context) {
        HttpManager inst = mInstance;
        if (inst == null) {
            synchronized (HttpManager.class) {
                inst = mInstance;
                if (inst == null) {
                    inst = new HttpManager(context.getApplicationContext());
                    mInstance = inst;
                }
            }
        }
        return inst;
    }
    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");//mdiatype 这个需要和服务端保持一致
}
