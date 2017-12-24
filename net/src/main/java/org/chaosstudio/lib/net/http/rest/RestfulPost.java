package org.chaosstudio.lib.net.http.rest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.chaosstudio.lib.net.http.IOUtils;
import org.chaosstudio.lib.net.http.RequestBuilder;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

import static java.net.HttpURLConnection.HTTP_CREATED;
import static java.net.HttpURLConnection.HTTP_OK;

/**
 * Created by jsen on 26/09/2016.
 *
 */
public class RestfulPost extends RestfulBase {

    public RestfulPost(RequestBuilder builder) {
        super(builder);
    }


    @Override
    protected InnerMode handle() {
        if (builder.getFileMap() != null) {
            return cross();
        } else {
            return submitPostStr();
        }
    }

    private InnerMode submitPostStr() {
        String result = "";
        BufferedReader in = null;
        HttpURLConnection conn = null;
        InnerMode innerMode = new InnerMode();
        String BOUNDARY = "---------------------------123821742118716"; //boundary就是request头和上传文件内容的分隔符
        try {
            URL url = new URL(builder.getApiPath());
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Connection", "Keep-Alive");
            conn.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN; rv:1.9.2.6)");

            if (builder.getHeads()!=null)
                for (Map.Entry<String, String> entry:builder.getHeads().entrySet()) {
                    conn.setRequestProperty(entry.getKey(), entry.getValue());
                }
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            OutputStream out = new DataOutputStream(conn.getOutputStream());
            // text
            if (builder.getTextParams() != null) {
                StringBuilder strBuf = new StringBuilder();
                for (Object o : builder.getTextParams().entrySet()) {
                    Map.Entry entry = (Map.Entry) o;
                    String inputName = (String) entry.getKey();
                    String inputValue = (String) entry.getValue();
                    if (inputValue == null) {
                        continue;
                    }
                    strBuf.append(inputName).append("=").append(URLEncoder.encode(inputValue, "utf-8")).append("&");
                }
                if (strBuf.length() > 0) {
                    strBuf.deleteCharAt(strBuf.length() - 1);
                }
                out.write(strBuf.toString().getBytes());
            }

            out.flush();
            out.close();

            // 读取返回数据
            if (conn.getResponseCode() == HTTP_OK || conn.getResponseCode() == HTTP_CREATED) {
                in = new BufferedReader(new InputStreamReader(
                        conn.getInputStream()));
            } else {
                in = new BufferedReader(new InputStreamReader(
                        conn.getErrorStream()));
            }

            String line;
            while ((line = in.readLine()) != null) {
                result+=line;
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
            // System.out.println("发送POST请求出错。" + urlStr);
            e.printStackTrace();
            innerMode.flag = Result.HTTP_ERROR;
        } finally {
            IOUtils.closeHttpURLConnection(conn);
            IOUtils.closeStream(in);
        }
        return innerMode;
    }


    private InnerMode cross() {
        String result = "";
        BufferedReader in = null;
        HttpURLConnection conn = null;
        InnerMode innerMode = new InnerMode();
        String BOUNDARY = "---------------------------123821742118716"; //boundary就是request头和上传文件内容的分隔符
        try {
            URL url = new URL(builder.getApiPath());
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Connection", "Keep-Alive");
            conn.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN; rv:1.9.2.6)");

            if (builder.getHeads()!=null)
                for (Map.Entry<String, String> entry:builder.getHeads().entrySet()) {
                    conn.setRequestProperty(entry.getKey(), entry.getValue());
                }
            conn.setRequestProperty("Content-Type",
                    "multipart/form-data; boundary=" + BOUNDARY);

            OutputStream out = new DataOutputStream(conn.getOutputStream());
            // text
            if (builder.getTextParams() != null) {
                StringBuilder strBuf = new StringBuilder();
                for (Object o : builder.getTextParams().entrySet()) {
                    Map.Entry entry = (Map.Entry) o;
                    String inputName = (String) entry.getKey();
                    String inputValue = (String) entry.getValue();
                    if (inputValue == null) {
                        continue;
                    }
                    strBuf.append("\r\n").append("--").append(BOUNDARY).append("\r\n");
                    strBuf.append("Content-Disposition: form-data; name=\"").
                            append(inputName).append("\"\r\n\r\n");
                    strBuf.append(inputValue);
                }
                out.write(strBuf.toString().getBytes());
            }

            // file
            if (builder.getFileMap() != null) {
                for (Object o : builder.getFileMap().entrySet()) {
                    Map.Entry entry = (Map.Entry) o;
                    String inputName = (String) entry.getKey();
                    String inputValue = (String) entry.getValue();
                    if (inputValue == null) {
                        continue;
                    }
                    File file = new File(inputValue);
                    String filename = file.getName();
                    String contentType = "multipart/form-data";
                    /*new MimetypesFileTypeMap()
                            .getContentType(file);
                    if (filename.endsWith(".png")) {
                        contentType = "image/png";
                    }
                    if (contentType == null || contentType.equals("")) {
                        contentType = "application/octet-stream";
                    }*/
                    String strBuf = "\r\n" + "--" + BOUNDARY + "\r\n" +
                            "Content-Disposition: form-data; name=\""
                            + inputName + "\"; filename=\"" + filename
                            + "\"\r\n" +
                            "Content-Type:" + contentType + "\r\n\r\n";

                    out.write(strBuf.getBytes());

                    DataInputStream fileInput = new DataInputStream(
                            new FileInputStream(file));
                    int bytes;
                    byte[] bufferOut = new byte[1024];
                    while ((bytes = fileInput.read(bufferOut)) != -1) {
                        out.write(bufferOut, 0, bytes);
                    }
                    fileInput.close();
                }
            }

            byte[] endData = ("\r\n--" + BOUNDARY + "--\r\n").getBytes();
            out.write(endData);
            out.flush();
            out.close();

            // 读取返回数据
            if (conn.getResponseCode() == HTTP_OK || conn.getResponseCode() == HTTP_CREATED) {
                in = new BufferedReader(new InputStreamReader(
                        conn.getInputStream()));
            } else {
                in = new BufferedReader(new InputStreamReader(
                        conn.getErrorStream()));
            }

            String line;
            while ((line = in.readLine()) != null) {
                result+=line;
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
            // System.out.println("发送POST请求出错。" + urlStr);
            e.printStackTrace();
            innerMode.flag = Result.HTTP_ERROR;
        } finally {
            IOUtils.closeHttpURLConnection(conn);
            IOUtils.closeStream(in);
        }
        return innerMode;
    }
}
