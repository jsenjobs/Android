package org.chaosstudio.lib.net.http;

import org.chaosstudio.lib.net.http.rest.RestfulGet;

import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jsen on 26/09/2016.
 *
 */
public class RequestBuilder {

    private HttpMethod httpMethod = HttpMethod.GET;

    private String apiPath = null;
    // 文本参数
    private Map<String, Object> textParams;
    // 请求头
    private Map<String, String> heads;
    // 上传文件
    private Map<String, String> fileMap;

    private String msgTag = "none";


    public RequestBuilder(HttpMethod httpMethod,
                          String apiPath,
                          Map<String, Object> textParams,
                          Map<String, String> heads,
                          Map<String, String> fileMap) {
        this.httpMethod = httpMethod;
        this.apiPath = apiPath;
        this.textParams = textParams;
        this.heads = heads;
        this.fileMap = fileMap;
    }

    public RequestBuilder() {
    }

    public HttpMethod getHttpMethod() {
        return httpMethod;
    }

    public RequestBuilder setHttpMethod(HttpMethod httpMethod) {
        this.httpMethod = httpMethod;
        return this;
    }

    public String getApiPath() {
        return apiPath;
    }

    public RequestBuilder setApiPath(String apiPath) {
        this.apiPath = apiPath;
        return this;
    }

    public Map<String, Object> getTextParams() {
        return textParams;
    }

    public RequestBuilder setTextParams(Map<String, Object> textParams) {
        this.textParams = textParams;
        return this;
    }

    public Map<String, String> getHeads() {
        return heads;
    }

    public RequestBuilder setHeads(Map<String, String> heads) {
        this.heads = heads;
        return this;
    }

    public Map<String, String> getFileMap() {
        return fileMap;
    }

    public RequestBuilder setFileMap(Map<String, String> fileMap) {
        this.fileMap = fileMap;
        return this;
    }

    public String getMsgTag() {
        return msgTag;
    }

    public RequestBuilder setMsgTag(String msgTag) {
        if (msgTag!=null && !"".equals(msgTag)) {
            this.msgTag = msgTag;
        }
        return this;
    }


    private static Map<HttpMethod, Class> requestImpls = new HashMap<>();
    public static void registerRequestImpl(HttpMethod method, Class rimpl) {
        if (!requestImpls.containsKey(method)) {
            requestImpls.put(method, rimpl);
        }
    }
    public RequestBase build() {
        Class m = requestImpls.get(httpMethod);
        if (m!=null) {
            try {
                Constructor c = m.getDeclaredConstructor(RequestBuilder.class);
                return (RequestBase) c.newInstance(this);
            } catch (Exception e) {
                e.printStackTrace();
                return new RestfulGet(this);
            }
        }
        return new RestfulGet(this);
    }
}
