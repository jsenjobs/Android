package com.example.jsen.deliverwater.bus;


import com.alibaba.fastjson.JSONObject;

/**
 * Created by jsen on 2017/12/31.
 */

public class CommonBusMsg {
    public int flag = 0;
    public JSONObject jsonObject;

    public CommonBusMsg(int flag, JSONObject jsonObject) {
        this.flag = flag;
        this.jsonObject = jsonObject;
    }
}
