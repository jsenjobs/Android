package com.example.jsen.deliverwater.weex.extend.adapter;

import com.alibaba.weex.commons.adapter.DefaultWebSocketAdapter;
import com.taobao.weex.appfram.websocket.IWebSocketAdapter;
import com.taobao.weex.appfram.websocket.IWebSocketAdapterFactory;

/**
 * Created by jsen on 2017/12/27.
 */

public class WebSocketAdapterFactory implements IWebSocketAdapterFactory {
    @Override
    public IWebSocketAdapter createWebSocketAdapter() {
        return new WebSocketAdapter();
    }
}