package org.chaosstudio.lib.net.http;

import com.alibaba.fastjson.JSONObject;

import org.chaosstudio.lib.net.http.requests.RequestPools;

import java.util.Map;
import java.util.concurrent.Executor;

/**
 * Created by jsen on 2017/7/15.
 */

public abstract class RequestBase {
    protected boolean keeped = false;

    public boolean isKeeped() {
        return keeped;
    }

    public void setKeeped(boolean keeped) {
        this.keeped = keeped;
    }

    protected RequestCallBack requestCallBack = null;

    protected RequestBuilder builder;


    public RequestBase(RequestBuilder builder) {
        this.builder = builder;
    }


    // 保存事件到缓存池，等待RequestPools.release执行所有任务
    public void keep() {
        RequestPools.keep(this);
    }
    // 保存事件到缓存池，等待RequestPools.release执行所有任务
    public void keep(RequestCallBack requestCallBack) {
        this.requestCallBack = requestCallBack;
        keep();
    }
    // 执行RequestPools缓存池的所有任务
    public void releaseAll() {
        if (!isKeeped())
            keep();
        RequestPools.release();
    }
    // 执行RequestPools缓存池的所有任务
    public void releaseAll(RequestCallBack requestCallBack) {
        if (!isKeeped())
            keep(requestCallBack);
        RequestPools.release();
    }
    // 执行RequestPools缓存池的所有任务
    public void releaseSelf() {
        RequestPools.releaseOne(this);
    }
    // 执行RequestPools缓存池的所有任务
    public void releaseSelf(RequestCallBack requestCallBack) {
        this.requestCallBack = requestCallBack;
        RequestPools.releaseOne(this);
    }


    /**
     * 将参数转换为 key1=valu1&ke2=value2 的形式
     * @param paramMap 参数
     * @return get形式参数
     */
    protected static String parserParamsToGetForm(Map<String, Object> paramMap){
        if(paramMap == null || paramMap.isEmpty()){
            return "" ;
        } else {
            StringBuilder sb = new StringBuilder();
            for(String key: paramMap.keySet()){
                String value = (String)paramMap.get(key);
                if(sb.length()>=1){
                    sb.append("&").append(key).append("=").append(value);
                }else{
                    sb.append(key).append("=").append(value);
                }
            }
            return sb.toString();
        }
    }



    // 执行任务
    public abstract void exec(Executor executor);
    // protected abstract InnerMode exec(RequestCallBack callBack);
    protected abstract InnerMode handle();


    public class InnerMode{
        public JSONObject data;
        public JSONObject heads;
        public Result flag = Result.OK;
    }

    public enum Result {
        HTTP_ERROR,
        PARSER_ERROR,
        OK,
    }
}
