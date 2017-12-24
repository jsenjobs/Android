package com.example.jsen.deliverwater.weex.extend.module;

import android.content.Context;

import com.taobao.weex.appfram.storage.IWXStorageAdapter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jsen on 2017/12/24.
 */

public class WXStorageAdapter implements IWXStorageAdapter {

    Context context;

    public WXStorageAdapter(Context context) {
        this.context = context;
    }

    @Override
    public void setItem(String key, String value, OnResultReceivedListener listener) {
        SimpleStore.put(context, key, value);
        if (listener != null) {
            Map<String, Object> data = new HashMap<>();
            data.put("result", "success");
            listener.onReceived(data);
        }
    }

    @Override
    public void getItem(String key, OnResultReceivedListener listener) {
        if (listener != null) {
            Map<String, Object> data = new HashMap<>();
            data.put("result", "success");
            data.put("data", SimpleStore.getString(context, key));
            listener.onReceived(data);
        }
    }

    @Override
    public void removeItem(String key, OnResultReceivedListener listener) {
        SimpleStore.remove(context, key);
        if (listener != null) {
            Map<String, Object> data = new HashMap<>();
            data.put("result", "success");
            listener.onReceived(data);
        }

    }

    @Override
    public void length(OnResultReceivedListener listener) {

    }

    @Override
    public void getAllKeys(OnResultReceivedListener listener) {

    }

    @Override
    public void setItemPersistent(String key, String value, OnResultReceivedListener listener) {

    }

    @Override
    public void close() {

    }
}
