package org.chaosstudio.lib.net.action;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jsen on 30/09/2016.
 *
 * 协议解析，完成制定动作
 */
public class Action {
    private static final Map<String, Exec> handlePool = new HashMap<>();

    public static void register(String protocol, Exec handle) {
        handlePool.put(protocol.toLowerCase(), handle);
    }

    public static void unregister(String protocol) {
        handlePool.remove(protocol.toLowerCase());
    }

    public static Object exec(String action, Object session) {
        Exec exec = handlePool.get(getProtocol(action));
        if (exec != null && exec.parser(action, session)) {
            return exec.handle();
        }
        return null;
    }

    private static String getProtocol(String action) {
        if (action == null || "".equals(action)) {
            return null;
        }
        return action.substring(0, action.indexOf("//")+2).toLowerCase();
    }

    private static final Map<String, Object> paramPool = new HashMap<>();
    public static Object getParam(String key) {
        return paramPool.get(key);
    }
    public static Object getAndRemoveParam(String key) {
        return paramPool.remove(key);
    }
    public static void addParam(String key, Object param) {
        paramPool.put(key, param);
    }


    public static abstract class Exec {
        protected String url;
        protected Map<String, String> params;
        protected Object session;
        public boolean parser(String action, Object session) {
            url = getUrl(action);
            this.session = session;
            if (url!=null && !"".equals(url)) {
                getParams(action);
                return true;
            }
            return false;
        }
        public abstract Object handle();

        private String getUrl(String action) {
            if (action == null || "".equals(action)) {
                return null;
            }
            if (action.contains("?")) {
                return action.substring(action.indexOf("//")+2, action.indexOf("?"));
            } else {
                return action.substring(action.indexOf("//")+2);
            }
        }

        private void getParams(String action) {
            if (params == null) {
                params = new HashMap<>();
            } else {
                params.clear();
            }

            if (action == null || "".equals(action)) {
                return;
            }
            String[] s = action.split("\\?");
            String s2[];
            if(s.length>1) {
                String ps = s[s.length-1];
                s = ps.split("&");
                for (String item:s) {
                    s2 = item.split("=");
                    if (s2.length == 2) {
                        params.put(s2[0], s2[1]);
                    }
                }
            }
        }
    }
}
