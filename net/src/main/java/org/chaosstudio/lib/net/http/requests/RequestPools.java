package org.chaosstudio.lib.net.http.requests;

import org.chaosstudio.lib.net.http.RequestBase;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * Created by jsen on 27/10/2016.
 */
public class RequestPools {
    // 使用executor执行网络事件
    private static final Executor executor = Executors.newFixedThreadPool(3);
    private static final List<RequestBase> caches = new ArrayList<>();

    // 执行所有保存的网络请求
    public static void release() {
        for (RequestBase requestBase:caches) {
            requestBase.exec(executor);
        }
        caches.clear();
    }
    public static void releaseOne(RequestBase requestBase) {
        requestBase.exec(executor);
    }

    /**
     * 应该只在RestfulBase中调用
     * 将任务放到任务池中
     * 调用RequestPools.release可执行该任务（执行所有缓存池中的任务）
     */
    public static void keep(RequestBase requestBase) {
        if (!requestBase.isKeeped() && !caches.contains(requestBase)) {
            caches.add(requestBase);
            requestBase.setKeeped(true);
        }
    }

    // 检测间隔 秒
    public static void autoDetect(int miniutes) {
        Timer timer = new Timer();
        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                release();
            }
        };
        timer.schedule(timerTask, miniutes * 1000);
    }

}
