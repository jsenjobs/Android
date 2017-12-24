package org.chaosstudio.lib.net.action.prefab;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import org.chaosstudio.lib.net.action.Action;

import java.util.Map;

/**
 * Created by jsen on 30/09/2016.
 */
public class ActivityExec extends Action.Exec {

    @Override
    public Object handle() {
        try {
            Class classz = Class.forName(url);
            if (session instanceof Context) {
                Context context = (Context)session;
                boolean close = true;
                if (params!=null && params.containsKey("close")) {
                    close = Boolean.valueOf(params.get("close"));
                    params.remove("close");
                }
                Intent intent = new Intent(context, classz);
                for (Map.Entry<String, String> entry:params.entrySet()) {
                    intent.putExtra(entry.getKey(), entry.getValue());
                }
                context.startActivity(intent);
                if (close && context instanceof Activity) {
                    ((Activity)context).finish();
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }
}
