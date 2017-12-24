/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.example.jsen.deliverwater.weex.extend.module;

import android.app.Activity;
import android.content.Context;
import android.widget.Toast;

import com.alibaba.fastjson.JSONObject;
import com.example.jsen.deliverwater.pay.AliPay;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

public class MyModule extends WXModule {

  @JSMethod(uiThread = true)
  public void printLog(String msg) {
    Toast.makeText(mWXSDKInstance.getContext(),msg,Toast.LENGTH_SHORT).show();
  }

  @JSMethod(uiThread = false)
  public void pay(JSONObject options, JSCallback callback) {
    if (callback != null) {
      Context context = mWXSDKInstance.getContext();
      if (context instanceof Activity) {
        String platform = options.getString("platform");
        if (options.containsKey("platform") && options.containsKey("num") && options.containsKey("type")) {

          if ("ali".equals(platform)) {
            int num = options.getInteger("num");
            int type = options.getInteger("type");
            AliPay.pay(type, num, (Activity) context, callback);
          } else {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("msg", "不知此平台");
            callback.invoke(jsonObject);
          }
        } else {
          JSONObject jsonObject = new JSONObject();
          jsonObject.put("msg", "参数错误");
          callback.invoke(jsonObject);
        }
      }
    }
  }
}
