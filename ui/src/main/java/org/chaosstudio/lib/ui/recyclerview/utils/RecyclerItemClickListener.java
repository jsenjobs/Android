package org.chaosstudio.lib.ui.recyclerview.utils;

import android.view.View;

/**
 * Created by jsen on 2017/7/15.
 *
 */

public interface RecyclerItemClickListener {
    void onItemClick(int layoutID, View itemView, int pos);
    boolean onItemLongClick(int layoutID, View itemView, int pos);
}
