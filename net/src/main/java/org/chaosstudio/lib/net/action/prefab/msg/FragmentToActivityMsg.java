package org.chaosstudio.lib.net.action.prefab.msg;

import org.chaosstudio.lib.net.action.Action;

/**
 * Created by jsen on 2017/7/19.
 */

public class FragmentToActivityMsg extends Action.Exec {
    @Override
    public Object handle() {
        if (session != null && session instanceof ActivityInterface) {
            ActivityInterface aI = (ActivityInterface)session;
            return aI.onMsg(params.get("tag"), params.get("msg"));
        }
        return null;
    }

    public interface ActivityInterface {
        String onMsg(String tag, String msg);
    }
}
