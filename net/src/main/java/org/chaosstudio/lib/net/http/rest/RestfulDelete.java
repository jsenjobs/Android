package org.chaosstudio.lib.net.http.rest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.chaosstudio.lib.net.http.IOUtils;
import org.chaosstudio.lib.net.http.RequestBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static java.net.HttpURLConnection.HTTP_CREATED;
import static java.net.HttpURLConnection.HTTP_OK;

/**
 * Created by jsen on 26/09/2016.
 *
 */
public class RestfulDelete extends RestfulBase {

    public RestfulDelete(RequestBuilder builder) {
        super(builder);
    }

    @Override
    protected InnerMode handle() {
        BufferedReader in = null;
        HttpURLConnection conn = null;
        String result = "";
        InnerMode innerMode = new InnerMode();
        try {
            URL url = new URL(builder.getApiPath());
            conn = (HttpURLConnection)url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            conn.setDoOutput(true);
            conn.setRequestMethod("DELETE");
            // 定义 BufferedReader输入流来读取URL的响应
            if (conn.getResponseCode() == HTTP_OK || conn.getResponseCode() == HTTP_CREATED) {
                in = new BufferedReader(new InputStreamReader(
                        conn.getInputStream()));
            } else {
                in = new BufferedReader(new InputStreamReader(
                        conn.getErrorStream()));
            }

            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }

            try {
                JSONObject data = JSON.parseObject(result);
                JSONObject heads = (JSONObject) JSON.toJSON(conn.getHeaderFields());
                innerMode.data = data;
                innerMode.heads = heads;
                innerMode.flag = Result.OK;
            } catch (Exception e) {
                e.printStackTrace();
                innerMode.flag = Result.PARSER_ERROR;
            }
        } catch (Exception e) {
            e.printStackTrace();
            innerMode.flag = Result.HTTP_ERROR;
        }// 使用finally块来关闭输入流
        finally {
            IOUtils.closeHttpURLConnection(conn);
            IOUtils.closeStream(in);
        }
        return innerMode;
    }


}
