package org.chaosstudio.lib.ui.recyclerview.utils;

import org.chaosstudio.lib.ui.recyclerview.CoreRecyclerAdapter;
import org.chaosstudio.lib.ui.recyclerview.component.CoreRecyclerModel;

import java.util.ArrayList;

/**
 * Created by jsen on 2017/7/15.
 */

public class DataList<M extends CoreRecyclerModel> extends ArrayList<M> {
    protected CoreRecyclerAdapter adapter = null;

    public void setAdapter(CoreRecyclerAdapter adapter) {
        this.adapter = adapter;
    }

    public void noData() {

    }

    public void notifyDataSetChanged() {
        adapter.notifyDataSetChanged();
    }
}
