package org.chaosstudio.lib.ui.recyclerview.component;

/**
 * Created by jsen on 2017/7/14.
 */

public abstract class CoreRecyclerViewBind<VH extends CoreRecyclerViewHolder, M extends CoreRecyclerModel> implements RecyclerComponent {
    public abstract void bind(VH vh, M model);
}
