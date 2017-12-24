package org.chaosstudio.lib.net.http;


import com.alibaba.fastjson.JSONObject;

/**
 * Created by jsen on 06/10/2016.
 */
public interface RequestCallBack {
    void onResult(String msgTag, JSONObject data, JSONObject heads);

    void httpError(String msgTag);

    void parserError(String msgTag);

    void error(String msgTag);

    void onProgress(String msgTag, Integer progress);

    void onCancelled(String msgTag);
}
