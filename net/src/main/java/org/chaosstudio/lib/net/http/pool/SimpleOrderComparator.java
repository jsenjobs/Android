package org.chaosstudio.lib.net.http.pool;

import android.app.Activity;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;

import org.chaosstudio.lib.net.http.Constant;

import java.util.Comparator;

/**
 * Created by jsen on 08/10/2016.
 * 消息接收activity的接收顺序排序，NET_MESSAGE_RECEIVE_ORDER
 */
class SimpleOrderComparator<T> implements Comparator<T> {
    Context context;
    public SimpleOrderComparator(Context ctx) {
        context = ctx;
    }

    @Override
    public int compare(T t, T t1) {
        Integer order1  = Constant.NET_DEFAULT_MESSAGE_ORDER;
        Integer order2  = Constant.NET_DEFAULT_MESSAGE_ORDER;
        ActivityInfo info;
        if (t instanceof Activity) {

            try {
                info = context.getPackageManager() .getActivityInfo(((Activity)(t)).getComponentName(), PackageManager.GET_META_DATA);
                if(info.metaData!=null)
                {
                    order1 = info.metaData.getInt("NET_MESSAGE_RECEIVE_ORDER");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (t1 instanceof Activity ) {
            try {
                info = context.getPackageManager() .getActivityInfo(((Activity)(t1)).getComponentName(), PackageManager.GET_META_DATA);
                if(info.metaData!=null)
                {
                    order2 = info.metaData.getInt("NET_MESSAGE_RECEIVE_ORDER");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return order2.compareTo(order1);
    }
}
