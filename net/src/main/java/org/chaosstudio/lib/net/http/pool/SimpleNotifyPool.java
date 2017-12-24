package org.chaosstudio.lib.net.http.pool;

import android.content.Context;

import com.alibaba.fastjson.JSONObject;

import org.chaosstudio.lib.net.http.RequestCallBack;

import java.util.ArrayList;
import java.util.Collections;

/**
 * Created by jsen on 08/10/2016.
 *
 * 被观察者
 *
 * 所有需要监听事件的对象都要先注册 RequestCallBack
 * 然后会在此统一分发
 *
 */
public class SimpleNotifyPool implements RequestCallBack {

    private ArrayList<RequestCallBack> register = new ArrayList<>();
    private static SimpleNotifyPool simpleNotifyPool;

    public static SimpleNotifyPool getSimpleNotifyPool() {
        if (simpleNotifyPool == null) {
            simpleNotifyPool = new SimpleNotifyPool();
        }
        return simpleNotifyPool;
    }


    public void registerMessageListener(RequestCallBack listener,Context mContext) {

        if (!register.contains(listener)) {
            register.add(listener);
            // 按照接收顺序倒序
            Collections.sort(register, new SimpleOrderComparator<RequestCallBack>(mContext));
        }
    }


    public void removeMessageListener(RequestCallBack listener) {
        for (int i = 0; i < register.size(); i++) {
            if (listener.getClass() == register.get(i).getClass()) {
                register.remove(i);
            }
        }
    }

    public ArrayList<RequestCallBack> getMessageListeners() {
        return register;
    }


    @Override
    public void onResult(String msgTag, JSONObject data, JSONObject heads) {
        for (RequestCallBack requestCallBack:register) {
            requestCallBack.onResult(msgTag, data, heads);
        }
    }

    @Override
    public void httpError(String msgTag) {
        for (RequestCallBack requestCallBack:register) {
            requestCallBack.httpError(msgTag);
        }
    }

    @Override
    public void parserError(String msgTag) {
        for (RequestCallBack requestCallBack:register) {
            requestCallBack.parserError(msgTag);
        }
    }

    @Override
    public void error(String msgTag) {
        for (RequestCallBack requestCallBack:register) {
            requestCallBack.error(msgTag);
        }
    }

    @Override
    public void onProgress(String msgTag, Integer progress) {
        for (RequestCallBack requestCallBack:register) {
            requestCallBack.onProgress(msgTag, progress);
        }
    }

    @Override
    public void onCancelled(String msgTag) {
        for (RequestCallBack requestCallBack:register) {
            requestCallBack.onCancelled(msgTag);
        }
    }
}
