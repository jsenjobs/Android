package org.chaosstudio.lib.ui.recyclerview.component;

import android.support.v7.widget.RecyclerView;
import android.view.View;

import org.chaosstudio.lib.ui.recyclerview.utils.RecyclerItemClickListener;

/**
 * Created by jsen on 2017/7/14.
 */

public abstract class CoreRecyclerViewHolder extends RecyclerView.ViewHolder implements RecyclerComponent {
    public CoreRecyclerViewHolder(View itemView, final RecyclerItemClickListener itemClickListener) {
        super(itemView);
    }

    protected int layoutID;
    public int getLayoutID() {
        return layoutID;
    }


    private CoreRecyclerViewBind vb;
    public void setViewBind(CoreRecyclerViewBind vb) {
        this.vb = vb;
    }
    public CoreRecyclerViewBind getViewBind() {
        return vb;
    }
}
