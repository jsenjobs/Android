package org.chaosstudio.lib.net.http.rest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.chaosstudio.lib.net.http.IOUtils;
import org.chaosstudio.lib.net.http.RequestBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import static java.net.HttpURLConnection.HTTP_CREATED;
import static java.net.HttpURLConnection.HTTP_OK;

/**
 * Created by jsen on 26/09/2016.
 *
 */
public class RestfulGet extends RestfulBase {
    public RestfulGet(RequestBuilder builder) {
        super(builder);
    }

    @Override
    protected InnerMode handle() {
        String result = "";
        BufferedReader in = null;
        HttpURLConnection conn = null;
        InnerMode innerMode = new InnerMode();
        try {
            String urlNameString = builder.getApiPath();

            String param = parserParamsToGetForm(builder.getTextParams());
            if (!"".equals(param)) {
                urlNameString += "?" + param;
            }

            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            conn = (HttpURLConnection)realUrl.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // conn.setDoOutput(true);
            // conn.setRequestMethod("GET");

            if (builder.getHeads()!=null)
                for (Map.Entry<String, String> entry:builder.getHeads().entrySet()) {
                    conn.setRequestProperty(entry.getKey(), entry.getValue());
                }
            // 建立实际的连接
            conn.connect();
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
                System.out.println(result);
                JSONObject data = JSON.parseObject(result);
                JSONObject heads = (JSONObject) JSON.toJSON(conn.getHeaderFields());
                innerMode.data = data;
                innerMode.heads = heads;
                innerMode.flag = Result.OK;
            } catch (Exception e) {
                e.printStackTrace();
                innerMode.flag = Result.PARSER_ERROR;
                return innerMode;
            }

        } catch (Exception e) {
            e.printStackTrace();
            innerMode.flag = Result.HTTP_ERROR;
            return innerMode;
        }
        // 使用finally块来关闭输入流
        finally {
            IOUtils.closeHttpURLConnection(conn);
            IOUtils.closeStream(in);
        }

        return innerMode;
    }
}
