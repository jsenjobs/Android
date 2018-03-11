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
import android.text.TextUtils;
import android.util.Log;

import com.alibaba.fastjson.JSONObject;
import com.alipay.sdk.app.EnvUtils;
import com.alipay.sdk.app.PayTask;
import com.example.jsen.deliverwater.Constants;
import com.example.jsen.deliverwater.WXApplication;
import com.example.jsen.deliverwater.bus.CommonBusMsg;
import com.example.jsen.deliverwater.pay.PayResult;
import com.example.jsen.deliverwater.weex.WXPageActivity;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;
import com.tencent.mm.opensdk.modelpay.PayReq;

import org.greenrobot.eventbus.EventBus;

import java.util.Map;

public class MyModule extends WXModule {

  @JSMethod(uiThread = true)
  public void printLog(String msg) {
    Log.e("WWWWWWW", msg);
    // Toast.makeText(mWXSDKInstance.getContext(),msg,Toast.LENGTH_SHORT).show();
  }

  @JSMethod(uiThread = false)
  public void pay(final JSONObject options) {
    Context context = mWXSDKInstance.getContext();
    if (context instanceof Activity) {
      final Activity activity = (Activity) context;
      String platform = options.getString("platform");
      if ("ali".equals(platform)) {

        if (options.containsKey("orderStr")) {
          Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
              // EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
              PayTask alipay = new PayTask((Activity) mWXSDKInstance.getContext());
              Map<String, String> result = alipay.payV2(options.getString("orderStr"), true);

              Log.i("msp", result.toString());


              PayResult payResult = new PayResult(result);
              /*
               对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
               */
              // String resultInfo = payResult.getResult();// 同步返回需要验证的信息
              String resultStatus = payResult.getResultStatus();

              Log.i("msp2", payResult.toString());
              if (TextUtils.equals(resultStatus, "9000")) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("code", 0);
                jsonObject.put("msg", "支付成功");
                EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
              } else {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("code", 1);
                jsonObject.put("msg", "支付失败");
                EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
              }
              // activity.Notify(WXPageActivity.SDK_PAY_FLAG, result);
            }
          };

          Thread payThread = new Thread(payRunnable);
          payThread.start();

        } else {
          JSONObject jsonObject = new JSONObject();
          jsonObject.put("code", 1);
          jsonObject.put("msg", "参数错误");
          EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
          // activity.Notify(WXPageActivity.PAY_ERROR, jsonObject);
        }



      } else if ("wx".equals(platform)) {
        try {

          WXApplication wxApplication = (WXApplication)activity.getApplication();
          JSONObject payData = options.getJSONObject("data");
          PayReq request = new PayReq();
          request.appId = Constants.wxAppID;
          request.partnerId = Constants.wxPartnerID;
          request.prepayId= payData.getString("prepay_id");
          request.packageValue = "Sign=WXPay";
          request.nonceStr= payData.getString("nonce_str");
          request.timeStamp= payData.getInteger("timeStamp") + "";
          request.sign= payData.getString("paySign");
          wxApplication.msgApi.sendReq(request);
        } catch (Exception e) {
          JSONObject jsonObject = new JSONObject();
          jsonObject.put("code", 1);
          jsonObject.put("msg", "微信支付失败");
          EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
          // activity.Notify(WXPageActivity.PAY_ERROR, jsonObject);
        }

        /*
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", 1);
        jsonObject.put("msg", "暂未实现微信支付");
        activity.Notify(WXPageActivity.PAY_ERROR, jsonObject);
        */
      } else {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", 1);
        jsonObject.put("msg", "不知此平台");
        EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
        // activity.Notify(WXPageActivity.PAY_ERROR, jsonObject);
      }
    } else {
      JSONObject jsonObject = new JSONObject();
      jsonObject.put("code", 1);
      jsonObject.put("msg", "不支持的Context");
      EventBus.getDefault().post(new CommonBusMsg(WXPageActivity.PAY_RESULT, jsonObject));
      // mWXSDKInstance.fireGlobalEventCallback("PayResult", jsonObject);
    }
  }

  /*
  private static final int SDK_PAY_FLAG = 1;
  private static final int SOME_ERROR = 2;
  private static Handler mHandler = new Handler() {
    public void handleMessage(Message msg) {
      switch (msg.what) {
        case SDK_PAY_FLAG:
          Log.e("PAYRESULT", msg.obj.toString());
          break;
        case SOME_ERROR:
          break;
      }
    }
  };
  */
}
