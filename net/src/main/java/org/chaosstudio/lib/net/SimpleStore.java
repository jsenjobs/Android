package org.chaosstudio.lib.net;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by jsen on 13/09/2016.
 *
 *
 * 实现默认的android简单数据存储
 */
public class SimpleStore {

    private static final String DFS = "dfs";

    public static void put(Context context, String key, String value) {
        SharedPreferences mySharedPreferences= context.getSharedPreferences(DFS, Activity.MODE_PRIVATE);
        SharedPreferences.Editor editor = mySharedPreferences.edit();
        editor.putString(key, value);
        editor.apply();
    }


    public static String getString(Context context, String key) {
        SharedPreferences mySharedPreferences= context.getSharedPreferences(DFS, Activity.MODE_PRIVATE);
        return mySharedPreferences.getString(key, "");
    }

    public static String getString(Context context, String key, String defaultValue) {
        SharedPreferences mySharedPreferences= context.getSharedPreferences(DFS, Activity.MODE_PRIVATE);
        return mySharedPreferences.getString(key, defaultValue);
    }

    public static void destroy(Context context) {
        SharedPreferences mySharedPreferences= context.getSharedPreferences(DFS, Activity.MODE_PRIVATE);
        SharedPreferences.Editor editor = mySharedPreferences.edit();
        editor.clear().apply();
    }


}
