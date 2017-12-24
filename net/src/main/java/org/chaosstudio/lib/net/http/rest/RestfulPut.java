package org.chaosstudio.lib.net.http.rest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.chaosstudio.lib.net.http.IOUtils;
import org.chaosstudio.lib.net.http.RequestBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import static java.net.HttpURLConnection.HTTP_CREATED;
import static java.net.HttpURLConnection.HTTP_OK;

/**
 * Created by jsen on 26/09/2016.
 *
 */
public class RestfulPut extends RestfulBase {

    public RestfulPut(RequestBuilder builder) {
        super(builder);
    }

    @Override
    protected InnerMode handle() {
        BufferedReader in = null;
        HttpURLConnection conn = null;
        String result ="";
        InnerMode innerMode = new InnerMode();
        try {
            URL url = new URL(builder.getApiPath());
            conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("PUT");
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            String paramStr = parserParamsToGetForm(builder.getTextParams());
            conn.setDoInput(true);
            conn.setDoOutput(true);
            OutputStream os = conn.getOutputStream();
            os.write(paramStr.getBytes("utf-8"));
            os.close();

            if (conn.getResponseCode() == HTTP_OK || conn.getResponseCode() == HTTP_CREATED) {
                in = new BufferedReader(new InputStreamReader(
                        conn.getInputStream()));
            } else {
                in = new BufferedReader(new InputStreamReader(
                        conn.getErrorStream()));
            }

            String line ;
            while( (line =in.readLine()) != null ){
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
        } finally {
            IOUtils.closeHttpURLConnection(conn);
            IOUtils.closeStream(in);
        }
        return innerMode;
    }
}
