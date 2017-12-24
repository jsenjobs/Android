package org.chaosstudio.lib.ui.recyclerview.utils;

import android.content.Context;
import android.util.Log;

import org.chaosstudio.lib.ui.recyclerview.RecyclerVHVBManager;
import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerViewHolder;

import java.lang.reflect.Method;
import java.util.List;

/**
 * Created by jsen on 2017/7/26.
 *
 */

public class TempHelp {

    public static void registerAllTemp(Context context, String packageName) {
        List<Class> combineClasses = ClassHelp.getAllClassByBean(context, packageName, TempBean.class);
        if (combineClasses!=null) {
            List<Method> methods = ClassHelp.getAllStaticMethodByBean(combineClasses, TempBean.class);
            try {
                for (Method method:methods) {
                    Object o = method.invoke(null);
                    if(o instanceof List) {
                        RecyclerVHVBManager.registerVHVBs((List<RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder>>) o);
                    } else {
                        RecyclerVHVBManager.registerVHVB((RecyclerVHVBManager.VBVH<CoreRecyclerViewHolder>) o);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
