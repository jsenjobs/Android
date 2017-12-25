package com.example.jsen.deliverwater.pay;

import android.app.Activity;
import android.util.Log;

import com.alipay.sdk.app.EnvUtils;
import com.alipay.sdk.app.PayTask;
import com.example.jsen.deliverwater.weex.extend.module.SimpleStore;
import com.taobao.weex.bridge.JSCallback;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

/**
 * Created by jsen on 2017/12/24.
 */

public class AliPay {
    public static void pay(final int type, final int num, final Activity activity, final JSCallback callback) {
        Runnable r = new Runnable() {
            @Override
            public void run() {
                String openid = SimpleStore.getString(activity, "userKey");
                String orderInfo = executeHttpGet(openid, type, num);
                if (orderInfo!=null) {
                    Log.e("Orerinfo", orderInfo);
                    doPay(activity, orderInfo, callback);
                } else {
                    com.alibaba.fastjson.JSONObject jsonObject = new com.alibaba.fastjson.JSONObject();
                    jsonObject.put("msg", "无法生成订单信息");
                    callback.invoke(jsonObject);
                    Log.e("Orerinfo", "null");
                }
            }
        };
        new Thread(r).start();
    }

    public static void doPay(final Activity activity, final String orderInfo, final JSCallback callback) {

        Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
                EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
                PayTask alipay = new PayTask(activity);
                Map<String, String> result = alipay.payV2(orderInfo, true);
                Log.i("msp", result.toString());

                if (callback != null) {
                    callback.invoke(result);
                }
            }
        };

        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    private static String executeHttpGet(String openid, int type, int num) {
        String result = null;
        URL url;
        HttpURLConnection connection = null;
        InputStreamReader in = null;
        try {
            url = new URL("http://192.168.1.102:7082/prepay/ali/" + openid + "/" + type + "/" + num);
            Log.e("hhhh", "http://192.168.1.102:7082/prepay/ali/" + openid + "/" + type + "/" + num);
            connection = (HttpURLConnection) url.openConnection();
            in = new InputStreamReader(connection.getInputStream());
            BufferedReader bufferedReader = new BufferedReader(in);
            StringBuffer strBuffer = new StringBuffer();
            String line = null;
            while ((line = bufferedReader.readLine()) != null) {
                strBuffer.append(line);
            }
            result = strBuffer.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        return result;
    }
}
