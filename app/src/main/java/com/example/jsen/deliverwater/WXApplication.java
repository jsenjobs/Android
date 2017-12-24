package com.example.jsen.deliverwater;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;
import android.util.Log;

import com.alibaba.weex.commons.adapter.DefaultWebSocketAdapterFactory;
import com.alibaba.weex.commons.adapter.FrescoImageAdapter;
import com.alibaba.weex.commons.adapter.JSExceptionAdapter;
import com.example.jsen.deliverwater.weex.extend.adapter.DefaultAccessibilityRoleAdapter;
import com.example.jsen.deliverwater.weex.extend.adapter.FrescoImageComponent;
import com.example.jsen.deliverwater.weex.extend.adapter.InterceptWXHttpAdapter;
import com.example.jsen.deliverwater.weex.extend.component.RichText;
import com.example.jsen.deliverwater.weex.extend.component.WXComponentSyncTest;
import com.example.jsen.deliverwater.weex.extend.component.WXMask;
import com.example.jsen.deliverwater.weex.extend.component.WXParallax;
import com.example.jsen.deliverwater.weex.extend.component.dom.WXMaskDomObject;
import com.example.jsen.deliverwater.weex.extend.module.GeolocationModule;
import com.example.jsen.deliverwater.weex.extend.module.MyModule;
import com.example.jsen.deliverwater.weex.extend.module.RenderModule;
import com.example.jsen.deliverwater.weex.extend.module.SyncTestModule;
import com.example.jsen.deliverwater.weex.extend.module.WXEventModule;
import com.example.jsen.deliverwater.weex.extend.module.WXNavigatorModule;
import com.example.jsen.deliverwater.weex.extend.module.WXStorageAdapter;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXException;


/**
 * Created by jsen on 2017/12/24.
 */

public class WXApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        /**
         * Set up for fresco usage.
         * Set<RequestListener> requestListeners = new HashSet<>();
         * requestListeners.add(new RequestLoggingListener());
         * ImagePipelineConfig config = ImagePipelineConfig.newBuilder(this)
         *     .setRequestListeners(requestListeners)
         *     .build();
         * Fresco.initialize(this,config);
         **/
//    initDebugEnvironment(true, false, "DEBUG_SERVER_HOST");
        WXSDKEngine.addCustomOptions("appName", "WXSample");
        WXSDKEngine.addCustomOptions("appGroup", "WXApp");
        WXSDKEngine.initialize(this,
                new InitConfig.Builder()
                        .setImgAdapter(new FrescoImageAdapter())// use fresco adapter
                        // .setImgAdapter(new ImageAdapter())
                        .setStorageAdapter(new WXStorageAdapter(this))
                        .setWebSocketAdapterFactory(new DefaultWebSocketAdapterFactory())
                        .setJSExceptionAdapter(new JSExceptionAdapter())
                        .setHttpAdapter(new InterceptWXHttpAdapter())
                        .build()
        );

        WXSDKManager.getInstance().setAccessibilityRoleAdapter(new DefaultAccessibilityRoleAdapter());

        try {
            Fresco.initialize(this);
            WXSDKEngine.registerComponent("synccomponent", WXComponentSyncTest.class);
            WXSDKEngine.registerComponent(WXParallax.PARALLAX, WXParallax.class);

            WXSDKEngine.registerComponent("richtext", RichText.class);
            WXSDKEngine.registerModule("render", RenderModule.class);
            WXSDKEngine.registerModule("event", WXEventModule.class);
            WXSDKEngine.registerModule("syncTest", SyncTestModule.class);

            WXSDKEngine.registerComponent("mask",WXMask.class);
            WXSDKEngine.registerDomObject("mask", WXMaskDomObject.class);

            WXSDKEngine.registerModule("unionPay", MyModule.class);
            WXSDKEngine.registerModule("navigator", WXNavigatorModule.class);
            WXSDKEngine.registerModule("geolocation", GeolocationModule.class);
            /**
             * override default image tag
             * WXSDKEngine.registerComponent("image", FrescoImageComponent.class);
             */
            WXSDKEngine.registerComponent("image", FrescoImageComponent.class);


        } catch (WXException e) {
            e.printStackTrace();
        }

        registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle bundle) {

            }

            @Override
            public void onActivityStarted(Activity activity) {

            }

            @Override
            public void onActivityResumed(Activity activity) {

            }

            @Override
            public void onActivityPaused(Activity activity) {

            }

            @Override
            public void onActivityStopped(Activity activity) {

            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle bundle) {

            }

            @Override
            public void onActivityDestroyed(Activity activity) {
                // The demo code of calling 'notifyTrimMemory()'
                if (false) {
                    // We assume that the application is on an idle time.
                    WXSDKManager.getInstance().notifyTrimMemory();
                }
                // The demo code of calling 'notifySerializeCodeCache()'
                if (false) {
                    WXSDKManager.getInstance().notifySerializeCodeCache();
                }
            }
        });

    }

    /**
     *@param connectable debug server is connectable or not.
     *               if true, sdk will try to connect remote debug server when init WXBridge.
     *
     * @param debuggable enable remote debugger. valid only if host not to be "DEBUG_SERVER_HOST".
     *               true, you can launch a remote debugger and inspector both.
     *               false, you can  just launch a inspector.
     * @param host the debug server host, must not be "DEBUG_SERVER_HOST", a ip address or domain will be OK.
     *             for example "127.0.0.1".
     */
    private void initDebugEnvironment(boolean connectable, boolean debuggable, String host) {
        if (!"DEBUG_SERVER_HOST".equals(host)) {
            WXEnvironment.sDebugServerConnectable = connectable;
            WXEnvironment.sRemoteDebugMode = debuggable;
            WXEnvironment.sRemoteDebugProxyUrl = "ws://" + host + ":8088/debugProxy/native";
        }
    }

}
