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
package com.example.jsen.deliverwater.weex;

import android.annotation.TargetApi;
import android.app.Activity;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import com.alibaba.weex.commons.util.ScreenUtil;
import com.example.jsen.deliverwater.weex.https.WXHttpManager;
import com.example.jsen.deliverwater.weex.https.WXHttpTask;
import com.example.jsen.deliverwater.weex.https.WXRequestListener;
import com.example.jsen.deliverwater.weex.util.WXCacheLocalAssetsUtils;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.RenderContainer;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;

public abstract class WXBaseActivity extends AppCompatActivity implements IWXRenderListener, WXSDKInstance.NestedInstanceInterceptor {
  private static final String TAG = "WXBaseActivity";

  public static final String JLocal = "jwxpage";


  protected WXSDKInstance mInstance;
  protected HashMap mConfigMap = new HashMap<String, Object>();

  protected ViewGroup mContainer;
  protected Uri mUri;


  @Override
  public void onCreate(Bundle savedInstanceState, PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
    // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    //   setTranslucentStatus(true);
    // }
  }

  protected void loadWXFromJLocal(boolean reload) {
    if (reload && mInstance != null) {
      mInstance.destroy();
      mInstance = null;
    }
    if (mInstance == null) {
      RenderContainer renderContainer = new RenderContainer(this);

      mInstance = new WXSDKInstance(this);
      mInstance.setRenderContainer(renderContainer);
      mInstance.registerRenderListener(this);
      mInstance.setNestedInstanceInterceptor(this);
      mInstance.setTrackComponent(true);
    }
    mContainer.post(new Runnable() {
      @Override
      public void run() {
        Activity ctx = WXBaseActivity.this;
        Rect outRect = new Rect();
        ctx.getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);
        mConfigMap.put("bundleUrl", mUri.toString());
        String path = JLocal.equals(mUri.getScheme()) ? assembleFilePath(mUri) : mUri.toString();
        Log.e("loadWXFromJLocal weex:", path);
        mInstance.render(TAG, WXCacheLocalAssetsUtils.loadAsset(path, WXBaseActivity.this),
                mConfigMap, null,
                WXRenderStrategy.APPEND_ASYNC);
      }
    });
    mInstance.onActivityCreate();
  }




  protected void loadWXFromLocal(boolean reload) {
    if (reload && mInstance != null) {
      mInstance.destroy();
      mInstance = null;
    }
    if (mInstance == null) {
      RenderContainer renderContainer = new RenderContainer(this);

      mInstance = new WXSDKInstance(this);
      mInstance.setRenderContainer(renderContainer);
      mInstance.registerRenderListener(this);
      mInstance.setNestedInstanceInterceptor(this);
      mInstance.setTrackComponent(true);
    }
    mContainer.post(new Runnable() {
      @Override
      public void run() {
        Activity ctx = WXBaseActivity.this;
        Rect outRect = new Rect();
        ctx.getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);
        mConfigMap.put("bundleUrl", mUri.toString());
        String path = "file".equals(mUri.getScheme()) ? assembleFilePath(mUri) : mUri.toString();
        Log.e("local weex:", path);
        mInstance.render(TAG, WXCacheLocalAssetsUtils.loadAsset(path, WXBaseActivity.this),
                mConfigMap, null,
                WXRenderStrategy.APPEND_ASYNC);
      }
    });
    mInstance.onActivityCreate();
  }

  protected void loadWXFromService(final String url) {
    if (mInstance != null) {
      mInstance.destroy();
    }

    RenderContainer renderContainer = new RenderContainer(this);
    mContainer.addView(renderContainer);

    mInstance = new WXSDKInstance(this);
    mInstance.setRenderContainer(renderContainer);
    mInstance.registerRenderListener(this);
    mInstance.setNestedInstanceInterceptor(this);
    mInstance.setBundleUrl(url);
    mInstance.setTrackComponent(true);

    WXHttpTask httpTask = new WXHttpTask();
    httpTask.url = url;
    Log.e("loadWXFromRemotr weex:", url);
    httpTask.requestListener = new WXRequestListener() {

      @Override
      public void onSuccess(WXHttpTask task) {
        Log.i(TAG, "into--[http:onSuccess] url:" + url);
        try {
          mConfigMap.put("bundleUrl", url);
          mInstance.render(TAG, new String(task.response.data, "utf-8"), mConfigMap, null, ScreenUtil.getDisplayWidth(WXBaseActivity.this), ScreenUtil.getDisplayHeight(WXBaseActivity.this), WXRenderStrategy.APPEND_ASYNC);
        } catch (UnsupportedEncodingException e) {
          e.printStackTrace();
        }
      }

      @Override
      public void onError(WXHttpTask task) {
        Log.i(TAG, "into--[http:onError]");
        Toast.makeText(getApplicationContext(), "network error!", Toast.LENGTH_SHORT).show();
      }
    };

    WXHttpManager.getInstance().sendRequest(httpTask);
    mInstance.onActivityCreate();
  }

  private String assembleFilePath(Uri uri) {
    if (uri != null && uri.getPath() != null) {
      return uri.getPath().replaceFirst("/", "");
    }
    return "";
  }

  @TargetApi(19)
  private void setTranslucentStatus(boolean on) {
    Window win = getWindow();
    WindowManager.LayoutParams winParams = win.getAttributes();
    int bits = WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS;
    if (on) {
      winParams.flags = winParams.flags | bits;
    } else {
      winParams.flags = winParams.flags & bits;
    }
    win.setAttributes(winParams);
  }

}
