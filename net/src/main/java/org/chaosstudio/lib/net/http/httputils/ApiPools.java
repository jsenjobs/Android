package org.chaosstudio.lib.net.http.httputils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jsen on 13/09/2016.
 *
 *
 * 保存从服务器获取的APIs
 */
public class ApiPools {
    private ApiPools() {}
    private static Map<String, String> apis = new HashMap<>();

    public static String getApi(String key) {
        return apis.get(key);
    }

    public static void pushKey(String key, String url) {
        apis.put(key, url);
    }

}
