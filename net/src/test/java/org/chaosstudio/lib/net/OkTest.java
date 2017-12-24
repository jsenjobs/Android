package org.chaosstudio.lib.net;

import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by jsen on 2017/9/6.
 */

public class OkTest {
    static Logger logger = Logger.getLogger(OkTest.class.getName());
    @Test
    public void test() {
        try {
            OkHttpClient okClient = new OkHttpClient().newBuilder()
                    .connectTimeout(10, TimeUnit.SECONDS)//设置超时时间
                    .readTimeout(10, TimeUnit.SECONDS)//设置读取超时时间
                    .writeTimeout(10, TimeUnit.SECONDS)//设置写入超时时间
                    .build();
            Request.Builder builder = new Request.Builder()
                    .url("http://119.23.238.170/restaurantinfo/restaurant/retrieve")
                    .addHeader("Connection", "keep-alive");

            final Call call = okClient.newCall(builder.build());
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    logger.warning("error");
                    Assert.assertTrue(1 == 2);
                    Assert.assertTrue(1 == 2);

                    e.printStackTrace();
                    System.err.println("out0");
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    logger.info("ok");

                    Assert.assertTrue(1 == 2);
                    Assert.assertTrue(1 == 2);

                    System.err.println("out10");
                    System.err.println(response.code());
                    System.err.println(response.body().string());
                    if (response.isSuccessful()) {
                        //获取返回数据 可以是String，bytes ,byteStream
                        System.out.println(response.body().string());
                    } else {
                        System.out.println("out");
                    }
                }
            });

        } catch (Exception w) {
            w.printStackTrace();
        }
    }
}
