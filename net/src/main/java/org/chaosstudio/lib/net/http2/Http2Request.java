package org.chaosstudio.lib.net.http2;

import org.chaosstudio.lib.net.http2.utils.HttpMethod;

import java.util.Map;

import okhttp3.Call;

/**
 * Created by jsen on 2017/8/20.
 */

public class Http2Request {
    String url;
    HttpMethod method;
    HttpManager restManager;
    Map<String, String> params;
    Map<String, String> headers;

    Http2Request(HttpManager restManager, HttpMethod method, String url) {
        this.restManager = restManager;
        this.url = url;
        this.method = method;
    }

    public Http2Request params(Map<String, String> params) {
        this.params = params;
        return this;
    }

    public Http2Request headers(Map<String, String> headers) {
        this.headers = headers;
        return this;
    }

    public byte[] execSync() {
        return restManager.execSync(this);
    }
    public <T> Call execAsync(ReqCallBack<T> callBack) {
        return restManager.execAsync(this, callBack);
    }



    public interface ReqCallBack<T> {
        /**
         * 响应成功
         */
        void onReqSuccess(T result);

        /**
         * 响应失败
         */
        void onReqFailed(T errorMsg);
    }
}
