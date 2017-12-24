package org.chaosstudio.lib.net.http2;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

/**
 * Created by jsen on 2017/8/20.
 */

class HttpBuild {
    //处理参数
    static String buildParams(Map<String, String> params) throws UnsupportedEncodingException {
        if (params == null) return "";
        int pos = 0;
        StringBuilder tempParams = new StringBuilder();
        for (String key : params.keySet()) {
            if (pos > 0) {
                tempParams.append("&");
            }
            //对参数进行URLEncoder
            tempParams.append(String.format("%s=%s", key, URLEncoder.encode(params.get(key), "utf-8")));
            pos++;
        }
        return tempParams.toString();
    }
}
