package org.chaosstudio.lib.net.action.prefab;


import org.chaosstudio.lib.net.action.Action;

/**
 * Created by jsen on 02/10/2016.
 */
public class ActionExec extends Action.Exec {
    @Override
    public Object handle() {
        if (session!=null && session instanceof ActionCall && params!=null && params.containsKey("action")) {
            ActionCall actionCall = (ActionCall) session;
            return actionCall.call(params.get("action"));
        }
        return null;
    }

    public interface ActionCall {
        Object call(final String action);
    }
}
