package org.chaosstudio.lib.net.http;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by jsen on 2017/7/15.
 */

public class RequestCallBackAdapter implements RequestCallBack {


    public void onSuccess(String msgTag, JSONObject data, JSONObject heads) {

    }

    public void onFaild(String msgTag, String tip) {

    }

    @Override
    public void onResult(String msgTag, JSONObject data, JSONObject heads) {
        onSuccess(msgTag, data, heads);
    }

    @Override
    public void httpError(String msgTag) {
        onFaild(msgTag, "网络错误");
    }

    @Override
    public void parserError(String msgTag) {
        onFaild(msgTag, "Json解析出处");
    }

    @Override
    public void error(String msgTag) {
        onFaild(msgTag, "未知错误");
    }

    @Override
    public void onProgress(String msgTag, Integer progress) {

    }

    @Override
    public void onCancelled(String msgTag) {
        onFaild(msgTag, "取消");
    }


}
