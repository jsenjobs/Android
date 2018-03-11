package com.example.jsen.deliverwater;

import android.net.Uri;

import com.example.jsen.deliverwater.weex.WXPageActivity;


/**
 * Created by jsen on 2017/12/27.
 */

public class UrlTest {
    public static void main(String[] args) {

        String url = "file://assets/dist/mainContainer.js";
        url = url.replaceFirst("file://", WXPageActivity.JLocal + "://");

        Uri rawUri = Uri.parse(url);

        System.out.println(rawUri);
    }
}
