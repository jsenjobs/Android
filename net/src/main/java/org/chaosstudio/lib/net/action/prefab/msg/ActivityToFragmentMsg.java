package org.chaosstudio.lib.net.action.prefab.msg;

import org.chaosstudio.lib.net.action.Action;

/**
 * Created by jsen on 2017/7/19.
 */

public class ActivityToFragmentMsg extends Action.Exec {
    @Override
    public Object handle() {
        if (session != null && session instanceof ActivityToFragmentMsg.FragmentInterface) {
            ActivityToFragmentMsg.FragmentInterface aI = (ActivityToFragmentMsg.FragmentInterface)session;
            return aI.onMsg(params.get("tag"), params.get("msg"));
        }
        return null;
    }

    public interface FragmentInterface {
        String onMsg(String tag, String msg);
    }
}
