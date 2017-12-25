package com.example.jsen.deliverwater;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.alibaba.weex.commons.AbstractWeexActivity;
import com.taobao.weex.WXRenderErrorCode;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.appfram.navigator.IActivityNavBarSetter;
import com.taobao.weex.utils.WXFileUtils;

/**
 * Created by jsen on 2017/12/24.
 */

public class Login extends AbstractWeexActivity {
    private ProgressBar mProgressBar;
    private TextView mTipView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_index);

        setContainer((ViewGroup) findViewById(R.id.index_container));

        mProgressBar = (ProgressBar) findViewById(R.id.index_progressBar);
        mTipView = (TextView) findViewById(R.id.index_tip);
        mProgressBar.setVisibility(View.VISIBLE);
        mTipView.setVisibility(View.VISIBLE);
        WXSDKEngine.setActivityNavBarSetter(new Login.NavigatorAdapter(this));
        renderPage(WXFileUtils.loadAsset("dist/login.js", this), "file://assets/dist/login.js");

        // WXFileUtils.loadAsset("index.js", this)
        // renderPageByURL("http://192.168.1.102:8081/dist/login.js");

    }


    @Override
    public void onRenderSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {
        super.onRenderSuccess(wxsdkInstance,i,i1);
        mProgressBar.setVisibility(View.GONE);
        mTipView.setVisibility(View.GONE);
    }

    @Override
    public void onException(WXSDKInstance wxsdkInstance, String s, String s1) {
        super.onException(wxsdkInstance,s,s1);
        mProgressBar.setVisibility(View.GONE);
        mTipView.setVisibility(View.VISIBLE);
        if (TextUtils.equals(s, WXRenderErrorCode.DegradPassivityCode.WX_DEGRAD_ERR_NETWORK_BUNDLE_DOWNLOAD_FAILED.getDegradErrorCode())) {
            mTipView.setText(R.string.index_tip);
        } else {
            mTipView.setText("network render error:" + s1);
        }
    }
    private static class NavigatorAdapter implements IActivityNavBarSetter {
        Activity activity  = null;
        public NavigatorAdapter(Activity activity) {
            this.activity = activity;
        }

        @Override
        public boolean push(String param) {
            if(activity != null) {
                activity.finish();
            }
            activity = null;
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
            return false;
        }
    }
}
