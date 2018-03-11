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

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.v4.util.ArrayMap;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.util.Pair;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.jsen.deliverwater.R;
import com.example.jsen.deliverwater.bus.CommonBusMsg;
import com.example.jsen.deliverwater.weex.constants.Constants;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.appfram.navigator.IActivityNavBarSetter;
import com.taobao.weex.dom.ImmutableDomObject;
import com.taobao.weex.ui.component.NestedContainer;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXLogUtils;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;

import java.lang.ref.WeakReference;
import java.util.Map;


public class WXPageActivity extends WXBaseActivity {

  private static final String TAG = "JWXPageActivity";

  @SuppressLint("StaticFieldLeak")
  public static Activity wxPageActivityInstance;

  private UIHandler uiHandler;
  private NavigatorAdapter navigatorAdapter;

  @Override
  public void onCreateNestInstance(WXSDKInstance instance, NestedContainer container) {
    Log.d(TAG, "Nested Instance created.");
  }


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_wxpage);
    setCurrentWxPageActivity(this);
    navigatorAdapter = new NavigatorAdapter(this);
    uiHandler = new UIHandler(this);

    getWindow().setFormat(PixelFormat.TRANSLUCENT);
    mUri = getIntent().getData();
    Bundle bundle = getIntent().getExtras();
    if (mUri == null && bundle == null) {
      mUri = Uri.parse(Constants.BUNDLE_URL + Constants.WEEX_SAMPLES_KEY);
    }
    if (bundle != null) {
      String bundleUrl = bundle.getString("bundleUrl");
      Log.i(TAG, "bundleUrl==" + bundleUrl);

      if (bundleUrl != null) {
        mConfigMap.put("bundleUrl", bundleUrl + Constants.WEEX_SAMPLES_KEY);
        mUri = Uri.parse(bundleUrl + Constants.WEEX_SAMPLES_KEY);

      }
    } else {
      mConfigMap.put("bundleUrl", mUri.toString() + Constants.WEEX_SAMPLES_KEY);
      // mUri = Uri.parse(mUri.toString() + Constants.WEEX_SAMPLES_KEY)
    }

    if (mUri == null) {
      Toast.makeText(this, "the uri is empty!", Toast.LENGTH_SHORT).show();
      finish();
      return;
    }

    Log.e("TestScript_Guide mUri==", mUri.toString());
    initUIAndData();

    if (JLocal.equals(mUri.getScheme())) {

      loadWXFromJLocal(false);
    } else if (TextUtils.equals("http", mUri.getScheme()) || TextUtils.equals("https", mUri.getScheme())) {
      // if url has key "_wx_tpl" then get weex bundle js
      String weexTpl = mUri.getQueryParameter(Constants.WEEX_TPL_KEY);
      String url = TextUtils.isEmpty(weexTpl) ? mUri.toString() : weexTpl;

      loadWXFromService(url);
    } else {
      loadWXFromLocal(false);
    }
    // mInstance.onActivityCreate();
  }


  private void initUIAndData() {


    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    toolbar.setNavigationOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        finish();
      }
    });

    ActionBar actionBar = getSupportActionBar();
    if (actionBar!=null) {
      actionBar.setDisplayShowHomeEnabled(false);
      actionBar.setDisplayHomeAsUpEnabled(true);
      actionBar.setDisplayShowTitleEnabled(false);
    }

    mContainer = (ViewGroup) findViewById(R.id.container);
  }




  private Map<String,String> mIDMap = new ArrayMap<>();
  private final Runnable mCollectIDMap = new Runnable() {
    @Override
    public void run() {
      View container = findViewById(R.id.container);

      collectId(mInstance.getRootComponent(),mIDMap);
      container.setContentDescription(JSON.toJSONString(mIDMap));
    }
  };

  /**
   *
   * @param map <weexid,viewId>
   */
  private static void collectId(WXComponent comp, Map<String,String> map){
    if(comp == null){
      return;
    }
    ImmutableDomObject dom;
    String id;
    View view;
    if((view = comp.getHostView())!=null &&
        (dom = comp.getDomObject()) != null &&
        (id = (String) dom.getAttrs().get("testId"))!=null &&
        !map.containsKey(id)){
      Pair<String,Integer> pair = Utility.nextID();
      view.setId(pair.second);
      map.put(id,pair.first);
    }
    if(comp instanceof WXVContainer){
      WXVContainer container = (WXVContainer) comp;
      for(int i = container.getChildCount()-1;i>=0;i--){
        collectId(container.getChild(i),map);
      }
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (mInstance != null) {
      mInstance.onActivityDestroy();
    }
    mContainer = null;

    if(wxPageActivityInstance == this){
      wxPageActivityInstance = null;
    }
  }

  public static Activity getCurrentWxPageActivity() {
    return wxPageActivityInstance;
  }

  public static void setCurrentWxPageActivity(Activity activity) {
    wxPageActivityInstance = activity;
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if(mInstance!=null){
      mInstance.onRequestPermissionsResult(requestCode,permissions,grantResults);
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if(mInstance!=null){
      mInstance.onActivityResult(requestCode,resultCode,data);
    }
  }

  @Override
  public void onViewCreated(WXSDKInstance instance, View view) {
    WXLogUtils.e("into--[onViewCreated]");

    if(view.getParent() == null) {
      mContainer.addView(view);
    }
    mContainer.requestLayout();
    Log.d("WARenderListener", "renderSuccess");
  }

  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
  }

  @Override
  public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
  }

  @Override
  public void onException(WXSDKInstance instance, String errCode,
                          String msg) {
    if (!TextUtils.isEmpty(errCode) && errCode.contains("|")) {
      String[] errCodeList = errCode.split("\\|");
      String code = errCodeList[1];
      String codeType = errCode.substring(0, errCode.indexOf("|"));

      if (TextUtils.equals("1", codeType)) {
        String errMsg = "codeType:" + codeType + "\n" + " errCode:" + code + "\n" + " ErrorInfo:" + msg;
        degradeAlert(errMsg);
        return;
      } else {
        Toast.makeText(getApplicationContext(), "errCode:" + errCode + " Render ERROR:" + msg, Toast.LENGTH_SHORT).show();
      }
    }
  }

  private void degradeAlert(String errMsg) {
    new AlertDialog.Builder(this)
        .setTitle("Downgrade success")
        .setMessage(errMsg)
        .setPositiveButton("OK", null)
        .show();

  }




  @Override
  protected void onResume() {
    super.onResume();
    WXSDKEngine.setActivityNavBarSetter(navigatorAdapter);
    if (mInstance != null) {
      mInstance.onActivityResume();
    }
  }

  @Override
  protected void onPause() {
    super.onPause();
    WXSDKEngine.setActivityNavBarSetter(null);
    if (mInstance != null) {
      mInstance.onActivityPause();
    }
  }

  @Override
  protected void onStart() {
    super.onStart();
    EventBus.getDefault().register(this);
  }

  @Override
  protected void onStop() {
    EventBus.getDefault().unregister(this);
    super.onStop();
    if (mInstance != null) {
      mInstance.onActivityStop();
    }
  }

  private static class NavigatorAdapter implements IActivityNavBarSetter {

    AppCompatActivity activity = null;

    public NavigatorAdapter(AppCompatActivity activity) {
      this.activity = activity;
    }

    @Override
    public boolean push(String param) {
      return false;
    }

    @Override
    public boolean pop(String param) {
      return false;
    }

    @Override
    public boolean setNavBarRightItem(String param) {
      return false;
    }

    @Override
    public boolean clearNavBarRightItem(String param) {
      return false;
    }

    @Override
    public boolean setNavBarLeftItem(String param) {
      return false;
    }

    @Override
    public boolean clearNavBarLeftItem(String param) {
      if (activity == null) return false;
      ActionBar actionBar = activity.getSupportActionBar();
      if (actionBar!=null) {
        actionBar.setDisplayHomeAsUpEnabled(false);
        actionBar.setDisplayShowTitleEnabled(false);
      }

      return false;
    }

    @Override
    public boolean setNavBarMoreItem(String param) {
      return false;
    }

    @Override
    public boolean clearNavBarMoreItem(String param) {
      return false;
    }

    @Override
    public boolean setNavBarTitle(String param) {

      if(activity!= null) {
        TextView tv = (TextView) activity.findViewById(R.id.title);
        tv.setText(param);
      }
      return true;
    }
  }


  public static final int PAY_RESULT = 4;
  private static class UIHandler extends Handler {
    WeakReference<WXPageActivity> reference;
    UIHandler(WXPageActivity wxPageActivity) {
      reference = new WeakReference<>(wxPageActivity);
    }

    @Override
    public void handleMessage(Message msg) {
      WXPageActivity activity = reference.get();
      if (activity != null) {
        switch (msg.what) {
          case PAY_RESULT:
            activity.mInstance.fireGlobalEventCallback("PayResult", (JSONObject) msg.obj);
            break;
        }
      }
    }
  }


  /*
  public void Notify(int flag, Object obj) {
    Message message = new Message();
    message.what = flag;
    message.obj = obj;
    uiHandler.sendMessage(message);
  }
  */

  @Subscribe
  public void GotEvent(CommonBusMsg msg) {
    Message message = new Message();
    message.what = msg.flag;
    message.obj = msg.jsonObject;
    uiHandler.sendMessage(message);
  }
}
